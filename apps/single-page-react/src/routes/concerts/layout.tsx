import { cn } from '@monorepo-starter/ui/lib/utils';
import { Link, Outlet, useLocation } from 'react-router';

export default function ConcertsLayout() {
  const location = useLocation();
  return (
    <div className="flex border border-amber-300 ring-2 ring-amber-200/50">
      <nav className="border-r bg-amber-50 p-4">
        <ul className="flex flex-col gap-2">
          <li
            className={cn(
              'rounded-md bg-amber-100 px-4 py-1 text-amber-800/50',
              location.pathname === '/concerts' && 'bg-amber-200 text-amber-800',
            )}
          >
            <Link to="/concerts">Home</Link>
          </li>
          <li
            className={cn(
              'rounded-md bg-amber-100 px-4 py-1 text-amber-800/50',
              location.pathname === '/concerts/trending' && 'bg-amber-200 text-amber-800',
            )}
          >
            <Link to="/concerts/trending">Trending</Link>
          </li>
          {['Seoul', 'Tokyo', 'Beijing', 'Paris', 'London', 'Berlin', 'Madrid', 'Rome', 'Milan'].map((city, index) => (
            <li
              key={index + 10}
              className={cn(
                'rounded-md bg-amber-100 px-4 py-1 text-amber-800/50',
                location.pathname === `/concerts/${city}` && 'bg-amber-200 text-amber-800',
              )}
            >
              <Link to={`/concerts/${city}`}>{city}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}
