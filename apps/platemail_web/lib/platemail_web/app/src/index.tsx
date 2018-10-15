import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.scss";

import App from "./components/app/App";
import createStore from "./lib/createStore";

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
