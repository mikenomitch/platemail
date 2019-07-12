import { Component } from "react";
import * as React from "react";

import Button from "../ui/Button";
import Input from "../ui/TextInput";
import withAuthActions from "../util/withAuthActions";

interface IPasswordResetProps {
  match: { params: { reset_token: string } };
  passwordReset: (params: any) => void;
}

interface IPasswordResetState {
  password: string;
}

class PasswordReset extends Component<
  IPasswordResetProps,
  IPasswordResetState
> {
  public handleSubmit = evt => {
    evt.preventDefault();

    this.props.passwordReset({
      password: this.state.password,
      reset_token: this.props.match.params.reset_token
    });
  };

  public handleChangeFor = (attr: string) => event => {
    const val: string = event.target.value;
    this.setState(current => ({ ...current, [attr]: val }));
  };

  public render() {
    return (
      <div>
        <h1> Password Reset </h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <Input
              onChange={this.handleChangeFor("password")}
              label="Your new password:"
              type="password"
              placeholder="new password"
            />
            <br /> <br />
            <Button onClick={this.handleSubmit}> Reset Password </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withAuthActions(PasswordReset);
