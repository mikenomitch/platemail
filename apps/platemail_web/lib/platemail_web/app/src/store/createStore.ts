import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import multi from "redux-multi";
import createSagaMiddleware from "redux-saga";

import { authentication } from "../data/authentication";
import { enthusiasm } from "../data/enthusiasm";
import { widgets } from "../data/widgets";
import withLocalStorage from "./middleware/withLocalStorage";

import { rootSaga } from "../lib/sagas";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  authentication,
  enthusiasm,
  widgets
});

const storeMaker = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(multi, logger, sagaMiddleware, withLocalStorage)
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default storeMaker;
