import { sortArrayObject } from '@monorepo-starter/utils/sort';
import FastGlob from 'fast-glob';
import path from 'node:path';

type SpecialFile = {
  type: 'layout' | 'template' | 'error' | 'loading' | 'not-found' | 'page';
  path: string;
  sort: number;
};

export type ComponentTreeJson = {
  type: 'Layout' | 'Template' | 'ErrorBoundary' | 'Suspense' | 'Page';
  path: string;
  fallback?: 'Error' | 'NotFound' | 'Loading';
  children?: ComponentTreeJson[];
};

export type RouteStructure = {
  href: string | null;
  linkTypes: string;
  fileName: string;
  fileNames?: string[];
  componentTreeJson: ComponentTreeJson | null;
};

export type PageRoute = {
  file: string;
  href: string | null;
  linkTypes: string;
};

export async function getRouteStructure() {
  const typeMap = {
    layout: 'Layout',
    template: 'Template',
    error: 'ErrorBoundary',
    loading: 'Suspense',
    'not-found': 'ErrorBoundary',
    page: 'Page',
  };

  const routes = await FastGlob(`src/app/**/{page,layout,loading,not-found,error,template}.{ts,tsx,mdx}`);
  const pagePathList = updatePageRoutesBySegments(routes.filter((route) => route.match(/\/page\.(ts|tsx|mdx)$/)));

  const pageRoutes = routes.filter((route) => route.endsWith('page.tsx') || route.endsWith('page.mdx'));
  const layoutRoutes = routes.filter((route) => route.endsWith('layout.tsx'));
  const loadingRoutes = routes.filter((route) => route.endsWith('loading.tsx'));
  const notFoundRoutes = routes.filter((route) => route.endsWith('not-found.tsx'));
  const errorRoutes = routes.filter((route) => route.endsWith('error.tsx'));
  const templateRoutes = routes.filter((route) => route.endsWith('template.tsx'));

  const routeStructure: RouteStructure[] = [];

  for (const pageFileName of pageRoutes) {
    const layouts: SpecialFile[] = [];
    let currentDir = path.dirname(pageFileName);

    // 현재 디렉토리에서 src/app까지 special 파일 찾기
    while (true) {
      const folderDepth = (currentDir.split('/').length - 2 + 1) * 10;

      const layoutPath = path.join(currentDir, 'layout.tsx');
      const templatePath = path.join(currentDir, 'template.tsx');
      const loadingPath = path.join(currentDir, 'loading.tsx');
      const errorPath = path.join(currentDir, 'error.tsx');
      const notFoundPath = path.join(currentDir, 'not-found.tsx');

      if (layoutRoutes.includes(layoutPath)) {
        layouts.unshift({ type: 'layout', path: layoutPath, sort: folderDepth + 1 });
      }

      if (templateRoutes.includes(templatePath)) {
        layouts.unshift({ type: 'template', path: templatePath, sort: folderDepth + 2 });
      }

      if (loadingRoutes.includes(loadingPath)) {
        layouts.unshift({ type: 'loading', path: loadingPath, sort: folderDepth + 3 });
      }

      if (errorRoutes.includes(errorPath)) {
        layouts.unshift({ type: 'error', path: errorPath, sort: folderDepth + 4 });
      }

      if (notFoundRoutes.includes(notFoundPath)) {
        layouts.unshift({ type: 'not-found', path: notFoundPath, sort: folderDepth + 5 });
      }

      if (currentDir === 'src/app') break;
      currentDir = path.dirname(currentDir);
    }

    const sortedLayouts = sortArrayObject(layouts, { asc: (value) => value.sort }); // 순서가 중요
    sortedLayouts.push({ type: 'page', path: pageFileName, sort: 99 });

    // 컴포넌트 트리 생성
    const componentTreeJson = sortedLayouts.reduceRight<ComponentTreeJson | null>((acc, value) => {
      const node: ComponentTreeJson = {
        type: typeMap[value.type] as ComponentTreeJson['type'],
        path: value.path,
      };

      if (value.type === 'error') {
        node.fallback = 'Error';
      }

      if (value.type === 'not-found') {
        node.fallback = 'NotFound';
      }

      if (value.type === 'loading') {
        node.fallback = 'Loading';
      }

      if (acc) {
        node.children = [acc];
      }

      return node;
    }, null);

    const pagePath = pagePathList.find((item) => item.file === pageFileName);

    if (pagePath) {
      routeStructure.push({
        href: pagePath.href,
        fileName: pageFileName,
        linkTypes: pagePath.linkTypes,
        componentTreeJson,
      });
    }
  }

  return routeStructure;
}

/**
 * 모든 페이지 라우트를 `next.js` 라우트 규칙에 맞게 업데이트
 */
export function updatePageRoutesBySegments(allPageRoutes: string[]): PageRoute[] {
  const sanitizedFiles = allPageRoutes.map((routePath) => {
    const segments = routePath.split('/').slice(2);

    // Private route 는 무시
    const hasPrivateRoute = segments.some((segment) => segment.startsWith('_'));
    if (hasPrivateRoute) {
      return {
        file: routePath,
        href: null,
      };
    }

    // Intercepting route 는 무시
    const hasInterceptingRoute = segments.some((segment) => segment.match(/\([.]{1,3}\)\w+/));
    if (hasInterceptingRoute) {
      return {
        file: routePath,
        href: null,
      };
    }

    // Parallel route 에서 sub route는 무시
    const hasParallelRoute = segments.some((segment) => segment.startsWith('@'));
    if (hasParallelRoute) {
      const parallelIndex = segments.findIndex((segment) => segment.startsWith('@'));
      const nextSegment = segments[parallelIndex + 1];
      if (!nextSegment?.match(/page\.(tsx|mdx|ts)$/)) {
        return {
          file: routePath,
          href: null,
        };
      }
    }

    // page.tsx segment 는 제거
    const updatedSegments = segments
      .filter((segment) => !segment.match(/page\.(tsx|mdx|ts)$/))
      .filter((segment) => !segment.match(/^\(.+\)$/))
      .filter((segment) => !segment.startsWith('@'));

    const linkTypeSegments = updatedSegments.map((segment) => {
      if (segment.startsWith('[') && segment.endsWith(']')) {
        return '${string}';
      }

      return segment;
    });

    return {
      file: routePath,
      href: `/${updatedSegments.join('/')}`,
      linkTypes: `/${linkTypeSegments.join('/')}`,
    };
  });

  return sanitizedFiles.filter((route) => route.href !== null).sort();
}

export function mergeComponentTrees(trees: ComponentTreeJson[]): ComponentTreeJson {
  const [first, ...rest] = trees;
  if (!first) throw new Error('빈 입력');

  return rest.reduce((acc, curr) => mergeNode(acc, curr), first);
}

function mergeNode(a: ComponentTreeJson, b: ComponentTreeJson): ComponentTreeJson {
  if (a.path !== b.path || a.type !== b.type) {
    return {
      ...a,
      children: [...(a.children || []), b],
    };
  }

  const mergedChildren = mergeChildren(a.children || [], b.children || []);
  return {
    ...a,
    fallback: a.fallback ?? b.fallback, // 필요시 덮어쓰기 전략 조정
    children: mergedChildren,
  };
}

function mergeChildren(a: ComponentTreeJson[], b: ComponentTreeJson[]): ComponentTreeJson[] {
  const result: ComponentTreeJson[] = [...a];

  for (const bChild of b) {
    const match = result.find((aChild) => aChild.type === bChild.type && aChild.path === bChild.path);
    if (match) {
      const merged = mergeNode(match, bChild);
      const idx = result.indexOf(match);
      result[idx] = merged;
    } else {
      result.push(bChild);
    }
  }

  return result;
}
