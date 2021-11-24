import { NgModule } from '@angular/core';
import { PokemonsRoutingModule } from './pokemons-routing.module';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonViewComponent } from './pokemon-view/pokemon-view.component';
import { SharedModule } from '../shared/shared.module';
import { PokemonComponent } from './root/pokemon.component';


@NgModule({
  declarations: [
    PokemonComponent,
    PokemonListComponent,
    PokemonViewComponent
  ],
  imports: [
    SharedModule,
    PokemonsRoutingModule
  ]
})
export class PokemonsModule { }
