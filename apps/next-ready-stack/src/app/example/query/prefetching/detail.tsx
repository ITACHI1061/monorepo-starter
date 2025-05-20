'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';
import { pokemonOptions } from './pokemon';

export function PokemonInfo({ id }: { id: string }) {
  const { data } = useSuspenseQuery(pokemonOptions(id));

  return (
    <div className="flex items-center gap-4">
      {data.map((item) => {
        return (
          <figure key={item.id}>
            <Image src={item.sprites.front_shiny} width={96} height={96} alt={item.name} />
            <h2>
              No.{item.id} <strong>{item.name}</strong>
            </h2>
          </figure>
        );
      })}
    </div>
  );
}
