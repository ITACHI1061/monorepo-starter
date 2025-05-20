export default function AppRouteParallelCommentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">최근 댓글</h2>
      {children}
    </div>
  );
}
