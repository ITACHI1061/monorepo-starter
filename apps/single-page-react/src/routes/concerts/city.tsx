import { useParams } from 'react-router';
import { useCountStore } from '~/store/like-counter';

const cityConcerts: Record<string, { id: number; name: string; date: string; place: string }[]> = {
  seoul: [
    { id: 1, name: 'Seoul Pop Night', date: '2024-08-12', place: 'Jamsil Arena' },
    { id: 2, name: 'Han River Jazz', date: '2024-09-03', place: 'Han River Park' },
  ],
  tokyo: [
    { id: 3, name: 'Tokyo Summer Sonic', date: '2024-08-20', place: 'Makuhari Messe' },
    { id: 4, name: 'Shibuya Indie Fest', date: '2024-09-10', place: 'Shibuya O-EAST' },
  ],
  beijing: [{ id: 5, name: 'Beijing Rock Night', date: '2024-09-15', place: 'Workers Stadium' }],
  paris: [{ id: 6, name: 'Paris Jazz Festival', date: '2024-08-30', place: 'Parc Floral' }],
  london: [{ id: 7, name: 'London Classic Proms', date: '2024-09-05', place: 'Royal Albert Hall' }],
  berlin: [{ id: 8, name: 'Berlin Electronic Beats', date: '2024-09-18', place: 'Berghain' }],
  madrid: [{ id: 9, name: 'Madrid Flamenco Night', date: '2024-08-25', place: 'Teatro Real' }],
  rome: [{ id: 10, name: 'Rome Opera Gala', date: '2024-09-12', place: "Teatro dell'Opera" }],
  milan: [{ id: 11, name: 'Milan Fashion Music', date: '2024-09-20', place: 'Teatro alla Scala' }],
};

const cityImages: Record<string, string> = {
  seoul: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  tokyo: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  beijing: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  paris: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
  london: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  berlin: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
  madrid: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  rome: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  milan: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
};

function City() {
  const { city } = useParams();
  const { count, inc } = useCountStore();
  const cityKey = city ? city.toLowerCase() : '';
  const cityName = city ? city.charAt(0).toUpperCase() + city.slice(1) : '';
  const concerts = cityKey && cityConcerts[cityKey] ? cityConcerts[cityKey] : [];

  return (
    <main className="mt-10 flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <img
          src={cityKey && cityImages[cityKey] ? cityImages[cityKey] : cityImages.seoul}
          alt={cityName}
          className="mb-2 h-32 w-32 rounded-full object-cover shadow-lg"
        />
        <h1 className="text-3xl font-bold">{cityName} Concerts</h1>
        <button
          className="mt-2 rounded-lg bg-blue-500 px-4 py-1 font-medium text-white shadow transition hover:bg-blue-600"
          onClick={() => inc(cityKey)}
        >
          👍 Like {count[cityKey]}
        </button>
      </div>
      <div className="w-full max-w-xl">
        <h2 className="mb-4 text-xl font-semibold">Upcoming in {cityName}</h2>
        {concerts.length === 0 ? (
          <div className="text-center text-gray-400">No concerts found for this city.</div>
        ) : (
          <ul className="flex flex-col gap-4">
            {concerts.map((concert) => (
              <li
                key={concert.id}
                className="flex flex-col rounded-xl bg-white/90 p-4 shadow sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="font-semibold">{concert.name}</div>
                  <div className="text-sm text-gray-500">
                    {concert.date} · {concert.place}
                  </div>
                </div>
                <span className="mt-2 font-bold text-blue-500 sm:mt-0">예매 가능</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export default City;
