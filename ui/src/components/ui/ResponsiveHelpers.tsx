import * as React from "react";
import { ReactChild } from "react";

import "./ResponsiveHelpers.scss";

export interface IProps {
  children?: ReactChild;
}

export function HiddenDesktop({ children }: IProps) {
  return <div className="hidden-desktop">{children}</div>;
}

export function HiddenTablet({ children }: IProps) {
  return <div className="hidden-desktop">{children}</div>;
}

export function DesktopOnly({ children }: IProps) {
  return <div className="desktop-only">{children}</div>;
}

export function TabletOrUpOnly({ children }: IProps) {
  return <div className="tablet-or-up-only">{children}</div>;
}
