import { devLog } from '@monorepo-starter/utils/console';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
  try {
    const subscription = await req.json();

    // 구독 정보를 데이터베이스에서 삭제하는 로직을 추가
    devLog('info', 'Received push notification unsubscribe:', subscription);

    // 결과 반환
    return NextResponse.json({ message: 'Unsubscription successful' });
  } catch (error) {
    devLog('error', 'Unsubscription error:', error);
    return NextResponse.json({ error: 'Unsubscription failed' }, { status: 500 });
  }
}
