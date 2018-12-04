import { all } from "redux-saga/effects";

import { authSagas } from "./authentication";
import { makeCrudSagas } from "./crud";
import { uiSagas } from "./ui";

export function* rootSaga() {
  yield all([...makeCrudSagas("WIDGET", "/widgets"), ...authSagas, ...uiSagas]);
}
