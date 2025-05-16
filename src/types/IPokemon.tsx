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
    atk: number;
    def: number;
    spe_atk: number;
    spe_def: number;
    vit: number;
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
