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
import { Button } from '@/components/ui/button';
import type IPokemon from '../types/IPokemon';

export const PokedexCard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPokemon.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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
          <div className="mt-4 flex-1 overflow-auto pr-2 flex flex-col">
            <PokemonGrid pokemon={currentItems} />
            {filteredPokemon.length === 0 ? (
              <div className="flex items-center justify-center h-32">
                <p className="text-slate-500">
                  No Pokémon found matching your criteria
                </p>
              </div>
            ) : (
              <div className="flex justify-center mt-6 mb-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="h-8 w-8"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </Button>

                  {(() => {
                    const pages = [];
                    const MAX_VISIBLE = 5;

                    pages.push(
                      <Button
                        key={1}
                        variant={currentPage === 1 ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handlePageChange(1)}
                        className="h-8 w-8"
                      >
                        1
                      </Button>
                    );

                    if (currentPage > MAX_VISIBLE) {
                      pages.push(
                        <span key="start-ellipsis" className="text-gray-500">
                          ...
                        </span>
                      );
                    }

                    const startPage = Math.max(
                      2,
                      currentPage - Math.floor(MAX_VISIBLE / 2)
                    );
                    const endPage = Math.min(
                      totalPages - 1,
                      startPage + MAX_VISIBLE - 1
                    );

                    for (let i = startPage; i <= endPage; i++) {
                      if (i === 1 || i === totalPages) continue; // Skip first and last pages
                      pages.push(
                        <Button
                          key={i}
                          variant={currentPage === i ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handlePageChange(i)}
                          className="h-8 w-8"
                        >
                          {i}
                        </Button>
                      );
                    }

                    if (endPage < totalPages - 1) {
                      pages.push(
                        <span key="end-ellipsis" className="text-gray-500">
                          ...
                        </span>
                      );
                    }

                    if (totalPages > 1) {
                      pages.push(
                        <Button
                          key={totalPages}
                          variant={
                            currentPage === totalPages ? 'default' : 'outline'
                          }
                          size="sm"
                          onClick={() => handlePageChange(totalPages)}
                          className="h-8 w-8"
                        >
                          {totalPages}
                        </Button>
                      );
                    }

                    return pages;
                  })()}

                  <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="h-8 w-8"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
