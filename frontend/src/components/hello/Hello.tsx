import * as React from "react";

import danton from "../assets/danton.jpg";
import "./Hello.scss";

import Button from "../ui/Button";

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
        This page demonstrates actions (click the buttons) and image embeds.
      </p>
      <img src={danton} />
      <br />
      <br />
      <div>
        <Button onClick={onDecrement}>-</Button>
        &nbsp;&nbsp;&nbsp;
        <Button onClick={onIncrement}>+</Button>
      </div>
    </div>
  );
}

export default Hello;

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join("!");
}
