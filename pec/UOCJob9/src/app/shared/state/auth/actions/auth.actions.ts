/** Acciones relacionadas con la autenticación: login, logout */
import { Action } from "@ngrx/store";
import { User } from "../../../models/user.model";
import { Company } from "../../../models/company.model";

export enum AuthActionTypes {
  //Acciones relacionadas con la autenticación del usuaruio
  LOGIN_USER = "[AUTH] Login user",
  LOGIN_USER_SUCCESS = "[AUTH] Login user success",
  LOGIN_USER_ERROR = "[AUTH] Login user error",
  //igual con las empresas
  LOGIN_COMPANY = "[AUTH] Login company",
  LOGIN_COMPANY_SUCCESS = "[AUTH] Login company success",
  LOGIN_COMPANY_ERROR = "[AUTH] Login company error",

  LOGOUT = "[AUTH] Logout user or company",
  LOGOUT_SUCCESS = "[AUTH] Logout user or company success",
  LOGOUT_ERROR = "[AUTH] Logout user or company error",

  //Acciones relacionadas con la recuperación de la contraseña
  REMEMBER_PASSWORD = "[AUTH] Remember Password", //Inicia una nueva solicitud de recuperación de contraseña
  REMEMBER_PASSWORD_ERROR = "[AUTH] Remember Password Error", //Se ha producido un error durante el proceso de recuperación de contraseña
  REMEMBER_PASSWORD_SEND = "[AUTH] Remember Password: send mail", //Envía un email al usuario
  REMEMBER_PASSWORD_SEND_SUCCESS = "[AUTH] Remember Password: send mail, success", //El email se ha enviado con exito
  REMEMBER_PASSWORD_ALREADY_SENT = "[AUTH] Remember Password: already sent", //El usuario tiene un email de recuperación pdte
  REMEMBER_PASSWORD_CLEAR = "[AUTH] Remember Password: clear", //Elimina la información del store relativa a la recuperación de contraseña",
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
  //Si no se ha podido realizar el login, invocaremos a esta
  //acción pasandole un mensaje de error
  constructor(message: string) {}
}

//Análogo al login de Usuarios. Tiene la misma especificación a nivel de acciones,
//pero en los efectos asociados se llamarán a otros servicios del backend.

export class LoginCompany implements Action {
  readonly type = AuthActionTypes.LOGIN_COMPANY;
  constructor(public email: string, public password: string) {}
}

export class LoginCompanySuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_COMPANY_SUCCESS;
  constructor(public payload: Company) {}
}

export class LoginCompanyError implements Action {
  readonly type = AuthActionTypes.LOGIN_COMPANY_ERROR;
  constructor(message: string) {}
}

/** Desloga al usuario en la aplicación */
export class Logout implements Action {
  //No necesita parámetros, se encargará de borrar el currentUser/currentCompany
  readonly type = AuthActionTypes.LOGOUT;
  constructor() {}
}

export class LogoutSuccess implements Action {
  readonly type = AuthActionTypes.LOGOUT_SUCCESS;
  constructor() {}
}

export class LogoutError implements Action {
  readonly type = AuthActionTypes.LOGOUT_ERROR;
  constructor(public message: string) {}
}

//Inicia una nueva solicitud de recuperación de contraseña
export class RememberPassword implements Action {
  readonly type = AuthActionTypes.REMEMBER_PASSWORD;
  constructor(public email: string) {}
}

//Se ha producido un error durante el proceso de recuperación de contraseña
export class RememberPasswordError implements Action {
  readonly type = AuthActionTypes.REMEMBER_PASSWORD_ERROR;
  constructor(public message: string) {}
}

//Envía un email al usuario
export class RememberPasswordSend implements Action {
  readonly type = AuthActionTypes.REMEMBER_PASSWORD_SEND;
  constructor(public user: User) {}
}

//El email se ha enviado con exito
export class RememberPasswordSendSuccess implements Action {
  readonly type = AuthActionTypes.REMEMBER_PASSWORD_SEND_SUCCESS;
  constructor(public user: User) {}
}

//El usuario tiene un email de recuperación pdte
export class RememberPasswordAlreadySent implements Action {
  readonly type = AuthActionTypes.REMEMBER_PASSWORD_ALREADY_SENT;
  constructor(public user: User) {}
}

//Elimina la información del store relativa a la recuperación de contraseñ
export class RememberPasswordClear implements Action {
  readonly type = AuthActionTypes.REMEMBER_PASSWORD_CLEAR;
  constructor() {}
}

//Exportamos todas nuestras clases
export type AuthActions =
  | LoginUser
  | LoginUserSuccess
  | LoginUserError
  | LoginCompany
  | LoginCompanySuccess
  | LoginCompanyError
  | Logout
  | LogoutSuccess
  | LogoutError
  //recuperacion de contraseña
  | RememberPassword
  | RememberPasswordError
  | RememberPasswordSend
  | RememberPasswordSendSuccess
  | RememberPasswordAlreadySent
  | RememberPasswordClear;
