import { Action } from "@ngrx/store";
import { User } from "../../../models/user.model";
import { Study } from "../../../models/study.model";
import { Experience } from "../../../models/experience.model";

export enum UserActionTypes {
  LOAD_USERS = "[Users] Load users",
  LOAD_USERS_SUCCESS = "[Users] Load users success",
  LOAD_USERS_FAILED = "[Users] Load users failed",

  //Acciones de verdad
  //Establece el usuario logado en el store

  SET_CURRENT_USER = "[User] Set current user",

  UPDATE_USER = "[User] Update user",
  UPDATE_USER_SUCCESS = "[User] Update user Success",
  UPDATE_USER_ERROR = "[User] Update user Error",

  //Establece el estudio que e va a editar (o crear)
  SET_CURRENT_STUDY = "[STUDY] Set current study",
  CREATE_STUDY = "[STUDY] Create new study",
  CREATE_STUDY_SUCCESS = "[STUDY] Create new study success",
  CREATE_STUDY_ERROR = "[STUDY] Create new study error",
  UPDATE_STUDY = "[STUDY] Update study",
  UPDATE_STUDY_SUCCESS = "[STUDY] Update study Success",
  UPDATE_STUDY_ERROR = "[STUDY] Update study Error",
  DELETE_STUDY = "[STUDY] Delete study",
  DELETE_STUDY_SUCCESS = "[STUDY] Delete study Success",
  DELETE_STUDY_ERROR = "[STUDY] Delete study Error",
  //Temp, esto no va a hacer falta
  LOAD_STUDY = "[Study] Load study",
  LOAD_STUDY_SUCCESS = "[Study] Load study success",
  LOAD_STUDY_FAILED = "[Study] Load study failed",

  SET_CURRENT_EXPERIENCE = "[EXPERIENCE] Set current experience",
  CREATE_EXPERIENCE = "[EXPERIENCE] Create new experience",
  CREATE_EXPERIENCE_SUCCESS = "[EXPERIENCE] Create new experience success",
  CREATE_EXPERIENCE_ERROR = "[EXPERIENCE] Create new experience error",
  UPDATE_EXPERIENCE = "[EXPERIENCE] Update experience",
  UPDATE_EXPERIENCE_SUCCESS = "[EXPERIENCE] Update experience Success",
  UPDATE_EXPERIENCE_ERROR = "[EXPERIENCE] Update experience Error",
  DELETE_EXPERIENCE = "[EXPERIENCE] Delete experience",
  DELETE_EXPERIENCE_SUCCESS = "[EXPERIENCE] Delete experience Success",
  DELETE_EXPERIENCE_ERROR = "[EXPERIENCE] Delete experience Error",
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

/** Establece el usuario sobre el que se va a trabajar */
export class SetCurrentUser implements Action {
  readonly type = UserActionTypes.SET_CURRENT_USER;
  constructor(public payload: User) {}
}

/** Actualización del perfil de usuaruio */
export class UpdateUser implements Action {
  readonly type = UserActionTypes.UPDATE_USER;
  //Para ejecuta esta acción necesitamos los datos del usuario a actualizar
  constructor(public payload: User) {}
}

export class UpdateUserSuccess implements Action {
  readonly type = UserActionTypes.UPDATE_USER_SUCCESS;
  //Payload = usuario actualizado
  constructor(public payload: User) {}
}
export class UpdateUserError implements Action {
  readonly type = UserActionTypes.UPDATE_USER_ERROR;
  //PayLoad = mensaje de error
  constructor(public message: string) {}
}

//Acciones relacionadas con la formación académica
/** Establece la formación sobre el que se va a trabajar */
export class SetCurrentStudy implements Action {
  readonly type = UserActionTypes.SET_CURRENT_STUDY;
  //Si no recibe ningún parametro se tratará de un alta
  constructor(public payload?: Study) {}
}

export class CreateStudy implements Action {
  readonly type = UserActionTypes.CREATE_STUDY;
  constructor(public user: User, public newStudy: Study) {}
}

export class CreateStudySuccess implements Action {
  readonly type = UserActionTypes.CREATE_STUDY_SUCCESS;
  //Payload = usuario actualizado con la nueva formación
  constructor(public payload: User) {}
}
export class CreateStudyError implements Action {
  readonly type = UserActionTypes.CREATE_STUDY_ERROR;
  //PayLoad = mensaje de error
  constructor(public message: string) {}
}

export class UpdateStudy implements Action {
  readonly type = UserActionTypes.UPDATE_STUDY;
  constructor(public user: User, public study: Study) {}
}

export class UpdateStudySuccess implements Action {
  readonly type = UserActionTypes.UPDATE_STUDY_SUCCESS;
  //Payload = usuario con la formacion actualizado
  constructor(public payload: User) {}
}
export class UpdateStudyError implements Action {
  readonly type = UserActionTypes.UPDATE_STUDY_ERROR;
  //PayLoad = mensaje de error
  constructor(public message: string) {}
}

export class DeleteStudy implements Action {
  readonly type = UserActionTypes.DELETE_STUDY;
  constructor(public user: User, public study: Study) {}
}

export class DeleteStudySuccess implements Action {
  readonly type = UserActionTypes.DELETE_STUDY_SUCCESS;
  //Payload = usuario con la formacion actualizado
  constructor(public payload: User) {}
}
export class DeleteStudyError implements Action {
  readonly type = UserActionTypes.DELETE_STUDY_ERROR;
  //PayLoad = mensaje de error
  constructor(public message: string) {}
}

//ESto no va a hacer valta
export class LoadStudy implements Action {
  readonly type = UserActionTypes.LOAD_STUDY;
  constructor(public id: number) {}
}

export class LoadStudySuccess implements Action {
  readonly type = UserActionTypes.LOAD_STUDY_SUCCESS;
  constructor(public payload: Study) {}
}
export class LoadStudyFailed implements Action {
  readonly type = UserActionTypes.LOAD_STUDY_FAILED;
  constructor(public message: string) {}
}

//ACCIONES RELACIONADAS CON LA EXPERIENCIA LABORAL
export class SetCurrentExperience implements Action {
  readonly type = UserActionTypes.SET_CURRENT_EXPERIENCE;
  //Si no recibe ningún parametro se tratará de un alta
  constructor(public payload?: Experience) {}
}

export class CreateExperience implements Action {
  readonly type = UserActionTypes.CREATE_EXPERIENCE;
  constructor(public user: User, public newExperience: Experience) {}
}

export class CreateExperienceSuccess implements Action {
  readonly type = UserActionTypes.CREATE_EXPERIENCE_SUCCESS;
  //Payload = usuario actualizado con la nueva experiencia
  constructor(public payload: User) {}
}
export class CreateExperienceError implements Action {
  readonly type = UserActionTypes.CREATE_EXPERIENCE_ERROR;
  //PayLoad = mensaje de error
  constructor(public message: string) {}
}

export class UpdateExperience implements Action {
  readonly type = UserActionTypes.UPDATE_EXPERIENCE;
  constructor(public user: User, public experience: Experience) {}
}

export class UpdateExperienceSuccess implements Action {
  readonly type = UserActionTypes.UPDATE_EXPERIENCE_SUCCESS;
  //Payload = usuario con la experiencia actualizada
  constructor(public payload: User) {}
}
export class UpdateExperienceError implements Action {
  readonly type = UserActionTypes.UPDATE_EXPERIENCE_ERROR;
  //PayLoad = mensaje de error
  constructor(public message: string) {}
}

export class DeleteExperience implements Action {
  readonly type = UserActionTypes.DELETE_EXPERIENCE;
  constructor(public user: User, public experience: Experience) {}
}

export class DeleteExperienceSuccess implements Action {
  readonly type = UserActionTypes.DELETE_EXPERIENCE_SUCCESS;
  //Payload = usuario con la usuario actualizado
  constructor(public payload: User) {}
}
export class DeleteExperienceError implements Action {
  readonly type = UserActionTypes.DELETE_EXPERIENCE_ERROR;
  //PayLoad = mensaje de error
  constructor(public message: string) {}
}

//Exportamos las clases de acciones que hemos construido
export type UsersActions =
  //| LoadUsers
  | LoadUsersSuccess
  | SetCurrentUser
  | UpdateUser
  | UpdateUserSuccess
  | UpdateUserError
  | SetCurrentStudy
  | CreateStudy
  | CreateStudySuccess
  | CreateStudyError
  | UpdateStudy
  | UpdateStudySuccess
  | UpdateStudyError
  | DeleteStudy
  | DeleteStudySuccess
  | DeleteStudyError
  | LoadStudy
  | LoadStudySuccess
  | LoadStudyFailed
  //Acciones relacionadas con la experiencia laboral
  | SetCurrentExperience
  | CreateExperience
  | CreateExperienceSuccess
  | CreateExperienceError
  | UpdateExperience
  | UpdateExperienceSuccess
  | UpdateExperienceError
  | DeleteExperience
  | DeleteExperienceSuccess
  | DeleteExperienceError;
