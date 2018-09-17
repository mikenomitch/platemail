import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import Widgets from "./Widgets";

import { deleteWidget, getWidget, getWidgets } from "../../reducers/widgets";

export function mapStateToProps({ widgets: { items } }) {
  return { items };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({ deleteWidget, getWidget, getWidgets }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Widgets);
