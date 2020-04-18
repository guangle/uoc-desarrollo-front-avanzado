import { OfferState } from "../store.offer";
import { OfferActionTypes, OfferActions } from "../actions/offer.actions";

export function userInitialState(): OfferState {
  return {
    offers: [],
    userOffers: [],
    currentOffer: null,
    inscrito: false,
    message: "",
  };
}

export function offerReducer(
  state: OfferState = userInitialState(),
  action: OfferActions
): OfferState {
  switch (action.type) {
    case OfferActionTypes.LOAD_OFFERS_SUCCESS:
      return {
        ...state,
        offers: action.payload,
      };
    case OfferActionTypes.SET_CURRENT_OFFER:
      return {
        ...state,
        currentOffer: action.payload,
        inscrito: state.userOffers
          .map((o) => o.id)
          .some((id) => id == action.payload.id),
      };
    case OfferActionTypes.LOAD_USER_OFFERS_SUCCESS:
      return {
        ...state,
        userOffers: action.payload,
      };
    case OfferActionTypes.APPLY_OFFER_SUCCESS:
      return {
        ...state,
        userOffers: action.offers,
        message: "Te has inscrito a la oferta",
      };
    case OfferActionTypes.CANCEL_APPLY_OFFER_SUCCESS:
      return {
        ...state,
        userOffers: action.offers,
        message: "Te has borrado de la oferta",
      };
    default:
      return state;
  }
}
