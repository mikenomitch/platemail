import { connect } from "react-redux";

import { IWidget } from "../../data/widgets";

import {
  createWidget,
  deleteWidget,
  getWidget,
  getWidgets,
  updateWidget
} from "../../actions/widgets";

function mapStateToProps({ widgets: { items } }) {
  return { items };
}

export interface IWithWidgetsProps {
  items: ReadonlyArray<IWidget>;
}

export interface IWithWidgetsActions {
  createWidget: () => void;
  deleteWidget: () => void;
  getWidget: () => void;
  getWidgets: () => void;
  updateWidget: () => void;
}

export default (WrappedComponent: any) =>
  connect(
    mapStateToProps,
    { createWidget, deleteWidget, getWidget, getWidgets, updateWidget }
  )(WrappedComponent);
