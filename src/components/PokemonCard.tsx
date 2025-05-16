'use client';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import type IPokemon from '../types/IPokemon';
import { PokemonDetailDialog } from './PokemonDetailDialog';

// Type color mapping
const typeColors: Record<string, string> = {
  normal: 'bg-stone-400',
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-300',
  fighting: 'bg-red-700',
  poison: 'bg-purple-600',
  ground: 'bg-amber-600',
  flying: 'bg-indigo-300',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-700',
  ghost: 'bg-purple-800',
  dragon: 'bg-indigo-600',
  dark: 'bg-stone-700',
  steel: 'bg-slate-400',
  fairy: 'bg-pink-300',
};

interface PokemonCardProps {
  pokemon: IPokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fallback image if sprite is not available
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
        <div className="relative pt-6 flex justify-center items-center bg-slate-100 dark:bg-slate-800">
          <span className="absolute top-2 left-2 text-xs text-slate-500 font-mono">
            #{pokemon.pokedex_id.toString().padStart(3, '0')}
          </span>
          <img
            src={imageSrc || '/placeholder.svg'}
            alt={pokemon.name.en}
            className="h-24 w-24 object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <CardHeader className="p-3 pb-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">{pokemon.name.en}</h3>
              <p className="text-xs text-slate-500">{pokemon.name.fr}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-2">
          <p className="text-xs text-slate-500">{pokemon.category}</p>
        </CardContent>
        <CardFooter className="p-3 pt-0 flex gap-1 flex-wrap">
          {(pokemon.types ?? []).map((t) => {
            const name = t.type?.name ?? 'unknown';
            const colorClass = typeColors[name] || 'bg-gray-400';
            return (
              <Badge key={name} className={cn(colorClass, 'capitalize')}>
                {name}
              </Badge>
            );
          })}
        </CardFooter>
      </Card>

      <PokemonDetailDialog
        pokemon={pokemon}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
}
