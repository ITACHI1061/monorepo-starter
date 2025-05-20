export default function AppRouteParallelCommentsLoading() {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-14 animate-pulse rounded bg-gray-200" />
      ))}
    </div>
  );
}
