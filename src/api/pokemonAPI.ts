import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import IPokemon from '../types/IPokemon.tsx';

export const pokemonAPI = createApi({
  reducerPath: 'pokemon',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://tyradex.vercel.app/api/v1/pokemon',
  }),
  tagTypes: ['pokemon'],
  endpoints: (builder) => ({
    getPokemons: builder.query<IPokemon[], number>({
      query: () => ``,
      providesTags: ['pokemon'],
    }),
  }),
});

export const { useGetPokemonsQuery } = pokemonAPI;
