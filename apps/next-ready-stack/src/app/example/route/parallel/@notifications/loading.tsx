export default function AppRouteParallelNotificationsLoading() {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-12 animate-pulse rounded bg-gray-200" />
      ))}
    </div>
  );
}
