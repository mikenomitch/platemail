import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, Router } from "react-router-dom";

import "./index.scss";

import App from "./components/app/AppContainer";
import connectToSocket from "./lib/connectToSocket";
import history from "./lib/history";
import createStore from "./store/createStore";

connectToSocket();

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
