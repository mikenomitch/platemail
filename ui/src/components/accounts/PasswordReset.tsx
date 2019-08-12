import * as React from "react";
import { useState } from "react";

import Button from "../ui/Button";
import Input from "../ui/TextInput";
import withAuthActions, { IWithAuthActions } from "../util/withAuthActions";

interface IProps extends IWithAuthActions {
  match: { params: { reset_token: string } };
}

function PasswordReset({ passwordReset, match }: IProps) {
  const [password, setPassword] = useState("");

  const handleChangeFor = (attr: string) => event => {
    const val: string = event.target.value;
    setPassword(val);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    passwordReset({
      password,
      reset_token: match.params.reset_token
    });
  };

  return (
    <div>
      <h1> Password Reset </h1>
      <div>
        <form onSubmit={handleSubmit}>
          <Input
            onChange={handleChangeFor("password")}
            label="Your new password:"
            type="password"
            placeholder="new password"
          />
          <br /> <br />
          <Button onClick={handleSubmit}> Reset Password </Button>
        </form>
      </div>
    </div>
  );
}

export default withAuthActions(PasswordReset);
