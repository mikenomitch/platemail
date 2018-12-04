import { parse } from "query-string";
import * as React from "react";
import { Component } from "react";
import Loadable from "react-loadable";
import { Link, Route } from "react-router-dom";

import "sanitize.css";
import "./App.scss";

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
  loadFromToken: (token: string) => void;
  loadInitialData: () => void;
}

class App extends Component<IAppProps, {}> {
  public componentDidMount() {
    const { loadFromToken, loadInitialData, location } = this.props;

    if (location.pathname === "/logged_in") {
      const { token } = parse(location.search);
      loadFromToken(token);
    } else {
      loadInitialData();
    }
  }

  public renderLoggedOutLinks() {
    return (
      <div>
        <div>
          <Link to="/login">Login</Link>
        </div>
        <div>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    );
  }

  public renderLoggedInLinks() {
    return (
      <div>
        <Link to="/logout">Logout</Link>
      </div>
    );
  }

  public render() {
    const { token } = this.props;
    const isLoggedIn = !!token;

    return (
      <div>
        <div>
          <Toasts />
        </div>
        <div className="header">
          <div>
            <div>
              <Link to="/">Landing</Link>
            </div>
            <div>
              <Link to="/hello">Hello</Link>
            </div>
            <div>
              <Link to="/widgets">Widgets</Link>
            </div>
            {isLoggedIn
              ? this.renderLoggedInLinks()
              : this.renderLoggedOutLinks()}
          </div>
          <hr />
        </div>

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
