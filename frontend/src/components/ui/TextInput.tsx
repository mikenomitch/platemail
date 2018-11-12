import * as React from "react";
import "./TextInput.scss";

function TextInput(props) {
  const { label } = props;

  return (
    <div className="text-input__wrapper">
      {label && <label className="text-input__label">{label}</label>}
      <input
        className="text-input__input"
        placeholder={props.placeholder || props.label}
        {...props}
      />
    </div>
  );
}

export default TextInput;
