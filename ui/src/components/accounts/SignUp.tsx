import * as React from "react";
import { useState } from "react";

import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/TextInput";
import withAuthActions, { IWithAuthActions } from "../util/withAuthActions";

function SignUp(props: IWithAuthActions) {
  const [state, setState] = useState({ email: "", password: "", name: "" });

  const handleSubmit = evt => {
    evt.preventDefault();

    props.signUp({
      email: state.email,
      name: state.name,
      password: state.password
    });
  };

  const handleChangeFor = (attr: string) => event => {
    const val: string = event.target.value;
    setState(current => ({ ...current, [attr]: val }));
  };

  return (
    <Card className="wide">
      <div>
        <h1> Sign Up </h1>
        <div>
          <form onSubmit={handleSubmit}>
            <Input onChange={handleChangeFor("name")} placeholder="name" />
            <br /> <br />
            <Input onChange={handleChangeFor("email")} placeholder="email" />
            <br /> <br />
            <Input
              onChange={handleChangeFor("password")}
              type="password"
              placeholder="password"
            />
            <br /> <br />
            <Button onClick={handleSubmit}> Sign Up </Button>
          </form>
        </div>
      </div>
    </Card>
  );
}

export default withAuthActions(SignUp);
