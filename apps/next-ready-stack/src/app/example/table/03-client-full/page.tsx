import { cachedGetUsers } from '~/db/users';
import TableClientBasic from './components/table';

export default async function TableClientFullPage() {
  const data = await cachedGetUsers({ offset: 0, limit: 500 });
  return (
    <div>
      <h1>Tanstack Table Client Full (Client Component)</h1>
      <TableClientBasic data={data.rows} />
    </div>
  );
}
