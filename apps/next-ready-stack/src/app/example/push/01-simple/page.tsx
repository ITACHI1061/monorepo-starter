'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { Input } from '@monorepo-starter/ui/components/input';
import { useState } from 'react';
import { useWebPush } from '~/lib/push/web-push-provider';

export default function WebPushSimplePage() {
  const {
    subscription,
    registration,
    subscribeToNotifications,
    unsubscribeFromNotifications,
    sendPush,
    subscribeLoading,
    unsubscribeLoading,
    sendPushLoading,
  } = useWebPush();

  const [message, setMessage] = useState('');

  if (!registration) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={async () => {
          await subscribeToNotifications();
        }}
        disabled={subscribeLoading || !!subscription}
      >
        {subscribeLoading ? 'Subscribing...' : 'Subscribe'}
      </Button>
      <Button
        onClick={async () => {
          await unsubscribeFromNotifications();
        }}
        disabled={unsubscribeLoading || !subscription}
      >
        {unsubscribeLoading ? 'Unsubscribing...' : 'Unsubscribe'}
      </Button>

      <div className="ml-8 flex max-w-80 gap-1">
        <Input
          className="flex-1"
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          onClick={async () => {
            await sendPush({ title: 'Test Notification', body: message });
          }}
          disabled={sendPushLoading}
        >
          {sendPushLoading ? 'Sending...' : 'Send Push'}
        </Button>
      </div>
    </div>
  );
}
