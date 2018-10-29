import { put, takeEvery } from "redux-saga/effects";
import { IAuthAction, IAuthParams } from "../data/authentication";
import { IAction } from "../lib/types";

import { apiPost } from "./api";

// ===================
//   ACTION CREATORS
// ===================

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

// ========
//   AUTH
// ========

function* postAuth(action: IAuthAction) {
  const authPath = "/auth/identity/callback";
  console.log("POSTING IT");

  const data = yield apiPost(
    authPath,
    action.payload.params,
    {
      useNonApi: true
    },
    "POST_CREDENTIALS"
  );

  const saveCredsAction = {
    localStorageData: {
      auth: {
        token: data.token,
        user: data.user
      }
    },
    payload: data,
    type: "SAVE_CREDENTIALS"
  };

  yield put(saveCredsAction);
}

const authSagas = [
  takeEvery("POST_LOGIN", postAuth),
  takeEvery("POST_SIGNUP", postAuth)
];

export default authSagas;
