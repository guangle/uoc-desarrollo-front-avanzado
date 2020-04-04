import { Action } from "@ngrx/store";
import { User } from "../../../models/user.model";

export enum PokemonActionTypes {
  ADD = "[Pokemon] Add",
  ADD_SUCCESS = "[Pokemon] Add success",
  ADD_FAILED = "[Pokemon] Add failed",
  LOAD_POKEMONS = "[Pokemon] Load pokemon",
  LOAD_POKEMONS_SUCCESS = "[Pokemon] Load pokemon success",
  LOAD_POKEMONS_FAILED = "[Pokemon] Load pokemon failed",
  UPDATE = "[Pokemon] Update",
  UPDATE_SUCCESS = "[Pokemon] Update success",
  UPDATE_FAILED = "[Pokemon] Update failed",
  DELETE = "[Pokemon] Delete",
  DELETE_SUCCESS = "[Pokemon] Delete success",
  DELETE_FAILED = "[Pokemon] Delete failed"
}

export enum UserActionTypes {
  LOAD_USERS = "[Users] Load users",
  LOAD_USERS_SUCCESS = "[Users] Load users success",
  LOAD_USERS_FAILED = "[Users] Load users failed"
}

//Acciones que podrán ser invocadas desde nuestra aplicacion
export class LoadUsers implements Action {
  readonly type = UserActionTypes.LOAD_USERS;
  constructor() {}
}

export class LoadUsersSuccess implements Action {
  readonly type = UserActionTypes.LOAD_USERS_SUCCESS;
  //Si esta accion se ejecuta, tendremo sun array de usuarios
  constructor(public payload: Array<User>) {}
}
export class LoadUsersFailed implements Action {
  readonly type = UserActionTypes.LOAD_USERS_FAILED;
  //Si esta accion se ejecuta, tendremos un mensaje de error
  constructor(public message: string) {}
}

//Exportamos las clases de acciones que hemos construido
export type UsersActions = LoadUsers | LoadUsersSuccess;

/*
export class LoadPokemon implements Action {
  readonly type = PokemonActionTypes.LOAD_POKEMONS;

  constructor() {}
}

export class LoadPokemonSuccess implements Action {
  readonly type = PokemonActionTypes.LOAD_POKEMONS_SUCCESS;

  constructor(public payload: Array<Pokemon>) {}
}
export class LoadPokemonFailed implements Action {
  readonly type = PokemonActionTypes.LOAD_POKEMONS_FAILED;

  constructor(public message: string) {}
}
*/
