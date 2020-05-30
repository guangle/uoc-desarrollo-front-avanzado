import { User } from "../../../models/user.model";
import { Company } from "../../../models/company.model";
import { AuthState } from "../store.auth";
import * as AuthSelectors from "./auth.selector";
import { State } from "@ngrx/store";

function crearEstado() {
  return {
    logged: true,
    last_login: new Date(),
    name: "jjgr",
    token: "dfaha5dfa4f6dga",
    type: "user",
    message: "mensaje test",
    remember_status: "sent",
  };
}

describe("AuthSelectors", () => {
  it("selectAuthState", () => {
    const state = crearEstado();

    expect(AuthSelectors.selectAuthState.projector(state)).toEqual(state);
  });

  it("authMessageSelector", () => {
    const state = crearEstado();
    expect(AuthSelectors.authMessageSelector.projector(state)).not.toBeNull();
    expect(AuthSelectors.authMessageSelector.projector(state)).toEqual(
      "mensaje test"
    );
  });

  it("rememberStatusSelector", () => {
    const state = crearEstado();
    expect(
      AuthSelectors.rememberStatusSelector.projector(state)
    ).not.toBeNull();
    expect(AuthSelectors.rememberStatusSelector.projector(state)).toEqual(
      "sent"
    );
  });
});
