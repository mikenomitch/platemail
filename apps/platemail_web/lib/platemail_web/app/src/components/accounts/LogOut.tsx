import { Component } from "react";
import * as React from "react";

import Button from "../ui/Button";

interface ILogOutProps {
  logOut: () => void;
}

interface ILogOutState {
  loaded: boolean;
}

class LogOut extends Component<ILogOutProps, ILogOutState> {
  public render() {
    return (
      <div>
        <h1> Do you want to logout? </h1>
        <div>
          <Button onClick={this.props.logOut}> Leave this place </Button>
        </div>
      </div>
    );
  }
}

export default LogOut;
