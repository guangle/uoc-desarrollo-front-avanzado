//Accesos a la parte del Store relativa a la autenticación
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../store.auth";

//Para este caso, nos basta con un selector para todo el store
export const selectAuthState = createFeatureSelector<AuthState>("auth");

export const authMessageSelector = createSelector(selectAuthState, (state) => {
  return state.message;
});

export const rememberStatusSelector = createSelector(
  selectAuthState,
  (state) => {
    return state.remember_status;
  }
);
