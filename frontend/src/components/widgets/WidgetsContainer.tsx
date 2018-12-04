import { connect } from "react-redux";
import Widgets from "./Widgets";

import {
  createWidget,
  deleteWidget,
  getWidget,
  getWidgets,
  updateWidget
} from "../../actions/widgets";

export function mapStateToProps({ widgets: { items } }) {
  return { items };
}

export default connect(
  mapStateToProps,
  { createWidget, deleteWidget, getWidget, getWidgets, updateWidget }
)(Widgets);
