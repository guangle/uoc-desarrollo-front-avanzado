//TODO: COMENTAR JJGR

import { AuthState } from "../auth.demo";
import { AuthActionTypes, AuthActions } from "../actions/auth.actions";

//En todos los reducers se debe especificar un estado inicial
export function authInitialState(): AuthState {
  return {
    logged: false,
    last_login: null,
    name: "",
    token: "",
    type: "",
    message: "",
  };
}

//Reucer = (estado, accion) => nuevo estado.
//Se ejectua cada vez que se ejecute una accion

export function authReducer(
  state: AuthState = authInitialState(),
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_USER_SUCCESS:
      //El payload es el UserLogado
      return {
        ...state,
        logged: true,
        last_login: new Date(),
        name: action.payload.username,
        token: randomStr(20), // inventado
        type: "user",
        message: "Login de usuario relizado correctamente",
      };

    case AuthActionTypes.LOGIN_COMPANY_SUCCESS:
      //El payload es la empresa logada
      return {
        ...state,
        logged: true,
        last_login: new Date(),
        name: action.payload.username,
        token: randomStr(20), // inventado
        type: "company",
        message: "Login de empresa relizado correctamente",
      };

    case AuthActionTypes.LOGIN_USER_ERROR:
      return {
        ...state,
        logged: false,
        message: "Error durante el proceso de login",
      };

    case AuthActionTypes.LOGIN_COMPANY_ERROR:
      return {
        ...state,
        logged: false,
        message: "Error durante el proceso de login",
      };

    //Si no es ninguno de las acciones que yo contemplo, devuelvo el estado
    //tal y como estaba
    default:
      return state;
  }
}

function randomStr(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
