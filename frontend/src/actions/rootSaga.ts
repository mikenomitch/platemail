import { all } from "redux-saga/effects";

import { authSagas } from "./authentication";
import { channelSagas } from "./channels";
import { makeCrudSagas } from "./crud";
import { uiSagas } from "./ui";

export function* rootSaga(dispatch, getState) {
  yield all([
    ...makeCrudSagas("WIDGET", "/widgets"),
    ...authSagas,
    ...channelSagas(dispatch, getState),
    ...uiSagas
  ]);
}
