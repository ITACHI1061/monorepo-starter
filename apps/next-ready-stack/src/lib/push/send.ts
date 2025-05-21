import { devLog } from '@monorepo-starter/utils/console';
import webPush from 'web-push';
import { env } from '~/env';

/**
 * 푸시 알림 전송
 *
 * @param subscription - 푸시 알림 구독 정보
 * @param payload - 푸시 알림 페이로드
 */
export const sendPushNotification = async (subscription: PushSubscription, payload: string) => {
  const vapidPublicKey = env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const vapidPrivateKey = env.NEXT_PUBLIC_VAPID_PRIVATE_KEY;
  const webPushEmail = env.NEXT_PUBLIC_WEB_PUSH_EMAIL;

  if (!vapidPublicKey || !vapidPrivateKey) {
    throw new Error('VAPID keys are not set');
  }

  devLog('process', `Sending push notification`);

  webPush.setVapidDetails(`mailto:${webPushEmail}`, vapidPublicKey, vapidPrivateKey);

  try {
    // 페이로드를 UTF-8 텍스트로 직접 전송
    const result = await webPush.sendNotification(subscription as unknown as webPush.PushSubscription, payload);
    devLog('success', `Push notification sent successfully`);
    return result;
  } catch (error) {
    devLog('error', `Error sending push notification`, error);
    throw error;
  }
};
