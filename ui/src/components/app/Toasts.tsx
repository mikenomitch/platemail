import * as React from "react";
import { IToast } from "../../data/ui";

import Toast from "../ui/Toast";

interface IProps {
  toasts: IToast[];
}

export default ({ toasts }: IProps) => {
  return (
    <div>
      {toasts.map((t: IToast, i) => (
        <Toast key={i} hidden={t.hidden} type={t.type}>
          {t.message}
        </Toast>
      ))}
    </div>
  );
};
