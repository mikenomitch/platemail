import * as React from "react";
import { Component } from "react";

import { IWidget } from "../../reducers/widgets";
import "./Widgets.scss";

interface IWidgetsProps {
  getItems: () => void;
  items: IWidget[];
}

interface IWidgetsState {
  loaded: boolean;
}

class Widgets extends Component<IWidgetsProps, IWidgetsState> {
  public componentDidMount() {
    this.props.getItems();
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
