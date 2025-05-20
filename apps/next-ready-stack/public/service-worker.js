// @ts-check
/// <reference lib="webworker" />

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
run(self);

/**
 * @typedef {Object} PushDataOption
 * @property {string} title
 * @property {string} body
 * @property {string?} icon
 * @property {string?} link
 *
 * @param {ServiceWorkerGlobalScope} self
 */
function run(self) {
  /**
   * 서비스 워커 설치 이벤트 처리
   */
  self.addEventListener('install', (event) => {
    console.log('Service Worker installing..');
    event.waitUntil(self.skipWaiting());
  });

  /**
   * 서비스 워커 활성화
   */
  self.addEventListener('activate', (event) => {
    console.log('Service Worker activating..');
    event.waitUntil(self.clients.claim());
  });

  /**
   * 푸시 이벤트 구독 처리
   */
  self.addEventListener('push', (event) => {
    if (!event.data) {
      console.log('Push event but no data');
      return;
    }

    const data = /** @type {PushDataOption} */ (event.data.json());

    /** @type {NotificationOptions} */
    const options = {
      body: data.body,
      icon: data.icon ?? '/favicon.ico',
      badge: data.icon ?? '/favicon.ico',
      tag: Date.now().toString(),
      requireInteraction: true,
      data: {
        link: data.link,
      },
    };

    event.waitUntil(
      self.registration
        .showNotification(data.title, options)
        .then(() => {
          console.log('Notification displayed successfully');
          return self.registration.getNotifications();
        })
        .then((notifications) => {
          console.log('Active notifications:', notifications.length);
        }),
    );
  });

  /**
   * 알림 클릭 이벤트 처리
   */
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    event.waitUntil(
      self.clients.matchAll({ type: 'window' }).then((clientList) => {
        for (const client of clientList) {
          if (client.url === event.notification.data.link && 'focus' in client) {
            return client.focus();
          }
        }

        return self.clients.openWindow(event.notification.data.link);
      }),
    );
  });

  /**
   * 알림 닫기 이벤트 처리
   * @param {NotificationEvent} event
   * @returns {void}
   */
  self.addEventListener('notificationclose', (event) => {
    console.log('Notification closed:', event.notification);
  });
}
