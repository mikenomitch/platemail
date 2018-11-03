import { connect } from "react-redux";

export function mapStateToProps({ calls }) {
  return { calls };
}

export default ComponentToExtend => {
  return connect(
    mapStateToProps,
    null
  )(ComponentToExtend);
};
