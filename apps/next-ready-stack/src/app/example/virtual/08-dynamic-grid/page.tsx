import { faker } from '@faker-js/faker/locale/ko';
import VirtualDynamicGrid from './grid';

interface Column {
  key: string;
  name: string;
  width: number;
}

const randomNumber = (min: number, max: number) => faker.number.int({ min, max });

const generateColumns = (count: number) => {
  return new Array(count).fill(0).map((_, i) => {
    const key: string = i.toString();
    return {
      key,
      name: `Column ${i}`,
      width: randomNumber(75, 300),
    };
  });
};

const generateData = (columns: Array<Column>, count = 300) => {
  return new Array(count).fill(0).map((_, rowIndex) =>
    columns.reduce<Array<string>>((acc, _curr, colIndex) => {
      // simulate dynamic size cells
      const val = faker.lorem.lines(((rowIndex + colIndex) % 10) + 1);

      acc.push(val);

      return acc;
    }, []),
  );
};

export default function VirtualDynamicGridPage() {
  const columns = generateColumns(30);
  const data = generateData(columns);

  return (
    <div>
      <h1>Tanstack Virtual Dynamic Grid</h1>
      <VirtualDynamicGrid columns={columns} data={data} />
    </div>
  );
}
