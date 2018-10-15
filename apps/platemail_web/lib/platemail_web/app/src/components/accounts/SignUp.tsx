import { Component } from "react";
import * as React from "react";

import Button from "../ui/Button";
import Input from "../ui/Input";

interface ISignUpState {
  loaded: boolean;
}

class SignUp extends Component<null, ISignUpState> {
  public render() {
    return (
      <div>
        <h1> Sign Up </h1>
        <div>
          <form>
            <Input placeholder="email" />
            <br /> <br />
            <Input type="password" placeholder="password" />
            <br /> <br />
            <Button> Sign Up </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
