import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

export const PokedexCard = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Pokedex</CardTitle>
        <CardDescription>Find all your Pokemons here</CardDescription>
      </CardHeader>
    </Card>
  );
};
