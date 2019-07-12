import { delay } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";
import { IToast } from "../data/ui";
import { IAction } from "../lib/types";

const TOAST_DELAY = 1000;

const randomNumber = (): number => {
  return Math.floor(Math.random() * 999999);
};

export function showToast(params): IAction {
  return {
    payload: Object.assign(params, { id: randomNumber() }),
    type: "SHOW_TOAST"
  };
}

function addToast(toast: IToast): IAction {
  return {
    payload: toast,
    type: "ADD_TOAST"
  };
}

function hideToast(toast: IToast): IAction {
  return {
    payload: toast.id,
    type: "HIDE_TOAST"
  };
}

function removeToast(toast: IToast): IAction {
  return {
    payload: toast.id,
    type: "REMOVE_TOAST"
  };
}

function* addAndRemoveToast(action: IAction) {
  yield put(addToast(action.payload));
  yield call(delay, TOAST_DELAY);
  yield put(hideToast(action.payload));
  yield call(delay, TOAST_DELAY);
  yield put(removeToast(action.payload));
}

export const uiSagas = [takeEvery("SHOW_TOAST", addAndRemoveToast)];
