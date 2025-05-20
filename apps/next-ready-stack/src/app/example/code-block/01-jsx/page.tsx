import { highlight } from '@monorepo-starter/ui/composites/code-highlight/highlight-jsx';
import CodeBlock from './client';

export default async function Page() {
  return (
    <div>
      <h1>Code Highlight JSX</h1>
      <p>클라이언트 컴포넌트에서 동적 하이라이트 적용(클라이언트 & 서버 적용 가능)</p>
      <CodeBlock initial={await highlight('const loader = "Rendered on server";', 'ts')} />
    </div>
  );
}
