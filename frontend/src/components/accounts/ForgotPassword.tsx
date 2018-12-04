import { Component } from "react";
import * as React from "react";

import Button from "../ui/Button";
import Link from "../ui/Link";
import Input from "../ui/TextInput";
import withAuthActions from "../util/withAuthActions";

interface IProps {
  sendPasswordReset: (email: string) => void;
  sendMagicLink: (email: string) => void;
}
interface IState {
  email: string;
}

// function suppressEvent

class ForgotPassword extends Component<IProps, IState> {
  public sendReset = () => {
    this.props.sendPasswordReset(this.state.email);
  };

  public sendMagicLink = () => {
    this.props.sendMagicLink(this.state.email);
  };

  public enterEmail = event => {
    const val: string = event.target.value;
    this.setState(current => ({ ...current, email: val }));
  };

  public render() {
    const { email } = this.state;

    return (
      <div>
        <h1> Forgot your password? </h1>
        <div>
          <form>
            <Input
              label="Enter Email:"
              onChange={this.enterEmail}
              value={email}
              placeholder="Your email"
            />
            <br /> <br />
            <Button onClick={this.sendReset}> Reset Password </Button>
            <br /> <br />
            Or:
            <br /> <br />
            <Button onClick={this.sendMagicLink}> Send a Login Link </Button>
          </form>
          <br /> <br />
          <br /> <br />
          <Link to="/login"> Know your password? </Link>
        </div>
      </div>
    );
  }
}

export default withAuthActions(ForgotPassword);
