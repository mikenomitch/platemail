import { connect } from "react-redux";
import { Dispatch } from "redux";
import { showToast } from "../../sagas/ui";
import Hello from "./Hello";

import {
  decrementEnthusiasm,
  incrementEnthusiasm
} from "../../data/enthusiasm";

export function mapStateToProps({ enthusiasm: { enthusiasmLevel, name } }) {
  return {
    enthusiasmLevel,
    name
  };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onDecrement: () => dispatch(decrementEnthusiasm()),
    onIncrement: () => dispatch(incrementEnthusiasm()),
    showToast: params => dispatch(showToast(params))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hello);
