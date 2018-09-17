import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import Widgets from "./Widgets";

import { getWidgets } from "../../reducers/widgets";

export function mapStateToProps({ widgets: { items } }) {
  return { items };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({ getWidgets }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Widgets);
