export default function AppRouteParallelLayout({
  users,
  comments,
  notifications,
  modal,
}: {
  users: React.ReactNode;
  comments: React.ReactNode;
  notifications: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-blue-800">Next.js Parallel Route</h1>
      <ul>
        <li>각 섹션은 독립적으로 로딩되며, 1~5초의 랜덤한 로딩 시간을 가짐.</li>
        <li>알림 섹션은 10%의 확률로 에러가 발생하며, 에러 복구 기능을 보여줌.</li>
        <li>우측 상단의 로그인 버튼을 클릭하면 모달이 표시되며, URL이 변경.</li>
        <li>각 섹션은 자체적인 로딩 UI와 에러 처리를 가짐.</li>
        <li>새로고침할 때마다 다른 순서로 컴포넌트들이 로드됨.</li>
      </ul>

      <div className="not-prose grid grid-cols-3 gap-4">
        <div className="rounded-lg border p-4">{users}</div>
        <div className="rounded-lg border p-4">{comments}</div>
        <div className="rounded-lg border p-4">{notifications}</div>
      </div>
      {modal}
    </div>
  );
}
