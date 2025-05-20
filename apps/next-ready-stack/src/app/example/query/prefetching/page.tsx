import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '~/lib/query/query-client';
import { PokemonInfo } from './detail';
import { pokemonOptions } from './pokemon';

export default async function Home({ searchParams }: { searchParams: Promise<{ id: string }> }) {
  const { id = '25' } = await searchParams;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(pokemonOptions(id));

  return (
    <div>
      <h1>Tanstack Query Prefetching Example</h1>
      <div className="not-prose">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <PokemonInfo id={id} />
        </HydrationBoundary>
      </div>
    </div>
  );
}
