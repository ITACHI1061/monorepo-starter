import { format } from '@monorepo-starter/utils/number';
import FixedColumn from './column';

export default function FixedColumnPage() {
  const columns = new Array(100_000).fill(true).map(() => 100 + Math.round(Math.random() * 50));
  return (
    <div>
      <h1>Tanstack Virtual Fixed Column</h1>
      <p>
        Total: <strong>{format(columns.length)}</strong> columns
      </p>
      <FixedColumn columns={columns} />
    </div>
  );
}
