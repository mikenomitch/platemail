import { connect } from "react-redux";

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

export default (WrappedComponent: any) =>
  connect(
    mapStateToProps,
    { createWidget, deleteWidget, getWidget, getWidgets, updateWidget }
  )(WrappedComponent);
