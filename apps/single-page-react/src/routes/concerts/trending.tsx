import { useState } from 'react';

const trendingConcerts = [
  {
    id: 1,
    name: 'Summer K-POP Festival',
    date: '2024-08-20',
    place: 'Seoul Olympic Stadium',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    hot: true,
  },
  {
    id: 2,
    name: 'Jazz Night Live',
    date: '2024-09-05',
    place: 'Blue Note Jazz Club',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    hot: false,
  },
  {
    id: 3,
    name: 'Rock Revolution',
    date: '2024-10-12',
    place: 'Busan Rock Hall',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
    hot: true,
  },
];

function Trending() {
  const [likes, setLikes] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikes((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  return (
    <main className="mt-10 flex flex-col items-center gap-8">
      <h2 className="flex items-center gap-2 text-3xl font-bold">
        <span role="img" aria-label="fire">
          🔥
        </span>{' '}
        Trending Concerts
      </h2>
      <div className="grid w-full max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2">
        {trendingConcerts.map((concert) => (
          <div
            key={concert.id}
            className="flex flex-col overflow-hidden rounded-xl bg-white/90 shadow-lg transition hover:scale-[1.02]"
          >
            <img src={concert.image} alt={concert.name} className="h-40 w-full object-cover" />
            <div className="flex flex-col gap-2 p-5">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{concert.name}</span>
                {concert.hot && <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">HOT</span>}
              </div>
              <div className="text-sm text-gray-500">
                {concert.date} · {concert.place}
              </div>
              <button
                className={`mt-2 rounded-lg px-4 py-1 font-medium shadow ${
                  likes.includes(concert.id) ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-pink-100'
                } transition`}
                onClick={() => toggleLike(concert.id)}
              >
                {likes.includes(concert.id) ? '♥ 관심 취소' : '♡ 관심 추가'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Trending;
