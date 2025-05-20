import { faker } from '@faker-js/faker';
import VirtualDynamicColumn from './column';

export default function DynamicColumnPage() {
  const randomNumber = (min: number, max: number) => faker.number.int({ min, max });
  const sentences = new Array(10_000).fill(true).map(() => faker.lorem.sentence(randomNumber(20, 70)));
  return (
    <div>
      <h1>Tanstack Virtual Dynamic Column</h1>
      <VirtualDynamicColumn sentences={sentences} />
    </div>
  );
}
