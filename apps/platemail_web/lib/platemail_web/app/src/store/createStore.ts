import { applyMiddleware, combineReducers, createStore } from "redux";
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
    applyMiddleware(sagaMiddleware, withLocalStorage)
  );
  sagaMiddleware.run(rootSaga);

  return store;
};

export default storeMaker;
