import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import Widgets from "./Widgets";

import {
  createWidget,
  deleteWidget,
  getWidget,
  getWidgets,
  updateWidget
} from "../../reducers/widgets";

export function mapStateToProps({ widgets: { items } }) {
  return { items };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    { createWidget, deleteWidget, getWidget, getWidgets, updateWidget },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Widgets);
