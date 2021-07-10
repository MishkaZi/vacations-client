import { AuthActionType } from '../UsersModel';

export const loginUser = (token: string, isAdmin: boolean) => {
  return {
    type: AuthActionType.LOGIN,
    payload: { token, isAdmin },
  };
};

export const logoutUser = () => {
  return {
    type: AuthActionType.LOGIN,
    payload: undefined,
  };
};
