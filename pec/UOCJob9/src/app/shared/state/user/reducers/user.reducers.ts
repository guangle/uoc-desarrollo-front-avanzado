import { UserState } from "../../store.user";
import { UserActionTypes, UsersActions } from "../actions/user.actions";

export function userInitialState(): UserState {
  return {
    id: 22,
    propiedad1: new Date(),
    users: []
  };
}

export function userReducer(
  state: UserState = userInitialState(),
  action: UsersActions
): UserState {
  switch (action.type) {
    case UserActionTypes.LOAD_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;
  }
}
