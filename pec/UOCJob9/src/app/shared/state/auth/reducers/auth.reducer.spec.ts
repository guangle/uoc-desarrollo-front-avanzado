import * as reducer from "./auth.reducer";
import * as fromActions from "../actions/auth.actions";

import { User } from "../../../models/user.model";
import { Company } from "../../../models/company.model";
import { AuthState } from "../store.auth";

describe("AuthReducer", () => {
  describe("undefined action", () => {
    it("Debe devolver el estado inicial si no se le pasa una acción undefined", () => {
      const estado_inicial = reducer.authInitialState() as AuthState;
      const action = { type: undefined };
      const state = reducer.authReducer(undefined, action);

      expect(state).toEqual(estado_inicial);
    });
  });
  describe("Login Success", () => {
    it("Autalizacion del AuthState tras un LoginUserSuccess", () => {
      const estado_inicial = reducer.authInitialState() as AuthState;
      const user = { username: "jjgr" } as User;
      const action = new fromActions.LoginUserSuccess(user);
      const state = reducer.authReducer(estado_inicial, action);

      expect(state.logged).toEqual(true);
      expect(state.name).toEqual("jjgr");
      expect(state.type).toEqual("user");
      expect(state.last_login).not.toBeNull();
    });
  });
  describe("Login Error", () => {
    it("Autalizacion del AuthState tras un error en el proeceso de login", () => {
      const estado_inicial = reducer.authInitialState() as AuthState;
      const mensaje = "error" as string;
      const action = new fromActions.LoginUserError(mensaje);
      const state = reducer.authReducer(estado_inicial, action);

      expect(state.logged).toEqual(false);
      expect(state.message).toEqual("Error durante el proceso de login");
      expect(state.type).toEqual("");
      expect(state.last_login).toBeNull();
    });
  });
  //igual con company...
});
