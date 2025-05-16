import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from './ui/card';

import { useGetPokemonsQuery } from '../api/pokemonAPI.ts';

export const PokedexCard = () => {
  const { data = [], error, isLoading } = useGetPokemonsQuery(10);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Pokedex</CardTitle>
        <CardDescription>Find all your Pokemons here</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error loading pokemons</div>}
        {data && (
          <ul>
            {data.map((pokemon) => (
              <li key={pokemon.pokedex_id}>{pokemon.name.fr}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
