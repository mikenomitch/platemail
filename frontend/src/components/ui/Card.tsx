import cx from "classnames";
import * as React from "react";
import { ReactChild } from "react";

import "./Card.scss";

export interface IProps {
  clickable?: boolean;
  children: ReactChild;
}

function Card({ clickable, children }: IProps) {
  const cardClasses = cx("card", {
    clickable
  });

  return (
    <div tabIndex={0} className={cardClasses}>
      {children}
    </div>
  );
}

export default Card;
