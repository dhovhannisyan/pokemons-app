import { Pokemon } from 'src/app/core/models/pokemon.model';
import { createAction, props } from '@ngrx/store';
import { PokemonType } from 'src/app/core/models/pokemon-type.model';

export const getPokemonsStart = createAction('[Pokemons Component] Get Pokemons Start',
                                              props<{ offset: number, limit?: number, page: number }>());
export const getPokemonsEnd = createAction('[Pokemons Component] Get Pokemons End',
                                              props<{ total: number, pokemons: Pokemon[]}>());

export const getPokemonTypesStart = createAction('[Pokemons Component] Get Pokemon Types Start');
export const getPokemonTypesEnd = createAction('[Pokemons Component] Get Pokemon Types End',
                                              props<{ types: PokemonType[] }>());

export const typeSelected = createAction('[Pokemons Component] Page Selected', props<{ selectedType: number }>());

export const getPokemonsByTypeStart = createAction('[Pokemons Component] Get Pokemons By Type Start',
                                              props<{ typeId: number }>());

export const getPokemonByIdStart = createAction('[Pokemon View Component] Get Pokemon By ID Start', props<{ id: number }>());
export const getPokemonByIdEnd = createAction('[Pokemon View Component] Get Pokemon By ID End', props<{ pokemon: Pokemon}>());
