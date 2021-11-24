import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { PokemonsService } from 'src/app/core/services/pokemons.service';
import * as PokemonAction  from './pokemon.actions';

@Injectable()
export class PokemonEffects {

  getPokemons$ = createEffect(() => this.actions$.pipe(
    ofType(PokemonAction.getPokemonsStart),
    mergeMap((action) => this.pokemonsService.getAllPokemons(action.offset, action.limit)
      .pipe(
        map(data => PokemonAction.getPokemonsEnd(data)),
        catchError(() => EMPTY)
      ))
    )
  );

  getPokemonTypes$ = createEffect(() => this.actions$.pipe(
    ofType(PokemonAction.getPokemonTypesStart),
    mergeMap((action) => this.pokemonsService.getAllTypes()
      .pipe(
        map(data => PokemonAction.getPokemonTypesEnd({ types: data })),
        catchError(() => EMPTY)
      ))
    )
  );

  getPokemonsByType$ = createEffect(() => this.actions$.pipe(
    ofType(PokemonAction.getPokemonsByTypeStart),
    mergeMap((action) => this.pokemonsService.getPokemonsByType(action.typeId)
      .pipe(
        map(data => PokemonAction.getPokemonsEnd(data)),
        catchError(() => EMPTY)
      ))
    )
  );

  getPokemonById$ = createEffect(() => this.actions$.pipe(
    ofType(PokemonAction.getPokemonByIdStart),
    mergeMap((action) => this.pokemonsService.getPokemonById(action.id)
      .pipe(
        map(data => PokemonAction.getPokemonByIdEnd({ pokemon: data })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private pokemonsService: PokemonsService
  ) {}
}
