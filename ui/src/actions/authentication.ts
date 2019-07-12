import { put, takeEvery } from "redux-saga/effects";
import nav from "../lib/nav";
import { IAction } from "../lib/types";
import { joinChannels, leaveUserChannels } from "./channels";

import { apiGet, apiPost } from "./api";
import { showToast } from "./ui";

const LOGGED_IN_PATH = "/hello";

// =========
//   TYPES
// =========

export interface IAuthParams {
  email: string;
  password: string;
}

export interface IAuthAction {
  type: string;
  payload: { params: IAuthParams };
}

export interface IAuthEmailAction {
  type: string;
  payload: { email: string };
}

// ===================
//   ACTION CREATORS
// ===================

export function loadFromToken(token): IAction {
  // Clears current data and then requests new info
  // To then be saved
  return {
    localStorageData: { auth: { token } },
    payload: { token },
    type: "GET_AND_SAVE_INFO"
  };
}

export function loadInitialData(): IAction {
  return {
    localStorageKey: "auth",
    type: "HANDLE_CREDENTIALS"
  };
}

export function logOut(): IAction {
  return {
    localStorageData: { auth: null },
    type: "SIGN_OUT"
  };
}

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

  yield put({
    localStorageData: {
      auth: authData
    },
    payload: authData,
    type: "HANDLE_CREDENTIALS"
  });

  nav(LOGGED_IN_PATH);
}

function* logout() {
  yield put(leaveUserChannels());
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
      successMessage: "Logged In",
      useNonApi: true
    },
    "POST_CREDENTIALS"
  );

  if (data) {
    const saveCredsAction = {
      localStorageData: {
        auth: {
          token: data.token,
          user: data.user
        }
      },
      payload: data,
      type: "HANDLE_CREDENTIALS"
    };

    yield put(saveCredsAction);

    nav(LOGGED_IN_PATH);
  }
}

function* handleCredentials(action) {
  const { token, user } = action.payload;

  if (token) {
    const saveCredsAction = {
      localStorageData: {
        auth: { token, user }
      },
      payload: action.payload,
      type: "SAVE_CREDENTIALS"
    };

    yield put(saveCredsAction);
    yield put(joinChannels(user, token));
  }
}

export const authSagas = [
  takeEvery("SIGN_OUT", logout),
  takeEvery("POST_LOGIN", postAuth),
  takeEvery("POST_SIGNUP", postAuth),
  takeEvery("POST_MAGIC_LINK", postMagicLink),
  takeEvery("POST_PASSWORD_RESET", postReset),
  takeEvery("POST_PASSWORD_RESET_REQUEST", postResetRequest),
  takeEvery("GET_AND_SAVE_INFO", getAndSaveInfo),
  takeEvery("HANDLE_CREDENTIALS", handleCredentials)
];
