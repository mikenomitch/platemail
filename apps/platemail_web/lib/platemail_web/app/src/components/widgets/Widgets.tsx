import * as React from "react";
import { Component } from "react";
import "./Widgets.scss";

interface IWidgetsProps {
  getItems: () => void;
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
            <li>Widget 1</li>
            <li>Widget 2</li>
            <li>Widget 3</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Widgets;
