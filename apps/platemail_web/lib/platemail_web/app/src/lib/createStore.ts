import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { enthusiasm } from "../reducers/enthusiasm";
import { widgets } from "../reducers/widgets";

import { rootSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  enthusiasm,
  widgets
});

const storeMaker = () => {
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

  return store;
};

export default storeMaker;
