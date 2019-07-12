import cx from "classnames";
import * as React from "react";
import { ReactChild } from "react";

import "./InputWrapper.scss";

export interface IProps {
  error?: string;
  label?: string;
  children: ReactChild;
}

function InputWrapper(props: IProps) {
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
