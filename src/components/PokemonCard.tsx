'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import type IPokemon from '../types/IPokemon';
import { PokemonDetailDialog } from './PokemonDetailDialog';

interface PokemonCardProps {
  pokemon: IPokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const imageSrc =
    pokemon.sprites.regular || `/placeholder.svg?height=96&width=96`;
  return (
    <>
      <Card
        className={cn(
          'group overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer',
          isHovered ? 'scale-105' : 'scale-100'
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="relative pt-4 flex justify-center items-center bg-white dark:bg-slate-800">
          <span className="absolute top-2 left-2 text-xs text-slate-500 font-mono">
            #{pokemon.pokedex_id.toString().padStart(3, '0')}
          </span>
          <img
            src={imageSrc || '/placeholder.svg'}
            alt={pokemon.name.en}
            className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <CardHeader className="p-3 pb-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">{pokemon.name.fr}</h3>
            </div>
          </div>
        </CardHeader>
        <CardContent className="">
          <p className="text-xs text-slate-500">{pokemon.category}</p>
        </CardContent>
      </Card>

      <PokemonDetailDialog
        pokemon={pokemon}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
}
