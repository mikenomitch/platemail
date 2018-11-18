import * as React from "react";
import "./InputWrapper.scss";

import cx from "classnames";

function InputWrapper(props) {
  const { error, label } = props;

  const childClasses = cx("input-wrapper__child", {
    "input-wrapper__child__error": !!error
  });

  return (
    <div className="input-wrapper">
      {label && <label className="input-wrapper__label">{label}</label>}
      <div className={childClasses}>{props.children}</div>
      {error && <div className="input-wrapper__error">{error}</div>}
    </div>
  );
}

export default InputWrapper;
