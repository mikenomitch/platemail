import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import multi from "redux-multi";
import createSagaMiddleware from "redux-saga";

import { authentication } from "../data/authentication";
import { calls } from "../data/calls";
import { enthusiasm } from "../data/enthusiasm";
import { ui } from "../data/ui";
import { widgets } from "../data/widgets";
import withLocalStorage from "./middleware/withLocalStorage";

import { rootSaga } from "../sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const logger = createLogger({
  collapsed: true,
  diff: true
});

const rootReducer = combineReducers({
  authentication,
  calls,
  enthusiasm,
  ui,
  widgets
});

const storeMaker = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(logger, multi, sagaMiddleware, withLocalStorage)
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default storeMaker;
