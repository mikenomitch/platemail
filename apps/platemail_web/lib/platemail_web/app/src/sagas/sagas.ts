import { put, take } from "redux-saga/effects";
import { GET_ITEMS, UPSERT_ITEMS } from "../reducers/widgets";

import api from "../lib/api";

export function* widgetsSaga() {
  yield take(GET_ITEMS);
  const { data } = yield api.get("/widgets");
  yield put({ type: UPSERT_ITEMS, payload: data });
}
