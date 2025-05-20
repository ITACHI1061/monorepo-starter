export type TreeRoute = {
  path: string;
  name: string;
  hasPath: boolean;
  children: TreeRoute[];
};

/**
 * Build tree structure from routes.
 */
export function buildTree(routes: string[]): TreeRoute[] {
  const routesTree: TreeRoute[] = [];

  routes.forEach((route) => {
    const segments = route.split('/').filter(Boolean);
    let currentLevel = routesTree;
    let currentPath = '';

    segments.forEach((segment) => {
      currentPath = currentPath ? `${currentPath}/${segment}` : `/${segment}`;

      let existingNode = currentLevel.find((node) => node.path === currentPath);

      if (!existingNode) {
        existingNode = {
          path: currentPath,
          name: segment,
          hasPath: routes.some((route) => route === currentPath),
          children: [],
        };
        currentLevel.push(existingNode);
      }

      currentLevel = existingNode.children;
    });
  });

  // 폴더(children이 있는 노드)를 먼저, 그 다음 이름순으로 정렬
  const sortTreeNodes = (nodes: TreeRoute[]): TreeRoute[] => {
    return nodes
      .map((node) => ({
        ...node,
        children: sortTreeNodes(node.children),
      }))
      .sort((a, b) => {
        // 폴더 여부 비교
        const aIsFolder = a.children.length > 0;
        const bIsFolder = b.children.length > 0;

        if (aIsFolder && !bIsFolder) return -1;
        if (!aIsFolder && bIsFolder) return 1;

        // 폴더 여부가 같다면 이름순 정렬
        return a.name.localeCompare(b.name);
      });
  };

  return sortTreeNodes(routesTree);
}

export type FlattenedRoute = {
  path: string;
  name: string;
  hasPath: boolean;
  children?: FlattenedRoute[];
};

/**
 * Get all folder paths from routes.
 */
export function flattenTree(tree: FlattenedRoute[]): FlattenedRoute[] {
  const result: FlattenedRoute[] = [];

  function traverse(nodes: FlattenedRoute[]) {
    for (const node of nodes) {
      const { children, ...rest } = node;
      result.push(rest); // children 제외한 노드 저장
      if (children?.length) {
        traverse(children);
      }
    }
  }

  traverse(tree);
  return result;
}

/**
 * Get all folder paths from tree structure.
 */
export function getAllFolderPaths(items: TreeRoute[]): string[] {
  return items.reduce((acc: string[], item) => {
    if (item.children?.length > 0) {
      return [...acc, item.path, ...getAllFolderPaths(item.children)];
    }
    return acc;
  }, []);
}
