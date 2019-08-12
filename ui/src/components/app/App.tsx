import { parse } from "query-string";
import * as React from "react";
import { ReactFragment, useEffect } from "react";
import { Route } from "react-router-dom";

import Loadable from "react-loadable";

import "sanitize.css";
import "sanitize.css/forms.css";
import "sanitize.css/typography.css";

import "./App.scss";

import AppHeader from "./AppHeader";

import Card from "../ui/Card";

import Loader from "../loader/Loader";
import Toasts from "./ToastsContainer";

const LoadableHello = Loadable({
  loader: () => import("../hello/HelloContainer"),
  loading: Loader
});

const LoadableWidgets = Loadable({
  loader: () => import("../widgets/Widgets"),
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

interface IProps {
  token: string;
  location: {
    pathname: string;
    search: string;
  };
  connectToSocket: () => void;
  loadFromToken: (token: string) => void;
  loadInitialData: () => void;
}

const cardPaths = ["/login", "/signup", "/signout", "/login/forgot_password"];

const wrapInCardIfRouteMatches = (pathname: string, content: ReactFragment) => {
  if (cardPaths.includes(pathname)) {
    return <Card mainContent={true}>{content}</Card>;
  } else {
    return <div className="content">{content}</div>;
  }
};

export default function App(props: IProps) {
  const {
    connectToSocket,
    loadFromToken,
    loadInitialData,
    location: { pathname, search },
    token
  } = props;

  const onMount = () => {
    connectToSocket();

    if (pathname === "/logged_in") {
      const { token: locationToken } = parse(search);
      const tokenString = locationToken instanceof Array ? token[0] : token;
      loadFromToken(tokenString || "");
    } else {
      loadInitialData();
    }
  };

  useEffect(onMount, []);

  const content = wrapInCardIfRouteMatches(
    pathname,
    <div>
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
  );

  return (
    <div>
      <div>
        <Toasts />
      </div>
      <AppHeader token={token} />
      {content}
    </div>
  );
}
