/** Acciones relacionadas con la autenticación: login, logout */
import { Action } from "@ngrx/store";
import { User } from "../../../models/user.model";
import { Company } from "../../../models/company.model";

export enum AuthActionTypes {
  LOGIN_USER = "[AUTH] Login user",
  LOGIN_USER_SUCCESS = "[AUTH] Login user success",
  LOGIN_USER_ERROR = "[AUTH] Login user error",
  //igual con las empresas
  LOGIN_COMPANY = "[AUTH] Login company",
  LOGIN_COMPANY_SUCCESS = "[AUTH] Login company success",
  LOGIN_COMPANY_ERROR = "[AUTH] Login company error"
}

//Implementamos una clase acción por cada una de las acciones enumeradas anteriormente

export class LoginUser implements Action {
  readonly type = AuthActionTypes.LOGIN_USER;
  //En este caso, para invocar a la acción necesitamos recibir las credenciales
  //propocionadas por el usuario
  constructor(public email: string, public password: string) {}
}

export class LoginUserSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_USER_SUCCESS;
  //Si todo va bien en el login, podremos inyectar un usuario
  //en el constructor de esta acción
  constructor(public payload: User) {}
}

export class LoginUserError implements Action {
  readonly type = AuthActionTypes.LOGIN_USER_ERROR;
  constructor(message: string) {}
}

export class LoginCompany implements Action {
  readonly type = AuthActionTypes.LOGIN_COMPANY;
  //En este caso, para invocar a la acción necesitamos recibir las credenciales
  //propocionadas por el usuario
  constructor(public email: string, public password: string) {}
}

export class LoginCompanySuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_COMPANY_SUCCESS;
  //Si todo va bien en el login, podremos inyectar un usuario
  //en el constructor de esta acción
  constructor(public payload: Company) {}
}

export class LoginCompanyError implements Action {
  readonly type = AuthActionTypes.LOGIN_COMPANY_ERROR;
  constructor(message: string) {}
}

//Exportamos todas nuestras clases
export type AuthActions =
  | LoginUser
  | LoginUserSuccess
  | LoginUserError
  | LoginCompany
  | LoginCompanySuccess
  | LoginCompanyError;
