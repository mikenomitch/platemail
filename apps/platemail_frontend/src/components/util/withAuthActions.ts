import { connect } from "react-redux";
import { Dispatch } from "redux";

import { login, signUp } from "../../sagas/authentication";

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    login: params => dispatch(login(params)),
    signUp: params => dispatch(signUp(params))
  };
}

export default WrapperComponent =>
  connect(
    null,
    mapDispatchToProps
  )(WrapperComponent);
