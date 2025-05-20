import { useCountStore } from '~/store/counter';

const dummyConcerts = [
  { id: 1, name: 'Spring Jazz Night', date: '2024-07-10' },
  { id: 2, name: 'Rock Festival', date: '2024-08-15' },
  { id: 3, name: 'Classic Evening', date: '2024-09-01' },
];

export default function Concerts() {
  const { count, inc, dec } = useCountStore();
  return (
    <main className="mt-10 flex flex-col items-center gap-6">
      <h2 className="mb-4 text-2xl font-bold">Upcoming Concerts</h2>
      <ul className="flex w-full max-w-md flex-col gap-3">
        {dummyConcerts.map((concert) => (
          <li key={concert.id} className="flex items-center justify-between rounded-lg bg-white/90 p-4 shadow">
            <span>
              <span className="font-semibold">{concert.name}</span>
              <span className="ml-2 text-sm text-gray-500">{concert.date}</span>
            </span>
            <button
              className="rounded bg-purple-500 px-3 py-1 text-white hover:bg-purple-600"
              onClick={inc}
              onContextMenu={(e) => {
                e.preventDefault();
                dec();
              }}
              title="Left click: 관심 콘서트 +1, Right click: -1"
            >
              관심추가
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-lg">
        관심 콘서트 수: <span className="font-bold">{count}</span>
      </div>
      <span className="text-xs text-gray-400">(Left click: +1, Right click: -1)</span>
    </main>
  );
}
