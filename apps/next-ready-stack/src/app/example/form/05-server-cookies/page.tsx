import { Button } from '@monorepo-starter/ui/components/button';
import { Input } from '@monorepo-starter/ui/components/input';
import { devLog } from '@monorepo-starter/utils/console';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export default async function ServerActionCookiePage() {
  const cookieStore = await cookies();
  const name = cookieStore.get('name');

  async function action(formData: FormData) {
    'use server';

    const cookieStore = await cookies();
    const name = formData.get('name') as string;

    if (name) {
      cookieStore.set('name', name, { maxAge: 60 * 60 * 24 * 30 }); // maxAge를 주지 않으면, 브라우저 종료 시 삭제됨
    }

    devLog('info', `formData.get('name'): ${formData.get('name')}`);
    revalidatePath('/example/form/05-server-cookies');
  }

  return (
    <div>
      <h1>Server Action Cookie (Only Server Components)</h1>
      <p>
        Server Action 에서 쿠키를 사용한 예제(30일동안 저장)
        <br />
        브라우저가 종료되어도 유지됨
      </p>
      <form action={action} className="flex flex-col gap-2">
        <Input placeholder="Name" type="text" name="name" />
        <Button type="submit">Submit</Button>
      </form>
      <div>
        <p>
          Saved Cookie Name: <code className="text-red-800">{name?.value}</code>
        </p>
      </div>
    </div>
  );
}
