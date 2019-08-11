import * as React from "react";
import { Route } from "react-router-dom";

import Card from "../ui/Card";

import CheckEmail from "./CheckEmail";
import ForgotPassword from "./ForgotPassword";
import LoginForm from "./LoginForm";

export default () => (
  <Card className="wide">
    <Route exact={true} path="/login" component={LoginForm} />
    <Route path="/login/forgot_password" component={ForgotPassword} />
    <Route path="/login/check_email" component={CheckEmail} />
  </Card>
);
