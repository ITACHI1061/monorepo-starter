import FixedMasonryVertical from './masonry';

export default function FixedMasonryVerticalPage() {
  const rows = new Array(100_000).fill(true).map(() => 25 + Math.round(Math.random() * 50));
  return (
    <div>
      <h1>Tanstack Virtual Fixed Masonry Vertical</h1>
      <FixedMasonryVertical rows={rows} />
    </div>
  );
}
