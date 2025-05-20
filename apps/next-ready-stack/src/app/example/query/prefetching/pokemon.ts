import { queryOptions } from '@tanstack/react-query';

export const pokemonOptions = (id: string) =>
  queryOptions({
    queryKey: ['pokemon', id],
    staleTime: 30, // 30초
    queryFn: async () => {
      const numId = Number(id);
      const fetchPromises = [numId, numId + 1, numId + 2].map((id) => {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
          next: {
            revalidate: 60, // 1분
          },
        }).then((res) => res.json());
      });

      const result = await Promise.all(fetchPromises);
      return result;
    },
  });
