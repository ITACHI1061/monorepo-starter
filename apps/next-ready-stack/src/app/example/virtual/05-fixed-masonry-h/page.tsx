import FixedMasonryHorizontal from './masonry';

export default function FixedMasonryHorizontalPage() {
  const columns = new Array(100_000).fill(true).map(() => 100 + Math.round(Math.random() * 50));
  return (
    <div>
      <h1>Tanstack Virtual Fixed Masonry Horizontal</h1>
      <FixedMasonryHorizontal columns={columns} />
    </div>
  );
}
