import { delay } from '@monorepo-starter/utils/fn';
import { random } from '@monorepo-starter/utils/number';

async function getData() {
  // 1~3초 사이 랜덤 딜레이
  const delayTime = random(300, 1500);
  await delay(delayTime);

  // 20% 확률로 에러 발생
  const errorRate = random(0, 20);

  if (errorRate > 18) {
    throw new Error(`알림을 불러오는데 실패했습니다. (${delayTime / 1000}s 소요)`);
  }

  return [
    { id: 1, type: 'mention', message: '새로운 멘션이 있습니다.', isRead: false },
    { id: 2, type: 'like', message: '게시글에 좋아요가 달렸습니다.', isRead: true },
    { id: 3, type: 'comment', message: '새로운 댓글이 달렸습니다.', isRead: false },
  ];
}

export default async function AppRouteParallelNotificationsPage() {
  const data = await getData();

  return (
    <div className="space-y-2">
      {data.map((item) => (
        <div key={item.id} className={`rounded p-2 ${item.isRead ? 'bg-gray-50' : 'bg-blue-50'}`}>
          <div className="flex items-center gap-2">
            {!item.isRead && <span className="h-2 w-2 rounded-full bg-blue-500"></span>}
            <p className="text-sm text-gray-600">{item.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
