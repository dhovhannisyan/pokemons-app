import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonsState } from './pokemon.reducers';

export const getPokemonsState = createFeatureSelector<PokemonsState>('pokemons');

export const pokemonsSelector = createSelector(
  getPokemonsState,
  (state: PokemonsState) => ({ list: state.list, total: state.total })
);

export const pokemonTypes = createSelector(
  getPokemonsState,
  (state: PokemonsState) => state.types
);

export const currentPageSelector = createSelector(
  getPokemonsState,
  (state: PokemonsState) => state.page
);

export const selectedType = createSelector(
  getPokemonsState,
  (state: PokemonsState) => state.selectedType
);

export const pokemonView = createSelector(
  getPokemonsState,
  (state: PokemonsState) => state.pokemonView
);
// Loaders
export const pokemonsLoading = createSelector(
  getPokemonsState,
  (state: PokemonsState) => state.pokemonsLoading
);

export const typesLoading = createSelector(
  getPokemonsState,
  (state: PokemonsState) => state.typesLoading
);

export const byTypeLoading = createSelector(
  getPokemonsState,
  (state: PokemonsState) => state.byTypeLoading
);

export const pokemonViewLoading = createSelector(
  getPokemonsState,
  (state: PokemonsState) => state.pokemonViewLoading
);

