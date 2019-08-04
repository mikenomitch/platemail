import { Component } from "react";
import * as React from "react";

import "./Widgets.scss";

import { IWidget } from "../../data/widgets";

import withWidgetsContext from "../util/withWidgetsContext";

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
        <ul>
          {this.props.items.map(i => (
            <li key={i.id}>Widget {i.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withWidgetsContext(Widgets);
