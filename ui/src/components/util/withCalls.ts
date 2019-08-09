import { connect } from "react-redux";

function mapStateToProps({ calls }) {
  return { calls };
}

export default (ComponentToExtend: any) => {
  return connect(
    mapStateToProps,
    null
  )(ComponentToExtend);
};
