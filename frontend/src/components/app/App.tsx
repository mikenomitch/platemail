import * as React from "react";
import { Component } from "react";
import Loadable from "react-loadable";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import ToastsContainer from "./ToastsContainer";

import "sanitize.css";
import "./App.scss";

import Loader from "../loader/Loader";

const LoadableHello = Loadable({
  loader: () => import("../hello/HelloContainer"),
  loading: Loader
});

const LoadableWidgets = Loadable({
  loader: () => import("../widgets/WidgetsContainer"),
  loading: Loader
});

const LoadableLogin = Loadable({
  loader: () => import("../accounts/LoginContainer"),
  loading: Loader
});

const LoadableSignUp = Loadable({
  loader: () => import("../accounts/SignUpContainer"),
  loading: Loader
});

const LoadableLogOut = Loadable({
  loader: () => import("../accounts/LogOutContainer"),
  loading: Loader
});

const LoadableLanding = Loadable({
  loader: () => import("../landing/Landing"),
  loading: Loader
});

interface IAppProps {
  token: boolean;
  loadInitialData: () => void;
}

class App extends Component<IAppProps, {}> {
  public componentDidMount() {
    const { loadInitialData } = this.props;
    loadInitialData();
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
      <Router>
        <div>
          <div>
            <ToastsContainer />
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
            <Route path="/signup" component={LoadableSignUp} />
            <Route path="/logout" component={LoadableLogOut} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
