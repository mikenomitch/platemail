import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { enthusiasm } from "../reducers/enthusiasm";
import { widgets } from "../reducers/widgets";

import { widgetsSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  enthusiasm,
  widgets
});

const storeMaker = () => {
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(widgetsSaga);

  return store;
};

export default storeMaker;
