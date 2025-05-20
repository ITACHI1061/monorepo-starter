import { delay } from '@monorepo-starter/utils/fn';
import { random } from '@monorepo-starter/utils/number';

async function getData() {
  const delayTime = random(500, 1500);
  await delay(delayTime);

  return [
    { id: 1, name: '김철수', email: 'kim@example.com' },
    { id: 2, name: '이영희', email: 'lee@example.com' },
    { id: 3, name: '박지민', email: 'park@example.com' },
  ];
}

export default async function AppRouteParallelUsersPage() {
  const data = await getData();
  return (
    <ul className="space-y-2">
      {data.map((item) => (
        <li key={item.id} className="rounded bg-gray-50 p-2">
          <p className="font-medium">{item.name}</p>
          <p className="text-sm text-gray-600">{item.email}</p>
        </li>
      ))}
    </ul>
  );
}
