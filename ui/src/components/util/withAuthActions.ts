import { connect } from "react-redux";

import {
  login,
  logOut,
  passwordReset,
  sendMagicLink,
  sendPasswordReset,
  signUp
} from "../../actions/authentication";

export interface IWithAuthActions {
  login: (params: any) => void;
  logOut: () => void;
  passwordReset: (params: any) => void;
  sendMagicLink: (email: string) => void;
  sendPasswordReset: (email: string) => void;
  signUp: (params: any) => void;
}

export default (WrappedComponent: any) =>
  connect(
    null,
    { login, logOut, passwordReset, sendMagicLink, sendPasswordReset, signUp }
  )(WrappedComponent);
