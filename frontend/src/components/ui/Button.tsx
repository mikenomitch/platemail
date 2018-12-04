import * as React from "react";
import "./Button.scss";

function Button(props) {
  return <button type={props.type || "button"} className="button" {...props} />;
}

export default Button;
