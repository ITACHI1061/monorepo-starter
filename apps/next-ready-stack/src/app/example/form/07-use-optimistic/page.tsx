'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { Input } from '@monorepo-starter/ui/components/input';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { useOptimistic, useRef, useState } from 'react';
import { addMessageAction } from './actions';

export type Message = {
  id: number;
  pending: boolean;
  message: string;
};

export default function ServerActionUseOptimisticPage() {
  const formRef = useRef<HTMLFormElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, pending: false, message: 'Hello' },
    { id: 2, pending: false, message: '안녕하세요' },
    { id: 3, pending: false, message: 'こんにちは' },
    { id: 4, pending: false, message: '你好' },
    { id: 5, pending: false, message: 'Hola' },
  ]);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic<Message[]>(messages);

  // Send 버튼 클릭
  const sendMessageAction = async (formData: FormData) => {
    const newId = messages.length + 1;
    const message = formData.get('message') as string;

    // 낙관적 UI 업데이트
    addOptimisticMessage((prev) => {
      return [...prev, { id: newId, pending: true, message }];
    });

    // 서버 액션 호출
    const savedMessage = await addMessageAction(message);

    // 서버 액션 완료 후 낙관적 UI 업데이트 취소 및 동기화
    setMessages((prev) => {
      const next = [
        ...prev.filter((m) => !(m.pending && m.message === savedMessage)),
        { id: prev.length + 1, pending: false, message: savedMessage },
      ];
      return next;
    });

    // useOptimistic 내부 상태도 동기화
    addOptimisticMessage(() => [...messages, { id: messages.length + 1, pending: false, message: savedMessage }]);

    // 폼 리셋
    formRef.current?.reset();
  };

  return (
    <div>
      <h1>Server Action Use Optimistic</h1>

      <div className="bg-foreground/10 mb-4 rounded-lg p-4">
        {optimisticMessages.map((message) => (
          <div key={message.id}>
            <span className={cn(message.pending && 'animate-pulse text-gray-500')}>{message.message}</span>
          </div>
        ))}
      </div>
      <form action={sendMessageAction} className="flex gap-2" ref={formRef}>
        <Input type="text" name="message" placeholder="Message" />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
