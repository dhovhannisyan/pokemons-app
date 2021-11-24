import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/core/models/pokemon.model';
import { PokemonsState } from '../store/pokemon.reducers';
import * as PokemonAction  from '../store/pokemon.actions';
import * as PokemonSelector from '../store/pokemon.selectors';


@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrls: ['./pokemon-view.component.scss']
})
export class PokemonViewComponent implements OnInit, OnDestroy {

  pokemon: Pokemon;
  loaging$: Observable<boolean>;

  constructor(private route: ActivatedRoute,
              private store: Store<PokemonsState>) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.store.dispatch(PokemonAction.getPokemonByIdStart({ id }));
    this.store.select(PokemonSelector.pokemonView).subscribe(pokemon => {
      this.pokemon = pokemon;
    });
    this.loaging$ = this.store.select(PokemonSelector.pokemonViewLoading);
  }

  ngOnDestroy() {
    this.store.dispatch(PokemonAction.getPokemonByIdEnd({ pokemon: null }));
  }

}
