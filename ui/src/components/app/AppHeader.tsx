import * as React from "react";
import { useEffect, useState } from "react";
import { classInAncestry } from "../../lib/domHelpers";

import Header, {
  headerClass,
  HeaderEndLinks,
  HeaderLink,
  HeaderLogo,
  HeaderMainLinks,
  HeaderMobileMenu,
  HeaderMobileMenuBreak,
  HeaderMobileMenuToggle
} from "../ui/Header";

import { DesktopOnly, HiddenDesktop } from "../ui/ResponsiveHelpers";

interface IAppHeaderProps {
  token: string;
}

function renderLoggedOutLinks(onClick) {
  return [
    <HeaderLink onClick={onClick} key="0" to="/login">
      {" "}
      Login{" "}
    </HeaderLink>,
    <HeaderLink onClick={onClick} key="1" to="/signup">
      {" "}
      Sign Up{" "}
    </HeaderLink>
  ];
}

function renderLoggedInLinks(onClick) {
  return (
    <HeaderLink onClick={onClick} to="/logout">
      {" "}
      Logout{" "}
    </HeaderLink>
  );
}

export default function AppHeader({ token }: IAppHeaderProps) {
  const isLoggedIn = !!token;

  const [showMenu, setState] = useState(false);
  const toggleMenu = () => {
    setState(!showMenu);
  };

  const hideMenu = () => setState(false);

  const handleClick = e => {
    if (!classInAncestry(e.target, headerClass)) {
      hideMenu();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick, false);

    const cleanup = () => {
      document.removeEventListener("mousedown", handleClick, false);
    };

    return cleanup;
  });

  return (
    <div>
      {/* === DESKTOP === */}
      <DesktopOnly>
        <Header>
          <HeaderLogo>
            <HeaderLink to="/">Platemail</HeaderLink>
          </HeaderLogo>

          <HeaderMainLinks>
            <HeaderLink to="/">Landing</HeaderLink>
            <HeaderLink to="/hello"> Hello </HeaderLink>
            <HeaderLink to="/widgets"> Widgets </HeaderLink>
          </HeaderMainLinks>
          <HeaderEndLinks>
            {isLoggedIn
              ? renderLoggedInLinks(hideMenu)
              : renderLoggedOutLinks(hideMenu)}
          </HeaderEndLinks>
        </Header>
      </DesktopOnly>

      {/* === MOBILE === */}

      <HiddenDesktop>
        <Header>
          <HeaderLogo>
            <HeaderLink to="/">P</HeaderLink>
          </HeaderLogo>
          <div />
          <HeaderMobileMenuToggle toggleMenu={toggleMenu}>
            ...
          </HeaderMobileMenuToggle>
        </Header>
      </HiddenDesktop>

      {showMenu && (
        <HeaderMobileMenu>
          <HeaderLink onClick={hideMenu} to="/">
            Landing
          </HeaderLink>
          <HeaderLink onClick={hideMenu} to="/hello">
            {" "}
            Hello{" "}
          </HeaderLink>
          <HeaderLink onClick={hideMenu} to="/widgets">
            {" "}
            Widgets{" "}
          </HeaderLink>
          <HeaderMobileMenuBreak />
          {isLoggedIn
            ? renderLoggedInLinks(hideMenu)
            : renderLoggedOutLinks(hideMenu)}
        </HeaderMobileMenu>
      )}
    </div>
  );
}
