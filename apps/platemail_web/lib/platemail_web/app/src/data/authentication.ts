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
    case `SAVE_CREDENTIALS`:
      // TODO: Start here and save
      // the credentials in the store

      // Add session middleware to get this on load
      // and to save this under certain conditions (a 3rd arg in the action maybe?)
      console.log("payload:", action.payload);
      return state;
  }
  return state;
};
