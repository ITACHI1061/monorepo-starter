import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <main className="mt-10 flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold">Welcome to Concert Info!</h1>
      <p className="text-gray-600">Discover concerts and manage your favorites.</p>
      <button
        className="rounded-lg bg-blue-500 px-6 py-2 text-white shadow transition hover:bg-blue-600 active:scale-95"
        onClick={() => setCount((c) => c + 1)}
      >
        Try Counter: {count}
      </button>
    </main>
  );
}
