import * as Sentry from "@sentry/browser";
import * as preact from "preact";
import * as React from "react";
import { Provider } from "react-redux";
import { Route, Router } from "react-router-dom";

import "./index.scss";

import App from "./components/app/AppContainer";
import history from "./lib/history";
import createStore from "./store/createStore";
import { DSN } from "./lib/constants";

Sentry.init({ dsn: DSN });

const store = createStore();

const rootElement = document.getElementById("root") as HTMLElement;

if (rootElement.hasChildNodes() && rootElement.firstElementChild) {
  preact.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App} />
      </Router>
    </Provider>,
    rootElement,
    rootElement.firstElementChild
  );
} else {
  preact.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App} />
      </Router>
    </Provider>,
    rootElement
  );
}
