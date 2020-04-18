import { Action } from "@ngrx/store";
import { Offer } from "../../../models/offer.model";
import { User } from "../../../models/user.model";
import {
  LoadUsersSuccess,
  LoadUsersFailed,
} from "../../user/actions/user.actions";

export enum OfferActionTypes {
  //Ofertas para el usuario
  LOAD_OFFERS = "[OFFERS] Load offers",
  LOAD_OFFERS_SUCCESS = "[OFFERS] Load offers success",
  LOAD_OFFERS_ERROR = "[OFFERS] Load offers error",

  SET_CURRENT_OFFER = "[OFFERS] Set current offer",

  //Ofertas a las que se ha inscrito el usuario
  LOAD_USER_OFFERS = "[OFFERS] Load offers",
  LOAD_USER_OFFERS_SUCCESS = "[OFFERS] Load offers success",
  LOAD_USER_OFFERS_ERROR = "[OFFERS] Load offers error",

  //Inscribirse/borrarse de una oferta
  APPLY_OFFER = "[OFFERS] Apply offer",
  APPLY_OFFER_SUCCESS = "[OFFERS] Apply offer success",
  APPLY_OFFER_ERROR = "[OFFERS] Apply offer error",

  CANCEL_APPLY_OFFER = "[OFFERS] Cancel Apply offer",
  CANCEL_APPLY_OFFER_SUCCESS = "[OFFERS] Cancel Apply offer success",
  CANCEL_APPLY_OFFER_ERROR = "[OFFERS] Cancel Apply offer error",
}

/** Carga todas las ofertas disponibles para el usuario */
export class LoadOffers implements Action {
  readonly type = OfferActionTypes.LOAD_OFFERS;
  //Solo se cargaran aquellas ofertas donde se pida una formación
  //académica compatible con la que tiene el usuario
  constructor(public user: User) {}
}

export class LoadOffersSuccess implements Action {
  readonly type = OfferActionTypes.LOAD_OFFERS_SUCCESS;
  //Si esta accion se ejecuta, tendremos un array de ofertas procedente de nuestro fake-backend
  constructor(public payload: Array<Offer>) {}
}
/** Acción que se invocará si ha ocurrido un error cargando las ofertas  */
export class LoadOffersError implements Action {
  readonly type = OfferActionTypes.LOAD_OFFERS_ERROR;
  //Si esta accion se ejecuta, tendremos un mensaje de error
  constructor(public message: string) {}
}

/** Establece la oferta que se va a visualizar */
export class SetCurrentOffer implements Action {
  readonly type = OfferActionTypes.SET_CURRENT_OFFER;
  constructor(public payload?: Offer) {}
}

/** Carga todas las ofertas a las que se ha inscrito el usuario*/
export class LoadUserOffers implements Action {
  readonly type = OfferActionTypes.LOAD_USER_OFFERS;
  constructor(public user: User) {}
}

/** Exito al cargar las ofertas a las que se ha inscrito el usuario */
export class LoadUserOffersSuccess implements Action {
  readonly type = OfferActionTypes.LOAD_USER_OFFERS_SUCCESS;
  //Si esta accion se ejecuta, tendremos un array de ofertas procedente de nuestro fake-backend
  constructor(public payload: Array<Offer>) {}
}
/** Acción que se invocará si ha ocurrido un error cargando las ofertas del usuario */
export class LoadUserOffersError implements Action {
  readonly type = OfferActionTypes.LOAD_USER_OFFERS_ERROR;
  //Si esta accion se ejecuta, tendremos un mensaje de error
  constructor(public message: string) {}
}

//Inscribirse/desinscribirse de una oferta
export class ApplyOffer implements Action {
  readonly type = OfferActionTypes.APPLY_OFFER;
  constructor(public user: User, public offer: Offer) {}
}
export class ApplyOfferSuccess implements Action {
  readonly type = OfferActionTypes.APPLY_OFFER_SUCCESS;
  //Ofertas a las que se ha inscrito el usuario
  constructor(public offers: Offer[]) {}
}
export class ApplyOfferError implements Action {
  readonly type = OfferActionTypes.APPLY_OFFER_ERROR;
  //Si esta accion se ejecuta, tendremos un mensaje de error
  constructor(public message: string) {}
}

export class CancelApplyOffer implements Action {
  readonly type = OfferActionTypes.CANCEL_APPLY_OFFER;
  constructor(public user: User, public offer: Offer) {}
}
export class CancelApplyOfferSuccess implements Action {
  readonly type = OfferActionTypes.CANCEL_APPLY_OFFER_SUCCESS;
  //Ofertas a las que se ha inscrito el usuario
  constructor(public offers: Offer[]) {}
}
export class CancelApplyOfferError implements Action {
  readonly type = OfferActionTypes.CANCEL_APPLY_OFFER_ERROR;
  //Si esta accion se ejecuta, tendremos un mensaje de error
  constructor(public message: string) {}
}

//Exportamos las clases de acciones que hemos construido
export type OfferActions =
  //Ofertas para el usuario
  | LoadOffers
  | LoadOffersSuccess
  | LoadOffersError
  | SetCurrentOffer
  //Ofertas a las que se ha inscrito el usuario
  | LoadUserOffers
  | LoadUsersSuccess
  | LoadUsersFailed
  //Inscribirse / desinscribirse de una oferta
  | ApplyOffer
  | ApplyOfferSuccess
  | ApplyOfferError
  | CancelApplyOffer
  | CancelApplyOfferSuccess
  | CancelApplyOfferError;
