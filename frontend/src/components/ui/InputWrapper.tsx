import * as React from "react";
import "./TextInput.scss";

function TextInput(props) {
  const { label } = props;

  return (
    <div className="text-input__wrapper">
      {label && <label className="text-input__label">{label}</label>}
      {this.props.children}
    </div>
  );
}

export default TextInput;
