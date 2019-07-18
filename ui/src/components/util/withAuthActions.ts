import { connect } from "react-redux";

import {
  login,
  logOut,
  passwordReset,
  sendMagicLink,
  sendPasswordReset,
  signUp
} from "../../actions/authentication";

export default (WrappedComponent: any) =>
  connect(
    null,
    { login, logOut, passwordReset, sendMagicLink, sendPasswordReset, signUp }
  )(WrappedComponent);
