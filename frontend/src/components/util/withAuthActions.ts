import { connect } from "react-redux";

import {
  login,
  logOut,
  passwordReset,
  sendMagicLink,
  sendPasswordReset,
  signUp
} from "../../actions/authentication";

export default WrapperComponent =>
  connect(
    null,
    { login, logOut, passwordReset, sendMagicLink, sendPasswordReset, signUp }
  )(WrapperComponent);
