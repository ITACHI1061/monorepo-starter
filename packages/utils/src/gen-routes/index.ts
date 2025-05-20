import { uniq } from '@monorepo-starter/utils/array';
import fs from 'node:fs';
import { format } from 'prettier';
import { getRouteStructure, mergeComponentTrees, type ComponentTreeJson, type RouteStructure } from './route-structure';

/**
 * 라우트 파일 목록 생성
 * `src/lib/experimental/routes/app-path-routes.ts` 생성
 * `src/lib/experimental/routes/types.ts` 파일 생성
 * (빌드 시, `.next/app-path-routes-manifest.json`에 파일이 생성됨)
 */
export async function generate(filePath: string) {
  const prettierConfig = {
    parser: 'typescript',
    printWidth: 120,
    singleQuote: true,
  };

  const routeStructure = await getRouteStructure(); // 중복 href 포함
  const uniqueLinkTypes = uniq(routeStructure.map((route) => route.linkTypes));
  uniqueLinkTypes.sort((a, b) => a.localeCompare(b));

  const uniqRouteStructure: RouteStructure[] = [];
  const staticRoutes: string[] = [];
  const dynamicRoutes: string[] = [];

  uniqueLinkTypes.forEach((linkType) => {
    if (linkType.includes('/${string}')) {
      dynamicRoutes.push(linkType);
    } else {
      staticRoutes.push(linkType);
    }

    const routeStructureItems = routeStructure.filter((route) => route.linkTypes === linkType);

    // 병렬 라우트 Merge
    if (routeStructureItems.length > 1) {
      const base = routeStructureItems[0]!;
      const componentTreeJsonList = routeStructureItems
        .map((item) => item.componentTreeJson)
        .filter(Boolean) as ComponentTreeJson[];

      const mergedTree = mergeComponentTrees(componentTreeJsonList);

      const mergedRouteStructure: RouteStructure = {
        href: base.href,
        linkTypes: linkType,
        fileName: '',
        fileNames: routeStructureItems.map((item) => item.fileName),
        componentTreeJson: mergedTree,
      };

      uniqRouteStructure.push(mergedRouteStructure);

      return;
    }

    if (routeStructureItems.length === 1) {
      uniqRouteStructure.push(routeStructureItems[0]!);
      return;
    }
  });

  const contents = await format(
    `
      // NOTE: This file should not be edited
      import type { LiteralUnion } from 'type-fest';\n
      export type StaticPath = ${uniq(staticRoutes)
        .map((route) => ` '${route}' `)
        .join(' | ')}\n
      export type TypedRoute = LiteralUnion<StaticPath, ${uniq(dynamicRoutes)
        .map((route) => '`' + route + '`')
        .join(' | ')}>;\n
      export type ComponentTreeJson = {
        type: 'Layout' | 'Template' | 'ErrorBoundary' | 'Suspense' | 'Page';
        path: string;
        fallback?: 'Error' | 'NotFound' | 'Loading';
        children?: ComponentTreeJson[];
      };\n
      export type AppPathRoutes = {
        href: string | null;
        linkTypes: string;
        fileName: string;
        fileNames?: string[];
        componentTreeJson: ComponentTreeJson | null;
      };\n
      export const appPathRoutes: AppPathRoutes[] = ${JSON.stringify(uniqRouteStructure, null, 2)};
    `,
    prettierConfig,
  );

  fs.writeFileSync(filePath, contents, 'utf-8');
}
