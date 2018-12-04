import { connect } from "react-redux";
import { showToast } from "../../actions/ui";
import Hello from "./Hello";

import {
  decrementEnthusiasm,
  incrementEnthusiasm
} from "../../actions/enthusiasm";

export function mapStateToProps({ enthusiasm: { enthusiasmLevel, name } }) {
  return {
    enthusiasmLevel,
    name
  };
}

export default connect(
  mapStateToProps,
  {
    onDecrement: decrementEnthusiasm,
    onIncrement: incrementEnthusiasm,
    showToast
  }
)(Hello);
