import { faker } from '@faker-js/faker';
import FixedRow from './rows';

export default function FixedSortableRowPage() {
  const data = Array.from({ length: 100_000 }, (_, index) => {
    const category = faker.food.ethnicCategory();
    const adjective = faker.food.adjective();
    const name = faker.helpers.arrayElement([faker.food.fruit(), faker.food.vegetable(), faker.food.meat()]);
    const id = (index + 1).toString();
    const text = `${category} ${adjective} ${name}`;

    return {
      id,
      text,
    };
  });

  return (
    <div>
      <h1>Tanstack Virtual + DnD Sortable Row</h1>
      <FixedRow rows={data} />
    </div>
  );
}
