//Accesos a la parte del Store relativa a la autenticación

import { createFeatureSelector, createSelector } from "@ngrx/store";

import { AuthState } from "../auth.demo";

export const selectAuthState = createFeatureSelector<AuthState>("auth");
