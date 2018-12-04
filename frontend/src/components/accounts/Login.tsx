import { Component } from "react";
import * as React from "react";
import { Route } from "react-router-dom";

import CheckEmail from "./CheckEmail";
import ForgotPassword from "./ForgotPassword";
import LoginForm from "./LoginForm";

interface ILoginProps {
  history: any;
  login: (params: any) => void;
}
interface ILoginState {
  email: string;
  password: string;
}

class Login extends Component<ILoginProps, ILoginState> {
  public render() {
    return (
      <div>
        <Route exact={true} path="/login" component={LoginForm} />
        <Route path="/login/forgot_password" component={ForgotPassword} />
        <Route path="/login/check_email" component={CheckEmail} />
      </div>
    );
  }
}

export default Login;
