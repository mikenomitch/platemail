import { connect } from "react-redux";
import { Dispatch } from "redux";

import { login } from "../../sagas/authentication";
import Login from "./Login";

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    login: params => dispatch(login(params))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Login);
