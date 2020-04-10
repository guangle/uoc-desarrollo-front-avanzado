import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";
import { routerReducer } from "@ngrx/router-store";
import { userReducer } from "../../app/shared/state/user/reducers/user.reducers";

import { demoReducer } from "../../app/shared/state/demo/reducers/demo.reducer";
import { authReducer } from "../../app/shared/state/auth/reducers/auth.reducer";
import { offerReducer } from "../../app/shared/state/offer/reducers/offer.reducers";

import { environment } from "../../environments/environment";

export interface State {}

/*
export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  user: userReducer
};
*/
export const reducers = {
  auth: authReducer,
  router: routerReducer,
  users: userReducer,
  offers: offerReducer,
  demo: demoReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
