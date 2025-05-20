'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@monorepo-starter/ui/components/card';
import { Input } from '@monorepo-starter/ui/components/input';
import { Label } from '@monorepo-starter/ui/components/label';
import { useState } from 'react';
import { toast } from 'sonner';
import { signinAction } from './signin-action';

export default function SigninForm({ callbackUrl }: { callbackUrl: string }) {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await signinAction(loginId, password);

    if (!response.success && response.error) {
      toast.error(response.message, { closeButton: true });
      return;
    }

    // ✅ 로그인 후 `callbackUrl`을 사용하여 원래 페이지로 이동
    window.location.href = callbackUrl;
  };

  return (
    <div className="flex min-w-96 max-w-md flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="id@example.com"
                  required
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
