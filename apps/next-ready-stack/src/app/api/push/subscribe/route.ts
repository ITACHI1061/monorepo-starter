import { devLog } from '@monorepo-starter/utils/console';
import { NextResponse } from 'next/server';
import { sendPushNotification } from '~/lib/push/send';

export async function POST(req: Request) {
  try {
    const subscription = await req.json();

    // 구독 정보를 데이터베이스에 저장하는 로직을 추가
    devLog('info', 'Received push notification subscription:', subscription);

    // 테스트를 위한 즉시 알림 전송
    const payload = JSON.stringify({ title: 'Subscription', body: 'Subscription successful' });
    await sendPushNotification(subscription, payload);

    // 결과 반환
    return NextResponse.json({ message: 'Subscription successful' });
  } catch (error) {
    devLog('error', 'Subscription error:', error);
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}
