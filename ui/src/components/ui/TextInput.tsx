import * as React from "react";
import "./TextInput.scss";

import InputWrapper from "./InputWrapper";

function TextInput(props) {
  const { error, label } = props;

  return (
    <InputWrapper error={error} label={label}>
      <input
        className="text-input"
        placeholder={props.placeholder || props.label}
        {...props}
      />
    </InputWrapper>
  );
}

export default TextInput;
