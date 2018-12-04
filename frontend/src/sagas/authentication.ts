import { put, takeEvery } from "redux-saga/effects";
import {
  IAuthAction,
  IAuthEmailAction,
  IAuthParams
} from "../data/authentication";
import nav from "../lib/nav";
import { IAction } from "../lib/types";

import { apiGet, apiPost } from "./api";
import { showToast } from "./ui";

const LOGGED_IN_PATH = "/hello";

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

export function sendMagicLink(email: string): IAction {
  return {
    payload: { email },
    type: "POST_MAGIC_LINK"
  };
}

export function sendPasswordReset(email: string): IAction {
  return {
    payload: { email },
    type: "POST_PASSWORD_RESET_REQUEST"
  };
}

export function passwordReset(params: any): IAction {
  return {
    payload: params,
    type: "POST_PASSWORD_RESET"
  };
}

// ========
//   AUTH
// ========

function* getAndSaveInfo(action: IAction) {
  const infoPath = "/user/info";

  const data = yield apiGet(
    infoPath,
    {},
    { token: action.payload.token, successMessage: "Logged In" },
    "GET_USER_INFO"
  );

  const authData = {
    token: action.payload.token,
    user: data.user
  };

  const saveCredsAction = {
    localStorageData: {
      auth: authData
    },
    payload: authData,
    type: "SAVE_CREDENTIALS"
  };

  yield put(saveCredsAction);
  nav(LOGGED_IN_PATH);
}

function* logout() {
  yield put(showToast({ type: "success", message: "Logged Out" }));
}

function* postMagicLink(action: IAuthEmailAction) {
  const magicLinkRequestUrl = "/auth/login_link_request";

  yield apiPost(
    magicLinkRequestUrl,
    {
      email: action.payload.email
    },
    {
      successMessage: "Login Link Sent"
    },
    "MAGIC_LINK_REQUEST"
  );

  nav("/hello");
}

function* postReset(action) {
  const resetUrl = "/auth/reset_password";

  yield apiPost(
    resetUrl,
    {
      password: action.payload.password,
      reset_token: action.payload.reset_token
    },
    {
      successMessage: "Password Reset"
    },
    "PASSWORD_RESET"
  );

  nav("/login");
}

function* postResetRequest(action: IAuthEmailAction) {
  const resetUrl = "/auth/password_reset_request";

  yield apiPost(
    resetUrl,
    {
      email: action.payload.email
    },
    {
      successMessage: "Reset Link Sent - Check Your Email"
    },
    "PASSWORD_RESET_REQUEST"
  );

  nav("/login/check_email");
}

function* postAuth(action: IAuthAction) {
  const authPath = "/auth/identity/callback";

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
  yield put(showToast({ type: "success", message: "Logged In" }));
  nav(LOGGED_IN_PATH);
}

const authSagas = [
  takeEvery("SIGN_OUT", logout),
  takeEvery("POST_LOGIN", postAuth),
  takeEvery("POST_SIGNUP", postAuth),
  takeEvery("POST_MAGIC_LINK", postMagicLink),
  takeEvery("POST_PASSWORD_RESET", postReset),
  takeEvery("POST_PASSWORD_RESET_REQUEST", postResetRequest),
  takeEvery("GET_AND_SAVE_INFO", getAndSaveInfo)
];

export default authSagas;
