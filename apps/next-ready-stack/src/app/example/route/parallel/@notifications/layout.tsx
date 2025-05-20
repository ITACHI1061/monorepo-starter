export default function AppRouteParallelNotificationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">알림</h2>
      {children}
    </div>
  );
}
