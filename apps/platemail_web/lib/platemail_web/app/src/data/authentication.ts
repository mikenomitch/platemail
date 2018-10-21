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

export interface IAuthAction {
  type: string;
  payload: { params: IAuthParams };
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

export function loadInitialData(dispatch): IAction {
  return {
    localStorageKey: "auth",
    type: "SAVE_CREDENTIALS"
  };
}

export function logOut(): IAction {
  return {
    localStorageData: { auth: null },
    type: "LOG_OUT"
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
    case `LOG_OUT`:
      return Object.assign({}, state, { token: null, user: null });
    case `SAVE_CREDENTIALS`:
      const authState = {
        token: action.payload.token,
        user: action.payload.user
      };

      return Object.assign({}, state, authState);
  }
  return state;
};
