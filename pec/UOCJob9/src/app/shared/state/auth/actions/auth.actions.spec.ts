import * as AuthActions from "./auth.actions";

import { User } from "../../../models/user.model";
import { Company } from "../../../models/company.model";

describe("LoginUser", () => {
  it("Crear un accion LoginUser", () => {
    const email = "a";
    const password = "b";
    const action = new AuthActions.LoginUser(email, password);
    //Comprobamos que la acción que se ha creado tiene el tipo correcto
    expect(action.type).toEqual(AuthActions.AuthActionTypes.LOGIN_USER);
    //Comprobamos la estructura de la accion creada, con payloads
    //Visto en
    //https://ultimatecourses.com/blog/ngrx-store-testing-actions
    expect({ ...action }).toEqual({
      type: AuthActions.AuthActionTypes.LOGIN_USER,
      email,
      password,
    });
  });
});

describe("LoginUserError", () => {
  it("Crear una accion LoginUserError", () => {
    const message = "a" as string;
    const action = new AuthActions.LoginUserError(message);

    expect(action.type).toEqual(AuthActions.AuthActionTypes.LOGIN_USER_ERROR);

    expect({ ...action }).toEqual({
      type: AuthActions.AuthActionTypes.LOGIN_USER_ERROR,
    });
  });
});

describe("LoginUserSuccess", () => {
  it("Crear una accion LoginUserSuccess", () => {
    const payload = {} as User;
    const action = new AuthActions.LoginUserSuccess(payload);

    expect(action.type).toEqual(AuthActions.AuthActionTypes.LOGIN_USER_SUCCESS);

    expect({ ...action }).toEqual({
      type: AuthActions.AuthActionTypes.LOGIN_USER_SUCCESS,
      payload,
    });
  });
});

//Comprobamos las acciones relacionadas con el login de compañia
//Login company (equivalente a LoginUser)
describe("LoginCompany", () => {
  it("Crear un accion LoginCompany", () => {
    const email = "a";
    const password = "b";
    const action = new AuthActions.LoginCompany(email, password);
    //Comprobamos que la acción que se ha creado tiene el tipo correcto
    expect(action.type).toEqual(AuthActions.AuthActionTypes.LOGIN_COMPANY);
    expect({ ...action }).toEqual({
      type: AuthActions.AuthActionTypes.LOGIN_COMPANY,
      email,
      password,
    });
  });
});

describe("LoginCompanyError", () => {
  it("Crear una accion LoginCompanyError", () => {
    const message = "a" as string;
    const action = new AuthActions.LoginCompanyError(message);

    expect(action.type).toEqual(
      AuthActions.AuthActionTypes.LOGIN_COMPANY_ERROR
    );

    expect({ ...action }).toEqual({
      type: AuthActions.AuthActionTypes.LOGIN_COMPANY_ERROR,
    });
  });
});

describe("LoginCompanySuccess", () => {
  it("Crear una accion LoginCompanySuccess", () => {
    const payload = {} as Company;
    const action = new AuthActions.LoginCompanySuccess(payload);

    expect(action.type).toEqual(
      AuthActions.AuthActionTypes.LOGIN_COMPANY_SUCCESS
    );

    expect({ ...action }).toEqual({
      type: AuthActions.AuthActionTypes.LOGIN_COMPANY_SUCCESS,
      payload,
    });
  });
});

//Logout
describe("Logout", () => {
  it("Crear un accion Logout", () => {
    const action = new AuthActions.Logout();
    //Comprobamos que la acción que se ha creado tiene el tipo correcto
    expect(action.type).toEqual(AuthActions.AuthActionTypes.LOGOUT);
    expect({ ...action }).toEqual({
      type: AuthActions.AuthActionTypes.LOGOUT,
    });
  });
});

describe("LogoutSuccess", () => {
  it("Crear un accion LogoutSuccess", () => {
    const action = new AuthActions.LogoutSuccess();
    //Comprobamos que la acción que se ha creado tiene el tipo correcto
    expect(action.type).toEqual(AuthActions.AuthActionTypes.LOGOUT_SUCCESS);
    expect({ ...action }).toEqual({
      type: AuthActions.AuthActionTypes.LOGOUT_SUCCESS,
    });
  });
});

describe("LogoutError", () => {
  it("Crear un accion LogoutError", () => {
    const message = "a" as string;
    const action = new AuthActions.LogoutError(message);
    //Comprobamos que la acción que se ha creado tiene el tipo correcto
    expect(action.type).toEqual(AuthActions.AuthActionTypes.LOGOUT_ERROR);
    expect({ ...action }).toEqual({
      type: AuthActions.AuthActionTypes.LOGOUT_ERROR,
      message,
    });
  });
});
