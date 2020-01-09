import * as React from "react";
import "./NavBar.css";
import { Classes } from "@blueprintjs/core";

import {
  Alignment,
  Button,
  H5,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Switch
} from "@blueprintjs/core";

const NavBar = () => {
  return (
    <Navbar className="nav-bar bp3-dark">
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading className="nav-bar-brand">Ball Don't Lie</NavbarHeading>
      </NavbarGroup>
    </Navbar>
  );
};
export default NavBar;
