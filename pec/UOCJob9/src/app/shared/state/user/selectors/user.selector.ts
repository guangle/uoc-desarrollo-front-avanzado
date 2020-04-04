import { createFeatureSelector, createSelector } from "@ngrx/store";

import { UserState } from "../../store.user";

//Por ahora los selectores no se muy bien donde se utilizan..

export const selectUserState = createFeatureSelector<UserState>("users");
export const selectAll = createSelector(selectUserState, state => {
  console.log("slect all");
  return state.users;
});

/*
export const selectPokemonState = createFeatureSelector<PokemonState>(
  "pokemon"
);

export const selectAll = createSelector(selectPokemonState, state =>
  Object.values(state.entities)
);
*/
