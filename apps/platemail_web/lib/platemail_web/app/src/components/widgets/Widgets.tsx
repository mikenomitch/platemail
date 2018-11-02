import * as React from "react";
import { Component } from "react";

import { IWidget } from "../../data/widgets";
import "./Widgets.scss";

interface IWidgetsProps {
  createWidget: (id: object) => void;
  deleteWidget: (id: number) => void;
  getWidget: (id: number) => void;
  getWidgets: () => void;
  updateWidget: (id: number, params: object) => void;
  items: IWidget[];
}

interface IWidgetsState {
  loaded: boolean;
}

class Widgets extends Component<IWidgetsProps, IWidgetsState> {
  public componentDidMount() {
    this.props.getWidgets();
  }

  public render() {
    return (
      <div className="widgets-wrapper">
        <h1> Widgets </h1>
        <div>
          <ul>
            {this.props.items.map(i => (
              <li>Widget {i.title}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Widgets;
