import { checkAuthorization } from '~/lib/auth/check';

export default async function PublicPage() {
  const { isAuthenticated, payload } = await checkAuthorization();

  return (
    <div>
      <h1>인증: Public 페이지</h1>
      {isAuthenticated ? (
        <p>
          <code>{payload?.sub}</code> 님 환영합니다
        </p>
      ) : (
        <p>Unauthorized</p>
      )}
    </div>
  );
}
