import { all } from "redux-saga/effects";

import authSagas from "./authentication";
import makeCrudSagas from "./crud";

export function* rootSaga() {
  yield all([...makeCrudSagas("WIDGET", "/widgets"), ...authSagas]);
}
