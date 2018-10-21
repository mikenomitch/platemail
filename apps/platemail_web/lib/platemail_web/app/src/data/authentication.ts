import merge from "lodash/merge";
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

export function logOut(): IAction {
  return {
    type: "POST_LOGOUT"
  };
}

export function loadInitialData(dispatch): IAction {
  return {
    localStorageKey: "auth",
    type: "LOAD_CREDENTIALS"
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
    case `LOAD_INITIAL_DATA`:
      console.log("action.payload -- ", action.payload);
      return state;
    case `LOAD_CREDENTIALS`:
      const authState = {
        auth: {
          token: action.payload.token,
          user: action.payload.user
        }
      };

      return merge(state, authState);
  }
  return state;
};
