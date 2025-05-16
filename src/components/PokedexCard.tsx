'use client';

import { useState } from 'react';
import { useGetPokemonsQuery } from '../api/pokemonAPI';
import { PokemonGrid } from './PokemonGrid';
import { SearchBar } from './SearchBar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type IPokemon from '../types/IPokemon';

export const PokedexCard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const { data = [], error, isLoading } = useGetPokemonsQuery(151);

  const filteredPokemon = data.filter((pokemon: IPokemon) => {
    // Skip Pokémon with ID 0
    if (pokemon.pokedex_id === 0) {
      return false;
    }
    
    const matchesSearch =
      searchTerm === '' ||
      pokemon.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.name.fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.pokedex_id.toString().includes(searchTerm);

    const matchesType =
      selectedTypes.length === 0 ||
      (pokemon.types &&
        pokemon.types.some((type) => selectedTypes.includes(type)));

    return matchesSearch && matchesType;
  });

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">Pokédex</CardTitle>
        <CardDescription>Explore the world of Pokémon</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex flex-col">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedTypes={selectedTypes}
          onTypeChange={setSelectedTypes}
        />

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500">Error loading Pokémon data</p>
          </div>
        ) : (
          <div className="mt-4 flex-1 overflow-y-auto pr-2">
            <PokemonGrid pokemon={filteredPokemon} />
            {filteredPokemon.length === 0 && (
              <div className="flex items-center justify-center h-32">
                <p className="text-slate-500">
                  No Pokémon found matching your criteria
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
