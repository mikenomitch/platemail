import * as React from "react";
import "./TextArea.scss";

import InputWrapper from "./InputWrapper";

export default props => {
  const { error, label } = props;

  return (
    <InputWrapper error={error} label={label}>
      <textarea
        placeholder={props.placeholder || props.label}
        className="text-area"
        {...props}
      />
    </InputWrapper>
  );
};
