import { UserState } from "../store.user";
import { UserActionTypes, UsersActions } from "../actions/user.actions";

export function userInitialState(): UserState {
  return {
    currentUser: null,
    currentStudy: null,
    currentExperience: null,
    editMode: false,
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
      };
    case UserActionTypes.UPDATE_STUDY_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        currentStudy: null,
        editMode: false,
      };
    case UserActionTypes.DELETE_STUDY_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
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
      };
    case UserActionTypes.UPDATE_EXPERIENCE_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        currentExperience: null,
        editMode: false,
      };
    case UserActionTypes.DELETE_EXPERIENCE_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
}
