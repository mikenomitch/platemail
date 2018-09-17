import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import Widgets from "./Widgets";

import { getItems, IWidgetReducerState } from "../../reducers/widgets";

export function mapStateToProps({ items }: IWidgetReducerState) {
  return { items };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({ getItems }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Widgets);
