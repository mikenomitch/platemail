import { put, take } from "redux-saga/effects";

import api from "./api";

export function* widgetsSaga() {
  yield take("GET_WIDGETS");
  const { data } = yield api.get("/widgets");
  yield put({ type: "UPSERT_WIDGETS", payload: data });
}
