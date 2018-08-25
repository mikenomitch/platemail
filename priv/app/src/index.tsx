import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.scss";

import Hello from "./components/hello/HelloContainer";
import createStore from "./lib/createStore";
import registerServiceWorker from "./registerServiceWorker";

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Hello />
  </Provider>,
  document.getElementById("root") as HTMLElement
);

registerServiceWorker();
