import * as React from "react";
import { ReactFragment } from "react";
import { Link } from "react-router-dom";

import "./Header.scss";

export interface IHeaderLinkProps {
  to: string;
  children: ReactFragment;
}

export interface IChildProps {
  children: ReactFragment;
}

export function HeaderLink({ to, children }: IHeaderLinkProps) {
  return (
    <div tabIndex={0} className="header__link">
      <Link to={to}>{children}</Link>
    </div>
  );
}

export function HeaderLogo({ children }: IChildProps) {
  return <div className="header__logo">{children}</div>;
}

export function HeaderMainLinks({ children }: IChildProps) {
  return <div className="header__main-links">{children}</div>;
}

export function HeaderEndLinks({ children }: IChildProps) {
  return <div className="header__end-links">{children}</div>;
}

function Header({ children }: IChildProps) {
  return (
    <div className="header">
      <div className="header__inner">{children}</div>
    </div>
  );
}

export default Header;
