import { connect } from "react-redux";
import Toasts from "./Toasts";

export function mapStateToProps({ ui: { toasts } }) {
  return { toasts };
}

export default connect(
  mapStateToProps,
  null
)(Toasts);
