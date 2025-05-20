'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { Input } from '@monorepo-starter/ui/components/input';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@monorepo-starter/ui/components/input-otp';
import { Label } from '@monorepo-starter/ui/components/label';
import { Textarea } from '@monorepo-starter/ui/components/textarea';
import { useEffect, useRef, useState } from 'react';
import { formTestAction } from './actions';

export default function ServerActionClientEventKeydownPage() {
  const optFormRef = useRef<HTMLFormElement>(null);
  const [otp, setOtp] = useState<string>('');

  // 텍스트 영역에서 `Ctrl + Enter` 또는 `Cmd + Enter`를 입력하면 폼이 전송
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'Enter' || e.key === 'NumpadEnter')) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  // OTP 입력을 완료하면 서버액션 호출
  useEffect(() => {
    if (otp.length === 6 && optFormRef.current) {
      formTestAction(new FormData(optFormRef.current as HTMLFormElement));
    }
  }, [otp]);

  return (
    <div>
      <h1>Server Action Client Events</h1>
      <div className="flex flex-col gap-6">
        <form action={formTestAction} className="space-y-2">
          <Label htmlFor="entry">
            <code>Onkeydown</code> 으로 폼 전송 (서버 액션 호출)
          </Label>
          <Textarea
            name="entry"
            rows={10}
            required
            onKeyDown={handleKeyDown}
            placeholder="`Ctrl + Enter` 또는 `Cmd + Enter`를 입력하면 폼이 전송"
          />
        </form>
        <form action={formTestAction} className="space-y-2">
          <Label htmlFor="conclocation">
            <code>Onclick</code> 으로 폼 전송 (서버 액션 호출)
          </Label>
          <div className="flex gap-1">
            <Input name="conclocation" placeholder="`Onclick` 으로 폼 전송" />
            <Button type="submit">Submit</Button>
          </div>
        </form>
        <form action={formTestAction} className="space-y-2" ref={optFormRef}>
          <Label htmlFor="otp">
            <code>useEffect</code>를 통해서 폼 전송(서버 액션 호출)
          </Label>

          <InputOTP maxLength={6} id="otp" name="otp" value={otp} onChange={(value) => setOtp(value)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </form>
      </div>
    </div>
  );
}
