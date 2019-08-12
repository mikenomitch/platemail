import cx from "classnames";
import * as React from "react";
import { ReactFragment } from "react";

import "./Card.scss";

export interface IProps {
  children: ReactFragment;
  clickable?: boolean;
  mainContent?: boolean;
  wide?: boolean;
}

export default ({ clickable, children, wide, mainContent }: IProps) => {
  const cardClasses = cx("card", {
    "main-content": mainContent,
    wide
  });

  let tabIndex;

  if (clickable) {
    tabIndex = 0;
  }

  return (
    <div tabIndex={tabIndex} className={cardClasses}>
      {children}
    </div>
  );
};
