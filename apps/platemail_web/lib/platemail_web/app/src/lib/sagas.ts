import { all, put, takeEvery } from "redux-saga/effects";

import api from "./api";

function __apiError(err) {
  console.log("err", err);
  // TODO: Implement API Error handling
}

function __makeItemsGetter(name: string, basePath: string) {
  return function*() {
    try {
      const { data } = yield api.get(basePath);
      yield put({ type: `UPSERT_${name}S`, payload: data });
    } catch (err) {
      __apiError(err);
    }
  };
}

function __makeItemGetter(name: string, basePath: string) {
  return function*(action) {
    const id = action.payload;
    try {
      const { data } = yield api.get(`${basePath}/${id}`);
      yield put({ type: `UPSERT_${name}`, payload: data });
    } catch (err) {
      __apiError(err);
    }
  };
}

function __makeItemCreator(name: string, basePath: string) {
  return function*(action) {
    const params = action.payload.params;
    const downcasedName = name.toLowerCase();

    try {
      const { data } = yield api.post(basePath, { [downcasedName]: params });
      yield put({ type: `UPSERT_${name}`, payload: data });
    } catch (err) {
      __apiError(err);
    }
  };
}

function __makeItemUpdator(name: string, basePath: string) {
  return function*(action) {
    const id = action.payload.id;
    const params = action.payload.params;
    const downcasedName = name.toLowerCase();

    try {
      const { data } = yield api.put(`${basePath}/${id}`, {
        [downcasedName]: params
      });
      yield put({ type: `UPSERT_${name}`, payload: data });
    } catch (err) {
      __apiError(err);
    }
  };
}

function __makeItemDeleter(name: string, basePath: string) {
  return function*(action) {
    const id = action.payload;
    try {
      yield api.delete(`${basePath}/${id}`);
      yield put({ type: `REMOVE_${name}`, payload: id });
    } catch (err) {
      __apiError(err);
    }
  };
}

function __makeCrudSagas(name: string, basePath: string) {
  return [
    takeEvery(`GET_${name}S`, __makeItemsGetter(name, basePath)),
    takeEvery(`GET_${name}`, __makeItemGetter(name, basePath)),
    takeEvery(`CREATE_${name}`, __makeItemCreator(name, basePath)),
    takeEvery(`UPDATE_${name}`, __makeItemUpdator(name, basePath)),
    takeEvery(`DELETE_${name}`, __makeItemDeleter(name, basePath))
  ];
}

export function* rootSaga() {
  yield all([...__makeCrudSagas("WIDGET", "/widgets")]);
}
