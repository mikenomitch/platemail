import * as React from "react";
import { Component } from "react";
import { IToast } from "../../data/ui";

import Toast from "../ui/Toast";

interface IToastsProps {
  toasts: IToast[];
}

class Toasts extends Component<IToastsProps, {}> {
  public render() {
    return (
      <div>
        {this.props.toasts.map((t: IToast, i) => (
          <Toast key={i} hidden={t.hidden} type={t.type}>
            {t.message}
          </Toast>
        ))}
      </div>
    );
  }
}

export default Toasts;
