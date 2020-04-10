import { Offer } from "../../models/offer.model";

export interface OfferState {
  offers: Offer[]; //Listado de ofertas para el usuario
  userOffers: Offer[]; //Ofertas en las que se ha inscrito el usuario
  currentOffer: Offer; //Oferta que con la que se está trabajando
  inscrito: boolean; //Indica si el usurio se ha inscrito en la oferta actual
}
