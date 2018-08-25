import * as React from "react";
import "./Hello.scss";

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
        Hey {name + getExclamationMarks(enthusiasmLevel)}
      </h2>
      <div>
        <button onClick={onDecrement}>-</button>
        <button onClick={onIncrement}>+</button>
      </div>
    </div>
  );
}

export default Hello;

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join("!");
}
