import { devLog } from '@monorepo-starter/utils/console';
import { NextResponse } from 'next/server';
import { sendPushNotification } from '~/lib/push/send';

export async function POST(req: Request) {
  try {
    const { subscription, message } = await req.json();
    devLog('info', 'Received push notification request:', { message });

    await sendPushNotification(subscription, message);

    return NextResponse.json({ success: true });
  } catch (error) {
    devLog('error', 'Push notification error:', error);
    return NextResponse.json(
      {
        error: 'Failed to send push notification',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
