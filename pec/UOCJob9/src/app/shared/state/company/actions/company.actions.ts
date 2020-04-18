import { Action } from "@ngrx/store";
import { User } from "../../../models/user.model";
import { Company } from "../../../models/company.model";
import { Study } from "../../../models/study.model";
import { Experience } from "../../../models/experience.model";
import { Language } from "../../../models/language.model";

export enum CompanyActionTypes {
  //Acciones relacionadas con el perfil de usuario
  SET_CURRENT_COMPANY = "[COMPANY] Set current company", //Establece el usuario logado en el store
  UPDATE_COMPANY = "[COMPANY] Update company",
  UPDATE_COMPANY_SUCCESS = "[COMPANY] Update company Success",
  UPDATE_COMPANY_ERROR = "[COMPANY] Update company Error",
}

/** Establece la empresa sobre el que se va a trabajar */
export class SetCurrentCompany implements Action {
  readonly type = CompanyActionTypes.SET_CURRENT_COMPANY;
  constructor(public payload: Company) {}
}

/** Actualización del perfil de empresa */
export class UpdateCompany implements Action {
  readonly type = CompanyActionTypes.UPDATE_COMPANY;
  //Para ejecuta esta acción necesitamos los datos de la ampresa a actualizar
  constructor(public payload: Company) {}
}

/** Exito al actualizar la empresa */
export class UpdateCompanySuccess implements Action {
  readonly type = CompanyActionTypes.UPDATE_COMPANY_SUCCESS;
  //Payload = empresa actualizada
  constructor(public payload: Company) {}
}

export class UpdateCompanyError implements Action {
  readonly type = CompanyActionTypes.UPDATE_COMPANY_ERROR;
  //PayLoad = mensaje de error
  constructor(public message: string) {}
}

//Exportamos las clases de acciones que hemos construido
export type CompanysActions =
  | SetCurrentCompany
  | UpdateCompany
  | UpdateCompanySuccess
  | UpdateCompanyError;
