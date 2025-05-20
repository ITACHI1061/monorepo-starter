export default async function AppRouteParallelLayout({
  list,
  detail,
  children,
}: {
  list: React.ReactNode;
  detail: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Next.js Parallel Route With Virtualize</h1>
      <div className="flex">
        <div className="flex-1 md:w-1/2">{list}</div>
        <div className="md:w-1/2">{detail}</div>
      </div>
      {children}
    </div>
  );
}
