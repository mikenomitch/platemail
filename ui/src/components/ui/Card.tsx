import cx from "classnames";
import * as React from "react";
import { ReactFragment } from "react";

import "./Card.scss";

export interface IProps {
  clickable?: boolean;
  children: ReactFragment;
}

function Card({ clickable, children }: IProps) {
  const cardClasses = cx("card", {
    clickable
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
}

export default Card;
