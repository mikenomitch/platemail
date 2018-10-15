import * as React from "react";
import Loadable from "react-loadable";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

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

const App = () => (
  <Router>
    <div>
      <div className="header">
        <ul>
          <li>
            <Link to="/">Hello</Link>
          </li>
          <li>
            <Link to="/widgets">Widgets</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
        <hr />
      </div>

      <div className="content">
        <Route exact={true} path="/" component={LoadableHello} />
        <Route path="/widgets" component={LoadableWidgets} />
        <Route path="/login" component={LoadableLogin} />
        <Route path="/signup" component={LoadableSignUp} />
        <Route path="/logout" component={LoadableLogOut} />
      </div>
    </div>
  </Router>
);

export default App;
