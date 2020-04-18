import { AuthState } from "../store.auth";
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
    remember_status: "",
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

    case AuthActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        logged: false,
        last_login: null,
        name: null,
        token: null, // inventado
        type: "",
        message: "Logout realizado correctamente",
      };
    case AuthActionTypes.LOGOUT_ERROR:
      return {
        ...state,
        message: "Error durante el proceso de logout",
      };

    //Recuperación de contraseñas
    case AuthActionTypes.REMEMBER_PASSWORD:
      return {
        ...state,
        remember_status: null,
        message: null,
      };

    case AuthActionTypes.REMEMBER_PASSWORD_SEND_SUCCESS:
      return {
        ...state,
        remember_status: "sent",
        message: "Se ha enviado un email para restablecer contraeña",
      };
    case AuthActionTypes.REMEMBER_PASSWORD_ALREADY_SENT:
      return {
        ...state,
        remember_status: "already_sent",
        message:
          "El usuario ya tiene pendiente un mail de restablecimiento de contraseña",
      };
    case AuthActionTypes.REMEMBER_PASSWORD_ERROR:
      return {
        ...state,
        message: "Error al enviar el email de recuperacion",
      };
    case AuthActionTypes.REMEMBER_PASSWORD_CLEAR:
      return {
        ...state,
        remember_status: null,
        message: null,
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
