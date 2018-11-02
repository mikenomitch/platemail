import { connect } from "react-redux";
import { Dispatch } from "redux";
import App from "./App";

import { loadInitialData } from "../../data/authentication";

export function mapStateToProps({ authentication: { token } }) {
  return { token };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return { loadInitialData: () => dispatch(loadInitialData(dispatch)) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
