import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PokemonType } from 'src/app/core/models/pokemon-type.model';
import { Pokemon } from 'src/app/core/models/pokemon.model';
import { PokemonsState } from '../store/pokemon.reducers';
import * as PokemonSelector from '../store/pokemon.selectors';
import { first } from 'rxjs/operators'
import { Observable } from 'rxjs';
import * as PokemonAction  from '../store/pokemon.actions';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemons: Pokemon[] = [];
  totalPokemons: number;
  limit = 13;
  page = 1;
  offset = 0;
  types: PokemonType[] = [];
  searchForm: FormGroup;
  pokemonsLoading$: Observable<boolean>;
  typesLoading$: Observable<boolean>;
  byTypeLoading$: Observable<boolean>;

  constructor(private store: Store<PokemonsState>,
              private fb: FormBuilder ) { }

  ngOnInit(): void {
    // Set Loaders
    this.pokemonsLoading$ = this.store.select(PokemonSelector.pokemonsLoading);
    this.typesLoading$ = this.store.select(PokemonSelector.typesLoading);
    this.byTypeLoading$ = this.store.select(PokemonSelector.byTypeLoading);
    this.createSearchForm();
    // Get Pokemons
    this.store.select(PokemonSelector.pokemonsSelector).subscribe(res => {
      this.pokemons = res.list;
      this.totalPokemons = res.total;
    });
    this.store.select(PokemonSelector.currentPageSelector).pipe(first()).subscribe(page => {
      this.page = page;
    });
    this.getPokemons(this.page);
    // Get Pokemon Types
    this.store.select(PokemonSelector.pokemonTypes).subscribe(types => {
      this.types = types;
    });
    this.store.dispatch(PokemonAction.getPokemonTypesStart());
    // Pokemon Type Change
    this.store.select(PokemonSelector.selectedType).pipe(first()).subscribe(val => {
      this.searchForm.get('type').patchValue(val);
    });
  }

  createSearchForm() {
    this.searchForm = this.fb.group({ type: 1 });
    this.subscribeToTypeChange();
  }

  onSubmit() {
    const type = +this.searchForm.getRawValue().type;
    this.getPokemonsByType(type);
  }

  getPokemonsByType(id: number) {
    this.store.dispatch(PokemonAction.getPokemonsByTypeStart({ typeId: id}));
  }

  getPokemons(pageNumber: number) {
    this.offset = (pageNumber-1) * this.limit;
    this.store.dispatch(PokemonAction.getPokemonsStart({
      offset: this.offset,
      limit: this.limit,
      page: pageNumber
    }));
  }

  subscribeToTypeChange() {
    this.searchForm.get('type').valueChanges.subscribe(val => {
      this.store.dispatch(PokemonAction.typeSelected({ selectedType: +val }))
    });
  }

}
