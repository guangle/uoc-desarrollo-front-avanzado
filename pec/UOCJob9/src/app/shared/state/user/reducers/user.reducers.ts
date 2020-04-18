import { UserState } from "../store.user";
import { UserActionTypes, UsersActions } from "../actions/user.actions";

export function userInitialState(): UserState {
  return {
    currentUser: null,
    currentStudy: null,
    currentExperience: null,
    currentLanguage: null,
    editMode: false,
    message: "",
  };
}

export function userReducer(
  state: UserState = userInitialState(),
  action: UsersActions
): UserState {
  switch (action.type) {
    //Esta accion establece en el store de usuarios el usuario actualmente logado
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        message: "Usuario actualizado correctamente",
      };
    //Formación académica
    case UserActionTypes.SET_CURRENT_STUDY:
      return {
        ...state,
        currentStudy: action.payload ? action.payload : null,
        editMode: action.payload ? true : false,
      };
    case UserActionTypes.CREATE_STUDY_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        currentStudy: null,
        editMode: false,
        message: "Formación creada",
      };
    case UserActionTypes.UPDATE_STUDY_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        currentStudy: null,
        editMode: false,
        message: "Formación actualizada",
      };
    case UserActionTypes.DELETE_STUDY_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        message: "Formación eliminada",
      };
    //Experiencia laboral
    case UserActionTypes.SET_CURRENT_EXPERIENCE:
      return {
        ...state,
        currentExperience: action.payload
          ? action.payload
          : {
              uid: 0,
              empresa: null,
              date_inicio: null,
              date_fin: null,
              puesto: null,
              tareas: null,
            },
        editMode: action.payload ? true : false,
      };
    case UserActionTypes.CREATE_EXPERIENCE_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        currentExperience: null,
        editMode: false,
        message: "Experiencia creada",
      };
    case UserActionTypes.UPDATE_EXPERIENCE_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        currentExperience: null,
        editMode: false,
        message: "Experiencia actualizada",
      };
    case UserActionTypes.DELETE_EXPERIENCE_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        message: "Experiencia eliminada",
      };
    //Idiomas
    case UserActionTypes.SET_CURRENT_LANGUAGE:
      return {
        ...state,
        currentLanguage: action.payload ? action.payload : null,
        editMode: action.payload ? true : false,
      };
    case UserActionTypes.CREATE_LANGUAGE_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        currentLanguage: null,
        editMode: false,
        message: "Idioma creado",
      };
    case UserActionTypes.UPDATE_LANGUAGE_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        currentLanguage: null,
        editMode: false,
        message: "Idioma actualizado",
      };
    case UserActionTypes.DELETE_LANGUAGE_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        message: "Idioma eliminado",
      };
    //Tratamiento de errores
    case UserActionTypes.UPDATE_USER_ERROR:
    case UserActionTypes.CREATE_STUDY_ERROR:
    case UserActionTypes.UPDATE_STUDY_ERROR:
    case UserActionTypes.CREATE_EXPERIENCE_ERROR:
    case UserActionTypes.UPDATE_EXPERIENCE_ERROR:
    case UserActionTypes.CREATE_LANGUAGE_ERROR:
    case UserActionTypes.UPDATE_LANGUAGE_ERROR:
      return {
        ...state,
        message: "Se ha producido un error " + action.message,
      };

    default:
      return state;
  }
}
