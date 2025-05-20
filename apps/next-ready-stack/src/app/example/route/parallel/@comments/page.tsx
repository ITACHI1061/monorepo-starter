import { delay } from '@monorepo-starter/utils/fn';
import { random } from '@monorepo-starter/utils/number';

async function getData() {
  const delayTime = random(500, 1500);
  await delay(delayTime);

  return [
    { id: 1, author: '김철수', content: '좋은 글이네요!', postId: 1 },
    { id: 2, author: '이영희', content: '매우 유익합니다.', postId: 1 },
    { id: 3, author: '박지민', content: '감사합니다~', postId: 2 },
  ];
}

export default async function AppRouteParallelCommentsPage() {
  const data = await getData();
  return (
    <div className="space-y-2">
      {data.map((item) => (
        <div key={item.id} className="rounded bg-gray-50 p-2">
          <p className="text-sm font-medium text-blue-600">{item.author}</p>
          <p className="text-sm text-gray-600">{item.content}</p>
          <p className="text-xs text-gray-400">게시글 #{item.postId}</p>
        </div>
      ))}
    </div>
  );
}
