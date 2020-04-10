import { OfferState } from "../store.offer";
import { OfferActionTypes, OfferActions } from "../actions/offer.actions";

export function userInitialState(): OfferState {
  return {
    offers: [],
    userOffers: [],
    currentOffer: null,
    inscrito: false,
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
      };
    default:
      return state;
  }
}
