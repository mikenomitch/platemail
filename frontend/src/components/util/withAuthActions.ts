import { connect } from "react-redux";

import {
  login,
  passwordReset,
  sendMagicLink,
  sendPasswordReset,
  signUp
} from "../../sagas/authentication";

import { logOut } from "../../data/authentication";

export default WrapperComponent =>
  connect(
    null,
    { login, logOut, passwordReset, sendMagicLink, sendPasswordReset, signUp }
  )(WrapperComponent);
