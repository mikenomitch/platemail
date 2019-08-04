import * as React from "react";

import danton from "../assets/danton.jpg";
import "./Hello.scss";

import Button from "../ui/Button";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join("!");
}

function toggleTheme() {
  const doc = document.documentElement;

  const theme = doc.getAttribute("data-theme");
  const newTheme = theme === "dark" ? "light" : "dark";

  doc.classList.add("theme-transition");
  doc.setAttribute("data-theme", newTheme);
  window.setTimeout(() => {
    doc.classList.remove("theme-transition");
  }, 1000);
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
        This page demonstrates actions (click the buttons), image embeds,
        components, and themes.
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
      &nbsp;&nbsp;&nbsp;
      <Button onClick={toggleTheme}>Toggle Theme</Button>
    </div>
  );
}

export default Hello;
