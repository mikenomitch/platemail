import * as React from "react";
import { ReactFragment } from "react";
import { Link } from "react-router-dom";

import { onEnterOrSpace } from "../../lib/domHelpers";

import "./Header.scss";

export const headerClass = "header";

export interface IHeaderLinkProps {
  to: string;
  onClick?: () => void;
  children: ReactFragment;
}

export interface IChildProps {
  children: ReactFragment;
}

export interface IMenuToggleProps {
  children: ReactFragment;
  toggleMenu: () => void;
}

export function HeaderLink({ to, onClick, children }: IHeaderLinkProps) {
  return (
    <div className="header__link">
      <Link onClick={onClick} to={to}>
        <span tabIndex={0}>{children}</span>
      </Link>
    </div>
  );
}

export function HeaderLogo({ children }: IChildProps) {
  return (
    <div className="header__logo">
      <span>{children}</span>
    </div>
  );
}

export function HeaderMainLinks({ children }: IChildProps) {
  return <div className="header__main-links">{children}</div>;
}

export function HeaderEndLinks({ children }: IChildProps) {
  return <div className="header__end-links">{children}</div>;
}

export function HeaderMobileMenuToggle({
  children,
  toggleMenu
}: IMenuToggleProps) {
  const onKeyDown = onEnterOrSpace(toggleMenu);

  return (
    <div onClick={toggleMenu} onKeyDown={onKeyDown} tabIndex={0}>
      {children}
    </div>
  );
}

export function HeaderMobileMenu({ children }: IChildProps) {
  return <div className="header__mobile-menu">{children}</div>;
}

export function HeaderMobileMenuBreak() {
  return <div className="header__mobile-menu__break">-------</div>;
}

function Header({ children }: IChildProps) {
  return (
    <nav className={headerClass}>
      <div className="header__inner">{children}</div>
    </nav>
  );
}

export default Header;
