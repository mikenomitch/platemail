import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { logOut } from "../../data/authentication";
import LogOut from "./LogOut";

export function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({ logOut }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(LogOut);
