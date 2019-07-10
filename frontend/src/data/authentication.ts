import { IAction } from "../lib/types";

// =========
//   TYPES
// =========

export interface IAuthenticationState {
  userId: number | null;
  token: string | null;
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

    case `GET_AND_SAVE_INFO`:
      return state;

    case `SIGN_OUT`:
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
