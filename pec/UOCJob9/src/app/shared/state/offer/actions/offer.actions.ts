import { Action } from "@ngrx/store";
import { Offer } from "../../../models/offer.model";
import { User } from "../../../models/user.model";

export enum OfferActionTypes {
  LOAD_OFFERS = "[OFFERS] Load offers",
  LOAD_OFFERS_SUCCESS = "[OFFERS] Load offers success",
  LOAD_OFFERS_ERROR = "[OFFERS] Load offers error",

  SET_CURRENT_OFFER = "[OFFERS] Set current offer",
}

/** Carga todas las ofertas disponibles para el usuario */
export class LoadOffers implements Action {
  readonly type = OfferActionTypes.LOAD_OFFERS;
  //Solo se cargaran aquellas ofertas donde se pida una formación
  //académica compatible con la que tiene el usuario
  constructor(public user: User) {}
}

/** Exito al cargar los usuarios de nuestro backend */
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

//Exportamos las clases de acciones que hemos construido
export type OfferActions =
  | LoadOffers
  | LoadOffersSuccess
  | LoadOffersError
  | SetCurrentOffer;
