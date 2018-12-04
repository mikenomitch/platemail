import { connect } from "react-redux";
import App from "./App";

import { loadFromToken, loadInitialData } from "../../data/authentication";

export function mapStateToProps({ authentication: { token } }) {
  return { token };
}

export default connect(
  mapStateToProps,
  { loadFromToken, loadInitialData }
)(App);
