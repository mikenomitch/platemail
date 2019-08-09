import * as React from "react";
import { useState } from "react";

import Button from "../ui/Button";
import Link from "../ui/Link";
import Input from "../ui/TextInput";
import withAuthActions, { IWithAuthActions } from "../util/withAuthActions";

function ForgotPassword(props: IWithAuthActions) {
  const [email, setEmail] = useState("");

  const sendReset = () => {
    props.sendPasswordReset(email);
  };

  const sendMagicLink = () => {
    props.sendMagicLink(email);
  };

  const enterEmail = event => {
    const val: string = event.target.value;
    setEmail(val);
  };

  return (
    <div>
      <h1> Forgot your password? </h1>
      <div>
        <form>
          <Input
            label="Enter Email:"
            onChange={enterEmail}
            value={email}
            placeholder="Your email"
          />
          <br /> <br />
          <Button onClick={sendReset}> Reset Password </Button>
          <br /> <br />
          Or:
          <br /> <br />
          <Button onClick={sendMagicLink}> Send a Login Link </Button>
        </form>
        <br /> <br />
        <br /> <br />
        <Link to="/login"> Know your password? </Link>
      </div>
    </div>
  );
}

export default withAuthActions(ForgotPassword);
