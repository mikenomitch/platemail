import { Component } from "react";
import * as React from "react";

import Button from "../ui/Button";
import Input from "../ui/Input";

interface ILoginState {
  email: string;
  password: string;
}

class Login extends Component<null, ILoginState> {
  public handleSubmit(evt) {
    evt.preventDefault();

    console.log("make this post with the state here...");
  }

  public handleChangeFor = (attr: string) => event => {
    const val: string = event.target.value;
    this.setState(current => ({ ...current, [attr]: val }));
  };

  public render() {
    const { email, password } = this.state;

    return (
      <div>
        <h1> Login </h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <Input
              onChange={this.handleChangeFor("email")}
              value={email}
              placeholder="email"
            />
            <br /> <br />
            <Input
              onChange={this.handleChangeFor("password")}
              value={password}
              type="password"
              placeholder="password"
            />
            <br /> <br />
            <Button> Login </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
