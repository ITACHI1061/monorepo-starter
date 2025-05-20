import { QueryClient, defaultShouldDehydrateQuery, isServer } from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // SSR 에서는 일반적으로 0 이상의 staleTime을 설정하여 즉시 재검색을 방지
      },
      dehydrate: {
        // 서버에서 클라이언트로 데이터를 전달할 때, 진행 중인(pending) 쿼리도 포함
        shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // Server: 항상 새로운 쿼리 클라이언트를 생성
    return makeQueryClient();
  } else {
    // Browser: 이미 존재하지 않는 경우에만 새로운 쿼리 클라이언트를 생성
    // React가 초기 렌더링 중에 일시 중단되더라도 새로운 클라이언트가 재생성되지 않도록 하는 것이 매우 중요한데,
    // 쿼리 클라이언트 생성 아래에 Suspense 경계가 있는 경우에는 필요하지 않을 수 있음
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
