import { Component } from "react";
import * as React from "react";

import Button from "../ui/Button";
import Input from "../ui/Input";

interface ILoginState {
  loaded: boolean;
}

class Login extends Component<null, ILoginState> {
  public render() {
    return (
      <div>
        <h1> Login </h1>
        <div>
          <form>
            <Input placeholder="email" />
            <br /> <br />
            <Input type="password" placeholder="password" />
            <br /> <br />
            <Button> Login </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
