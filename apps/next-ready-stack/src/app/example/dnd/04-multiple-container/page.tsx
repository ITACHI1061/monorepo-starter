import { fakerKO } from '@faker-js/faker';
import { Container } from './container';

export default function ExampleDndMultipleContainerPage() {
  const generateItems = (length: number) => {
    return Array.from({ length }, () => ({
      id: fakerKO.string.uuid(),
      name: [fakerKO.food.adjective(), fakerKO.food.dish()].join('-'),
    }));
  };

  const data = {
    A: generateItems(10),
    B: generateItems(10),
    C: generateItems(10),
  };

  return (
    <div>
      <h1>Sortable Multiple Container</h1>
      <Container data={data} />
    </div>
  );
}
