import { createReducer, on } from '@ngrx/store';
import { PokemonType } from 'src/app/core/models/pokemon-type.model';
import { Pokemon } from 'src/app/core/models/pokemon.model';
import * as PokemonAction  from './pokemon.actions';

export interface PokemonsState {
  total: number;
  list: Pokemon[];
  types: PokemonType[];
  page: number;
  selectedType: number;
  pokemonView: Pokemon | null;
  pokemonViewLoading: boolean;
  pokemonsLoading: boolean;
  typesLoading: boolean;
  byTypeLoading: boolean;
}

const initialState: PokemonsState = {
  total: 0,
  list: [],
  types: [],
  page: 1,
  selectedType: 1,
  pokemonView: null,
  pokemonViewLoading: false,
  pokemonsLoading: false,
  typesLoading: false,
  byTypeLoading: false
};

export const pokemonsReducer = createReducer(
  initialState,
  on(PokemonAction.getPokemonsStart, (state, action) => {
    return { ...state, page: action.page, pokemonsLoading: true };
  }),
  on(PokemonAction.getPokemonsEnd, (state, action) => {
    return {
        ...state,
        list: action.pokemons,
        total: action.total,
        pokemonsLoading: false,
        byTypeLoading: false
      };
  }),
  on(PokemonAction.getPokemonTypesStart, (state, action) => {
    return { ...state, typesLoading: true };
  }),
  on(PokemonAction.getPokemonTypesEnd, (state, action) => {
    return { ...state, types: action.types, typesLoading: false };
  }),
  on(PokemonAction.typeSelected, (state, action) => {
    return { ...state, selectedType: action.selectedType };
  }),
  on(PokemonAction.getPokemonsByTypeStart, (state, action) => {
    return { ...state, byTypeLoading: true };
  }),
  on(PokemonAction.getPokemonByIdStart, (state, action) => {
    return { ...state, pokemonViewLoading: true };
  }),
  on(PokemonAction.getPokemonByIdEnd, (state, action) => {
    return {
      ...state,
      pokemonView: action.pokemon,
      pokemonViewLoading: false
    };
  })
);

