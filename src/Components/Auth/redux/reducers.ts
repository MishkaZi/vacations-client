import { AuthActionType } from '../UsersModel';

export interface AuthAction {
  type: string;
  payload?: {
    token: string;
    isAdmin: boolean;
  };
}

interface defaultStateI {
  token?: string;
  isAdmin?: boolean;
}

const initialState: defaultStateI = {};

export const authReducer = (
  state = initialState,
  action: AuthAction
): defaultStateI => {
  const newAppState = { ...state };
  switch (action.type) {
    case AuthActionType.LOGIN:
      newAppState.token = action.payload?.token;
      newAppState.isAdmin = action.payload?.isAdmin;
      return newAppState;
    case AuthActionType.LOG_OUT:
      newAppState.isAdmin = action.payload?.isAdmin;
      newAppState.token = action.payload?.token;
      return newAppState;
    default:
      return newAppState;
  }
};
