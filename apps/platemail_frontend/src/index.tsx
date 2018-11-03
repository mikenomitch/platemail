import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.scss";

import App from "./components/app/AppContainer";
import connectToSocket from "./lib/connectToSocket";
import createStore from "./store/createStore";

connectToSocket();

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
