import * as React from "react";

import danton from "../assets/danton.jpg";
import "./Hello.scss";

import Button from "../ui/Button";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join("!");
}

export interface IProps {
  name: string;
  enthusiasmLevel?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

function Hello({
  name,
  enthusiasmLevel = 1,
  onIncrement,
  onDecrement
}: IProps) {
  if (enthusiasmLevel <= 0) {
    throw new Error("You could be a little more enthusiastic. :D");
  }

  return (
    <div className="hello">
      <h2 className="greeting hero">
        Hello {name + getExclamationMarks(enthusiasmLevel)}
      </h2>
      <p>
        This page demonstrates actions (click the buttons), image embeds, and
        components.
      </p>
      <img src={danton} />
      <br />
      <br />
      <div>
        <Button onClick={onDecrement}>Remove Exclamation</Button>
        &nbsp;&nbsp;&nbsp;
        <Button onClick={onIncrement}>Add Exclamation</Button>
      </div>
      <br />
      <br />

      <div>
        <TextInput label="Email" onChange={console.log.bind(console)} />
      </div>

      <br />
      <br />

      <div>
        <TextArea
          error="There is an issue"
          label="Description"
          onChange={console.log.bind(console)}
        />
      </div>
    </div>
  );
}

export default Hello;
