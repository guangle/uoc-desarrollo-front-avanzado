import { createFeatureSelector, createSelector } from "@ngrx/store";

import { UserState } from "../store.user";

/** Creamos diferentes selectores que nos permitan observar partes concretas del store de usuario */

export const selectUserState = createFeatureSelector<UserState>("users");

export const currentUserSelector = createSelector(selectUserState, (state) => {
  return state.currentUser;
});

export const currentStudySelector = createSelector(selectUserState, (state) => {
  return state.currentStudy;
});

export const editModeSelector = createSelector(selectUserState, (state) => {
  return state.editMode;
});

export const currentExperienceSelector = createSelector(
  selectUserState,
  (state) => {
    return state.currentExperience;
  }
);

export const currentLanguageSelector = createSelector(
  selectUserState,
  (state) => {
    return state.currentLanguage;
  }
);
