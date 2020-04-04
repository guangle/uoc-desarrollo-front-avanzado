//import * as PokemonActions from '@states/pokemon/pokemon.actions';
import * as UserActions from "../actions/user.actions";

import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";

import { Injectable } from "@angular/core";

//import { Pokemon } from '@shared/interfaces/pokemon.interface';
//import { PokemonService } from '@services/pokemon.service';
import { User } from "../../../models/user.model";
import { UserService } from "../../../services/user.service";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {
    console.log(
      "Constructor de usereffect. ahora me encuentor perdido en esto.."
    );
  }

  @Effect()
  loadAllUsers$: Observable<any> = this.actions$.pipe(
    ofType(UserActions.UserActionTypes.LOAD_USERS),
    switchMap(() =>
      this.userService.getAll().pipe(
        map(users => new UserActions.LoadUsersSuccess(users)),
        catchError(error => of(new UserActions.LoadUsersFailed(error)))
      )
    )
  );

  //Faltan 2 effects..
}

//Ejemplo pokemon
/*
@Effect()
  loadAllPokemon$: Observable<any> = this.actions$.pipe(
    ofType(PokemonActions.PokemonActionTypes.LOAD_POKEMONS),
    switchMap(() =>
      this.pokemonService.getAll().pipe(
        map(pokemons => new PokemonActions.LoadPokemonSuccess(pokemons)),
        catchError(error => of(new PokemonActions.LoadPokemonFailed(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  successNotification$ = this.actions$.pipe(
    ofType(...this.POKEMON_ACTIONS_SUCCESS),
    tap(() =>
      this.snackBar.open('SUCCESS', 'Operation success', {
        duration: 2000
      })
    )
  );
  @Effect({ dispatch: false })
  failedNotification$ = this.actions$.pipe(
    ofType(...this.POKEMON_ACTIONS_FAILED),
    tap(() =>
      this.snackBar.open('FAILED', 'Operation failed', {
        duration: 2000
      })
    )
  );
  */
