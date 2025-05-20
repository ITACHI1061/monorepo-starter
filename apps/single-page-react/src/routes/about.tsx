import { useCountStore } from '~/store/counter';
import { useCountStore as useLikeCountStore } from '~/store/like-counter';

export default function About() {
  const { count } = useCountStore();
  const { count: likeCount } = useLikeCountStore();
  return (
    <main className="mt-10 flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">About</h2>
      <p className="max-w-md text-center text-gray-600">
        This is a sample SPA for concert information, built with React, Vite, Zustand, and TailwindCSS.
      </p>
      <p>Like {count} times</p>
      <p>
        {Object.entries(likeCount).map(([key, value]) => (
          <p key={key}>
            {key}: {value}
          </p>
        ))}
      </p>
    </main>
  );
}
