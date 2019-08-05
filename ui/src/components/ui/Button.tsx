import * as React from "react";
import "./Button.scss";

export default props => (
  <button type={props.type || "button"} className="button" {...props} />
);
