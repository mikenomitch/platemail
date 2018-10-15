import { Component } from "react";
import * as React from "react";

import Button from "../ui/Button";

interface ILogOutState {
  loaded: boolean;
}

class LogOut extends Component<null, ILogOutState> {
  public render() {
    return (
      <div>
        <h1> Do you want to logout? </h1>
        <div>
          <form>
            <Button> Leave this place </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default LogOut;
