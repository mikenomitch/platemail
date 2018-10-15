import { IAction } from "../lib/types";

// =========
//   TYPES
// =========

export interface IAuthenticationState {
  userId: number | null;
  token: string | null;
}

export interface IAuthParams {
  email: string;
  password: string;
}

// ===========
//   ACTIONS
// ===========

export function login(params: IAuthParams): IAction {
  return {
    payload: { params },
    type: "POST_LOGIN"
  };
}

export function signUp(params: IAuthParams): IAction {
  return {
    payload: { params },
    type: "POST_SIGNUP"
  };
}

export function logOut(): IAction {
  return {
    type: "POST_LOGOUT"
  };
}

// ===========
//   REDUCER
// ===========

// Starting state

const defaultState = {
  token: null,
  userId: null
};

export const authentication = (
  state: IAuthenticationState = defaultState,
  action: IAction
): IAuthenticationState => {
  switch (action.type) {
    case `POST_LOGIN`:
      return state;
    case `POST_SIGNUP`:
      return state;
    case `POST_LOGOUT`:
      return state;
  }
  return state;
};
