import cx from "classnames";
import * as React from "react";
import { ReactChild } from "react";

import "./Toast.scss";

export interface IProps {
  type?: string;
  children: ReactChild;
}

const Toast: React.SFC<IProps> = ({ children, type }) => {
  const toastClasses = cx("toast", {
    error: type === "error",
    info: type === "info",
    success: type === "success"
  });

  return <div className={toastClasses}>{children}</div>;
};

Toast.defaultProps = {
  type: "success"
};

export default Toast;
