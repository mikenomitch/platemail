import cx from "classnames";
import * as React from "react";
import { ReactChild } from "react";

import "./Toast.scss";

export interface IProps {
  type?: string;
  hidden?: boolean;
  children: ReactChild;
}

const Toast: React.SFC<IProps> = ({ children, hidden, type }) => {
  const toastClasses = cx("toast", {
    error: type === "error",
    hidden,
    info: type === "info",
    success: type === "success"
  });

  return <div className={toastClasses}>{children}</div>;
};

Toast.defaultProps = {
  hidden: false,
  type: "success"
};

export default Toast;
