import { CodeEditor } from '@monorepo-starter/ui/composites/code-editor/editor';

const code =
  `
import React, { useState, useEffect } from 'react';

/**
 * 사용자 정보를 나타냅니다.
 * @typedef {Object} User
 * @property {ID} id - 사용자 ID
 * @property {string} name - 사용자 이름
 * @property {boolean} isAdmin - 관리자 여부
 */
type ID = number | string;

interface User {
  id: ID;
  name: string;
  isAdmin: boolean;
}

enum Role {
  Admin,
  User,
  Guest,
}

/**
 * 메서드 호출을 로그로 남기는 데코레이터입니다.
 */
function LogMethod(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    return original.apply(this, args);
  };
  return descriptor;
}

/* 
  무한히 증가하는 ID를 생성하는 
  제너레이터 함수입니다.
*/
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

// 사용자 정보를 비동기로 가져오는 함수
async function fetchUser(): Promise<User> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({ id: 1, name: 'Alice', isAdmin: true });
    }, 500)
  );
}

// 제네릭 함수
function identity<T>(value: T): T {
  return value;
}

// 정규식 테스트 함수
function isEmail(input: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
  return regex.test(input);
}

// 클래스 선언
class Person {
  constructor(public id: ID, public name: string) {}

  @LogMethod
  greet(): string {
    return \`Hello, \${this.name}\`;
  }
}

// React 컴포넌트
const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const idGen = idGenerator();
  const person = new Person(1, "Alice");

  useEffect(() => {
    (async () => {
      const u = await fetchUser();
      setUser(u);
      person.greet();
    })();
  }, []);

  const handleClick = () => {
    const nextId = idGen.next().value;
    const testEmail = "test@example.com";
    const valid = isEmail(testEmail);
  };

  return (
    <div className="app">
      <h1>TSX Full Token Test</h1>
      <button onClick={handleClick}>Test</button>
      {user?.isAdmin && <p>Welcome, Admin {user.name}</p>}
    </div>
  );
};

export default App;

`.trim() + '\n';

export default async function CodePage() {
  return (
    <div>
      <h1>코드 에디터</h1>
      <div className="flex flex-col gap-4">
        <CodeEditor language="typescript" height="50vh">
          {code}
        </CodeEditor>
        <CodeEditor language="yaml" height="30vh">
          {`
a: 1
b: 2
c: 3
case: |
  멀티라인
  티
  라
  인    스트링
 
        `.trim()}
        </CodeEditor>
      </div>
    </div>
  );
}
