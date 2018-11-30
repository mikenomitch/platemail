import { delay } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";
import { IToast } from "../data/ui";
import { IAction } from "../lib/types";

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

function removeToast(toast: IToast): IAction {
  return {
    payload: toast.id,
    type: "REMOVE_TOAST"
  };
}

function* addAndRemoveToast(action: IAction) {
  yield put(addToast(action.payload));
  yield call(delay, 1000);
  yield put(removeToast(action.payload));
}

const authSagas = [takeEvery("SHOW_TOAST", addAndRemoveToast)];

export default authSagas;
