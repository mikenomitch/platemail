import { put, takeEvery } from "redux-saga/effects";
import store from "store/dist/store.modern";

import { apiDelete, apiGet, apiPost, apiPut } from "./api";

function optsWithToken(opts = {}) {
  const storedAuth = store.get("auth") || "{}";
  const val = JSON.parse(storedAuth);

  return Object.assign({ token: val.token }, opts);
}

// ========
//   CRUD
// ========

function __handleApiError(error) {
  return null;
}

function __makeItemsGetter(name: string, basePath: string) {
  const callKey = `${name}S_GETTER`;

  return function*() {
    try {
      const { data } = yield apiGet(basePath, {}, optsWithToken(), callKey);
      yield put({ type: `UPSERT_${name}S`, payload: data });
    } catch (err) {
      __handleApiError(err);
    }
  };
}

function __makeItemGetter(name: string, basePath: string) {
  return function*(action) {
    const id = action.payload;
    try {
      const { data } = yield apiGet(`${basePath}/${id}`, {}, optsWithToken());
      yield put({ type: `UPSERT_${name}`, payload: data });
    } catch (err) {
      __handleApiError(err);
    }
  };
}

function __makeItemCreator(name: string, basePath: string) {
  return function*(action) {
    const params = action.payload.params;
    const downcasedName = name.toLowerCase();

    try {
      const { data } = yield apiPost(
        basePath,
        { [downcasedName]: params },
        optsWithToken()
      );

      yield put({ type: `UPSERT_${name}`, payload: data });
    } catch (err) {
      __handleApiError(err);
    }
  };
}

function __makeItemUpdator(name: string, basePath: string) {
  return function*(action) {
    const id = action.payload.id;
    const params = action.payload.params;
    const downcasedName = name.toLowerCase();

    try {
      const { data } = yield apiPut(
        `${basePath}/${id}`,
        {
          [downcasedName]: params
        },
        optsWithToken()
      );
      yield put({ type: `UPSERT_${name}`, payload: data });
    } catch (err) {
      __handleApiError(err);
    }
  };
}

function __makeItemDeletor(name: string, basePath: string) {
  return function*(action) {
    const id = action.payload;
    try {
      yield apiDelete(`${basePath}/${id}`, optsWithToken());
      yield put({ type: `REMOVE_${name}`, payload: id });
    } catch (err) {
      __handleApiError(err);
    }
  };
}

export function makeCrudSagas(name: string, basePath: string) {
  return [
    takeEvery(`GET_${name}S`, __makeItemsGetter(name, basePath)),
    takeEvery(`GET_${name}`, __makeItemGetter(name, basePath)),
    takeEvery(`CREATE_${name}`, __makeItemCreator(name, basePath)),
    takeEvery(`UPDATE_${name}`, __makeItemUpdator(name, basePath)),
    takeEvery(`DELETE_${name}`, __makeItemDeletor(name, basePath))
  ];
}
