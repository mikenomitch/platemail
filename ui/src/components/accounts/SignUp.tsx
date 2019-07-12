import { Component } from "react";
import * as React from "react";

import Button from "../ui/Button";
import Input from "../ui/TextInput";
import withAuthActions from "../util/withAuthActions";

interface ISignUpProps {
  signUp: (params: any) => void;
}

interface ISignUpState {
  email: string;
  name: string;
  password: string;
}

class SignUp extends Component<ISignUpProps, ISignUpState> {
  public handleSubmit = evt => {
    evt.preventDefault();

    this.props.signUp({
      email: this.state.email,
      name: this.state.name,
      password: this.state.password
    });
  };

  public handleChangeFor = (attr: string) => event => {
    const val: string = event.target.value;
    this.setState(current => ({ ...current, [attr]: val }));
  };

  public render() {
    return (
      <div>
        <h1> Sign Up </h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <Input onChange={this.handleChangeFor("name")} placeholder="name" />
            <br /> <br />
            <Input
              onChange={this.handleChangeFor("email")}
              placeholder="email"
            />
            <br /> <br />
            <Input
              onChange={this.handleChangeFor("password")}
              type="password"
              placeholder="password"
            />
            <br /> <br />
            <Button onClick={this.handleSubmit}> Sign Up </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withAuthActions(SignUp);
