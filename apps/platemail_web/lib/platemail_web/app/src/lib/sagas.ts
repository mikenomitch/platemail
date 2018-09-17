import { all, put, takeEvery } from "redux-saga/effects";

import api from "./api";

function apiError(err) {
  console.log("err", err);
  // TODO: Implement API Error handling
}

function makeItemsGetter(name: string, basePath: string) {
  return function*() {
    try {
      const { data } = yield api.get(basePath);
      yield put({ type: `UPSERT_${name}S`, payload: data });
    } catch (err) {
      apiError(err);
    }
  };
}

function makeItemGetter(name: string, basePath: string) {
  return function*(action) {
    const id = action.payload;
    try {
      const { data } = yield api.get(`${basePath}/${id}`);
      yield put({ type: `UPSERT_${name}`, payload: data });
    } catch (err) {
      apiError(err);
    }
  };
}

function makeItemCreator(name: string, basePath: string) {
  return function*(action) {
    const params = action.payload.params;
    try {
      const { data } = yield api.post(basePath, params);
      yield put({ type: `UPSERT_${name}`, payload: data });
    } catch (err) {
      apiError(err);
    }
  };
}

function makeItemUpdator(name: string, basePath: string) {
  return function*(action) {
    const id = action.payload.id;
    const params = action.payload.params;
    try {
      const { data } = yield api.put(`${basePath}/${id}`, params);
      yield put({ type: `UPSERT_${name}`, payload: data });
    } catch (err) {
      apiError(err);
    }
  };
}

function makeItemDeleter(name: string, basePath: string) {
  return function*(action) {
    const id = action.payload;
    try {
      yield api.delete(`${basePath}/${id}`);
      yield put({ type: `REMOVE_${name}`, payload: id });
    } catch (err) {
      apiError(err);
    }
  };
}

function makeCrudSagas(name: string, basePath: string) {
  return [
    takeEvery(`GET_${name}S`, makeItemsGetter(name, basePath)),
    takeEvery(`GET_${name}`, makeItemGetter(name, basePath)),
    takeEvery(`CREATE_${name}`, makeItemCreator(name, basePath)),
    takeEvery(`UPDATE_${name}`, makeItemUpdator(name, basePath)),
    takeEvery(`DELETE_${name}`, makeItemDeleter(name, basePath))
  ];
}

export function* rootSaga() {
  yield all(makeCrudSagas("WIDGET", "/widgets"));
}
