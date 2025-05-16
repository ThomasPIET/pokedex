type IPokemon = {
  pokedex_id: number;
  generation: number;
  category: string;
  name: {
    fr: string;
    en: string;
    jp: string;
  };
  sprites: {
    regular: string;
    shiny: string | null;
    gmax: string | null;
  };
  types: string[] | null;
  talents: string[] | null;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  } | null;
  resistances:
    | {
        type: string;
        multiplier: number;
      }[]
    | null;
  evolution: never; // à préciser si tu as la structure exacte
  height: number | null;
  weight: number | null;
  egg_groups: string[] | null;
  sexe: {
    male: number;
    female: number;
  } | null;
  catch_rate: number | null;
  level_100: number | null;
  formes: string[] | null;
};

export default IPokemon;
