import { createFeatureSelector, createSelector } from "@ngrx/store";

import { UserState } from "../store.user";

//Por ahora los selectores no se muy bien donde se utilizan..

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
