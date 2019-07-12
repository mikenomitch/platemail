import { connect } from "react-redux";
import App from "./App";

import { loadFromToken, loadInitialData } from "../../actions/authentication";
import { connectToSocket } from "../../actions/channels";

export function mapStateToProps({ authentication: { token } }) {
  return { token };
}

export default connect(
  mapStateToProps,
  { connectToSocket, loadFromToken, loadInitialData }
)(App);
