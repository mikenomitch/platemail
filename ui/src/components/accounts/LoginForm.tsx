import * as React from "react";
import { useState } from "react";

import Button from "../ui/Button";
import Link from "../ui/Link";
import Input from "../ui/TextInput";
import withAuthActions from "../util/withAuthActions";

interface IProps {
  history: any;
  login: (params: any) => void;
}

function LoginForm(props: IProps) {
  const [{ email, password }, setState] = useState({ email: "", password: "" });

  const handleSubmit = evt => {
    evt.preventDefault();
    props.login({ email, password });
  };

  const handleChangeFor = (attr: string) => event => {
    const val: string = event.target.value;
    setState(current => ({ ...current, [attr]: val }));
  };

  return (
    <div>
      <h1> Login </h1>
      <div>
        <form onSubmit={handleSubmit}>
          <Input
            onChange={handleChangeFor("email")}
            value={email}
            placeholder="email"
          />
          <br /> <br />
          <Input
            onChange={handleChangeFor("password")}
            value={password}
            type="password"
            placeholder="password"
          />
          <br /> <br />
          <Button onClick={handleSubmit}> Login </Button>
        </form>

        <br />
        <br />
        <Link to="/login/forgot_password"> Forgot your password? </Link>
      </div>
    </div>
  );
}

export default withAuthActions(LoginForm);
