import type IPokemon from '../types/IPokemon';
import { PokemonCard } from './PokemonCard';

interface PokemonGridProps {
  pokemon: IPokemon[];
}

export function PokemonGrid({ pokemon }: PokemonGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {pokemon.map((p) => (
        <PokemonCard key={p.pokedex_id} pokemon={p} />
      ))}
    </div>
  );
}
