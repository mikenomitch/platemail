import * as React from "react";
import { useEffect } from "react";

import "./Widgets.scss";

import withWidgetsContext, {
  IWithWidgetsActions,
  IWithWidgetsProps
} from "../util/withWidgetsContext";

interface IProps extends IWithWidgetsProps, IWithWidgetsActions {}

function Widgets({ items, getWidgets }: IProps) {
  useEffect(getWidgets, []);

  return (
    <div className="widgets-wrapper">
      <h1> Widgets </h1>
      <ul>
        {items.map(i => (
          <li key={i.id}>Widget {i.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default withWidgetsContext(Widgets);
