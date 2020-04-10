import { createFeatureSelector, createSelector } from "@ngrx/store";

import { OfferState } from "../store.offer";

/** Creamos diferentes selectores que nos permitan observar partes concretas del store de ofertas */

export const selectOffersState = createFeatureSelector<OfferState>("offers");

export const offersSelector = createSelector(selectOffersState, (state) => {
  return state.offers;
});

export const currentOfferSelector = createSelector(
  selectOffersState,
  (state) => {
    return state.currentOffer;
  }
);
