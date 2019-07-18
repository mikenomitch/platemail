import { parse } from "query-string";
import * as React from "react";
import { Component } from "react";
import Loadable from "react-loadable";
import { Route } from "react-router-dom";

import "sanitize.css";
import "./App.scss";

import AppHeader from "./AppHeader";

import Loader from "../loader/Loader";
import Toasts from "./ToastsContainer";

const LoadableHello = Loadable({
  loader: () => import("../hello/HelloContainer"),
  loading: Loader
});

const LoadableWidgets = Loadable({
  loader: () => import("../widgets/WidgetsContainer"),
  loading: Loader
});

const LoadableLogin = Loadable({
  loader: () => import("../accounts/Login"),
  loading: Loader
});

const LoadableSignUp = Loadable({
  loader: () => import("../accounts/SignUp"),
  loading: Loader
});

const LoadableLogOut = Loadable({
  loader: () => import("../accounts/LogOut"),
  loading: Loader
});

const LoadableLanding = Loadable({
  loader: () => import("../landing/Landing"),
  loading: Loader
});

const LoadablePasswordReset = Loadable({
  loader: () => import("../accounts/PasswordReset"),
  loading: Loader
});

interface IAppProps {
  token: string;
  location: {
    pathname: string;
    search: string;
  };
  connectToSocket: () => void;
  loadFromToken: (token: string) => void;
  loadInitialData: () => void;
}

class App extends Component<IAppProps, { token }> {
  public componentDidMount() {
    const {
      connectToSocket,
      loadFromToken,
      loadInitialData,
      location
    } = this.props;

    connectToSocket();

    if (location.pathname === "/logged_in") {
      const { token } = parse(location.search);
      const tokenString = token instanceof Array ? token[0] : token;
      loadFromToken(tokenString || "");
    } else {
      loadInitialData();
    }
  }

  public render() {
    const { token } = this.props;

    return (
      <div>
        <div>
          <Toasts />
        </div>
        <AppHeader token={token} />

        <div className="content">
          <Route exact={true} path="/" component={LoadableLanding} />
          <Route path="/hello" component={LoadableHello} />
          <Route path="/widgets" component={LoadableWidgets} />
          <Route path="/login" component={LoadableLogin} />
          <Route
            path="/password_reset/:reset_token"
            component={LoadablePasswordReset}
          />
          <Route path="/signup" component={LoadableSignUp} />
          <Route path="/logout" component={LoadableLogOut} />
        </div>
      </div>
    );
  }
}

export default App;
