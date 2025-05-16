import { configureStore } from '@reduxjs/toolkit';
import trainerReducer from './slices/trainer-slice';
import { pokemonAPI } from '@/api/pokemonAPI.ts';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    trainer: trainerReducer,
    [pokemonAPI.reducerPath]: pokemonAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonAPI.middleware),
});

setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
