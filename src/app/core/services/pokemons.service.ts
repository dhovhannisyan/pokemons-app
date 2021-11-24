import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpCommonService } from './http-common.service';
import { map } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon.model';
import { PokemonType } from '../models/pokemon-type.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(private http: HttpCommonService) { }

  getAllPokemons(offset = 1, limit = 13): Observable<{total: number, pokemons: Pokemon[]}> {
    return this.http.get(`pokemon?limit=${limit}&offset=${offset}.`).pipe(map(res => {
      return {
        total: res['count'],
        pokemons: (res['results'] as Array<any>).map(pokemon => {
          const urlFragments = pokemon['url'].split('/');
          return {
            id: +urlFragments[urlFragments.length - 2],
            name: pokemon['name']
          }
        })
      }
    }));
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get(`pokemon/${id}`).pipe(map(res => this.transferToPokemonType(res)));
  }

  getAllTypes(): Observable<PokemonType[]> {
    return this.http.get('type').pipe(map(res => {
      return (res['results'] as Array<any>).map(type => {
        const urlFragments = type['url'].split('/');
        return {
          id: +urlFragments[urlFragments.length - 2],
          name: type['name']
        };
      })
    }));
  }

  getPokemonsByType(id: number): Observable<{total: number, pokemons: Pokemon[]}> {
    return this.http.get(`type/${id}`).pipe(map(res => {
      const pokemons = (res['pokemon'] as Array<any>).map(pokemon => {
          const urlFragments = pokemon['pokemon']['url'].split('/');
          return {
            id: +urlFragments[urlFragments.length - 2],
            name: pokemon['pokemon']['name']
          };
        });
        return {
          total: res['count'],
          pokemons
        };
      })
    );
  }

  transferToPokemonType(res): Pokemon {
    const stats = (res['stats'] as []).map(stat => {
      return stat['stat']['name'];
    });
    const types = (res['types'] as []).map(type => {
      return type['type']['name'];
    });
    const pokemon: Pokemon = {
      id: res['id'],
      name: res['name'],
      weight: res['weight'],
      height: res['height'],
      base_experience: res['base_experience'],
      order: res['order'],
      shiny_img: res['sprites']['front_shiny'],
      default_img: res['sprites']['front_default'],
      stats,
      types
    };
    return pokemon;
  }

}
