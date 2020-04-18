import { createFeatureSelector, createSelector } from "@ngrx/store";

import { CompanyState } from "../store.company";

/** Creamos diferentes selectores que nos permitan observar partes concretas del store de usuario */

export const selectCompanyState = createFeatureSelector<CompanyState>(
  "company"
);

export const currentCompanySelector = createSelector(
  selectCompanyState,
  (state) => {
    return state.currentCompany;
  }
);

export const companyMessageSelector = createSelector(
  selectCompanyState,
  (state) => {
    return state.message;
  }
);
