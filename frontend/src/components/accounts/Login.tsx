import { Component } from "react";
import * as React from "react";

import Button from "../ui/Button";
import Input from "../ui/TextInput";

interface ILoginProps {
  history: any;
  login: (params: any) => void;
}
interface ILoginState {
  email: string;
  password: string;
}

class Login extends Component<ILoginProps, ILoginState> {
  public handleSubmit = evt => {
    evt.preventDefault();

    this.props.login({
      email: this.state.email,
      password: this.state.password
    });
  };

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
