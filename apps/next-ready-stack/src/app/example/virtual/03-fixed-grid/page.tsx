import { faker } from '@faker-js/faker';
import FixedGrid from './grid';

export default function FixedGridPage() {
  const columns = Array.from({ length: 120 }, (_, index) => {
    return {
      id: `${index + 1}`,
      width: faker.number.int({ min: 100, max: 150 }),
    };
  });

  const rows = Array.from({ length: 50_000 }, (_, index) => {
    return {
      id: `${index + 1}`,
      text: `Row ${index + 1}`,
      height: faker.number.int({ min: 50, max: 80 }),
    };
  });

  return (
    <div>
      <h1>Tanstack Virtual Fixed Grid</h1>
      <FixedGrid columns={columns} rows={rows} />
    </div>
  );
}
