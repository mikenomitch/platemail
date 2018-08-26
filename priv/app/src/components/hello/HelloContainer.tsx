import { connect } from "react-redux";
import { Dispatch } from "redux";
import Hello from "./Hello";

import {
  decrementEnthusiasm,
  IExampleStoreState,
  incrementEnthusiasm
} from "../../reducers/enthusiasm";

export function mapStateToProps({ enthusiasmLevel, name }: IExampleStoreState) {
  return {
    enthusiasmLevel,
    name
  };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onDecrement: () => dispatch(decrementEnthusiasm()),
    onIncrement: () => dispatch(incrementEnthusiasm())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hello);