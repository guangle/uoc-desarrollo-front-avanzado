import { Action } from "@ngrx/store";
import { User } from "../../../models/user.model";
import { Study } from "../../../models/study.model";
import { Experience } from "../../../models/experience.model";
import { Language } from "../../../models/language.model";

export enum UserActionTypes {
  LOAD_USERS = "[Users] Load users",
  LOAD_USERS_SUCCESS = "[Users] Load users success",
  LOAD_USERS_FAILED = "[Users] Load users failed",

  //Acciones relacionadas con el perfil de usuario
  SET_CURRENT_USER = "[User] Set current user", //Establece el usuario logado en el store
  UPDATE_USER = "[User] Update user",
  UPDATE_USER_SUCCESS = "[User] Update user Success",
  UPDATE_USER_ERROR = "[User] Update user Error",

  //Acciones relacionadas con la gestión de la formación del usuario
  SET_CURRENT_STUDY = "[STUDY] Set current study", //Establece el estudio que e va a editar (o crear)
  CREATE_STUDY = "[STUDY] Create new study",
  CREATE_STUDY_SUCCESS = "[STUDY] Create new study success",
  CREATE_STUDY_ERROR = "[STUDY] Create new study error",
  UPDATE_STUDY = "[STUDY] Update study",
  UPDATE_STUDY_SUCCESS = "[STUDY] Update study Success",
  UPDATE_STUDY_ERROR = "[STUDY] Update study Error",
  DELETE_STUDY = "[STUDY] Delete study",
  DELETE_STUDY_SUCCESS = "[STUDY] Delete study Success",
  DELETE_STUDY_ERROR = "[STUDY] Delete study Error",

  //Acciones relacionadas con la gestión de experiencia laboral del usuario
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

  //Acciones relacionadas con la gestión de idiomas
  SET_CURRENT_LANGUAGE = "[LANGUAGE] Set current Language",
  CREATE_LANGUAGE = "[LANGUAGE] Create new Language",
  CREATE_LANGUAGE_SUCCESS = "[LANGUAGE] Create new Language success",
  CREATE_LANGUAGE_ERROR = "[LANGUAGE] Create new Language error",
  UPDATE_LANGUAGE = "[LANGUAGE] Update Language",
  UPDATE_LANGUAGE_SUCCESS = "[LANGUAGE] Update Language Success",
  UPDATE_LANGUAGE_ERROR = "[LANGUAGE] Update Language Error",
  DELETE_LANGUAGE = "[LANGUAGE] Delete Language",
  DELETE_LANGUAGE_SUCCESS = "[LANGUAGE] Delete Language Success",
  DELETE_LANGUAGE_ERROR = "[LANGUAGE] Delete Language Error",
}

/** Carga todos los usuarios de nuestra backend */
export class LoadUsers implements Action {
  readonly type = UserActionTypes.LOAD_USERS;
  constructor() {}
}

/** Exito al cargar los usuarios de nuestro backend */
export class LoadUsersSuccess implements Action {
  readonly type = UserActionTypes.LOAD_USERS_SUCCESS;
  //Si esta accion se ejecuta, tendremo sun array de usuarios procedente de nuestro fake-backend
  constructor(public payload: Array<User>) {}
}
/** Acción que se invocará si ha ocurrido un error cargando los usuarios  */
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

/** Exito al actualizar el usuario */
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
//-------------------------------------------------
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

//Acciones relacionadas con los idiomas
//-------------------------------------------------

export class SetCurrentLanguage implements Action {
  readonly type = UserActionTypes.SET_CURRENT_LANGUAGE;
  //Si no recibe ningún parametro se tratará de un alta
  constructor(public payload?: Language) {}
}

export class CreateLanguage implements Action {
  readonly type = UserActionTypes.CREATE_LANGUAGE;
  constructor(public user: User, public newLanguage: Language) {}
}

export class CreateLanguageSuccess implements Action {
  readonly type = UserActionTypes.CREATE_LANGUAGE_SUCCESS;
  //Payload = usuario actualizado con el nuevo idioma
  constructor(public payload: User) {}
}
export class CreateLanguageError implements Action {
  readonly type = UserActionTypes.CREATE_LANGUAGE_ERROR;
  //PayLoad = mensaje de error
  constructor(public message: string) {}
}

export class UpdateLanguage implements Action {
  readonly type = UserActionTypes.UPDATE_LANGUAGE;
  constructor(public user: User, public language: Language) {}
}

export class UpdateLanguageSuccess implements Action {
  readonly type = UserActionTypes.UPDATE_LANGUAGE_SUCCESS;
  //Payload = usuario con el idioma actualizado
  constructor(public payload: User) {}
}
export class UpdateLanguageError implements Action {
  readonly type = UserActionTypes.UPDATE_LANGUAGE_ERROR;
  //PayLoad = mensaje de error
  constructor(public message: string) {}
}

export class DeleteLanguage implements Action {
  readonly type = UserActionTypes.DELETE_LANGUAGE;
  constructor(public user: User, public language: Language) {}
}

export class DeleteLanguageSuccess implements Action {
  readonly type = UserActionTypes.DELETE_LANGUAGE_SUCCESS;
  //Payload = usuario con la usuario actualizado
  constructor(public payload: User) {}
}
export class DeleteLanguageError implements Action {
  readonly type = UserActionTypes.DELETE_LANGUAGE_ERROR;
  //PayLoad = mensaje de error
  constructor(public message: string) {}
}

//Exportamos las clases de acciones que hemos construido
export type UsersActions =
  | LoadUsersSuccess
  //Pefil de usuario
  | SetCurrentUser
  | UpdateUser
  | UpdateUserSuccess
  | UpdateUserError
  //Formación académica
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
  | DeleteExperienceError
  //Acciones relacionadas con la getión de idiomas de usuario
  | SetCurrentLanguage
  | CreateLanguage
  | CreateLanguageSuccess
  | CreateLanguageError
  | UpdateLanguage
  | UpdateLanguageSuccess
  | UpdateLanguageError
  | DeleteLanguage
  | DeleteLanguageSuccess
  | DeleteLanguageError;
