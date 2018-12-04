import { Component } from "react";
import * as React from "react";
import { withRouter } from "react-router-dom";

import Button from "../ui/Button";
import withAuthActions from "../util/withAuthActions";

interface ILogOutProps {
  history: any;
  logOut: () => void;
}

interface ILogOutState {
  loaded: boolean;
}

class LogOut extends Component<ILogOutProps, ILogOutState> {
  public logOut = () => {
    this.props.logOut();
    this.props.history.push("/hello");
  };
  public render() {
    return (
      <div>
        <h1> Do you want to logout? </h1>
        <div>
          <Button onClick={this.logOut}> Leave this place </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(withAuthActions(LogOut));
