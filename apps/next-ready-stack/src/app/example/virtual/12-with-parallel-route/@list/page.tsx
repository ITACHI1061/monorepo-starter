import { format } from '@monorepo-starter/utils/number';
import { faker } from '@faker-js/faker';
import FixedRow from './row';

export type Row = {
  id: number;
  color: string;
  name: string;
  description: string;
  height: number;
};

export default function FixedRowPage() {
  const rows = new Array(500).fill(true).map((_, index) => {
    return {
      id: index + 1,
      color: faker.color.hsl({ format: 'css' }),
      name: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
      description: faker.commerce.productDescription(),
      height: faker.number.int({ min: 40, max: 50 }),
    } as Row;
  });

  return (
    <div className="">
      <p>
        Total: <strong>{format(rows.length)}</strong> rows
      </p>
      <FixedRow rows={rows} />
    </div>
  );
}
