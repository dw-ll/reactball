import * as React from "react";
import "./NavBar.css";
import SearchBar from "../SearchBar/SearchBar.js";
import {  Navbar } from "react-bootstrap";



const NavBar = () => {
  return (
    <Navbar bg="light" expand="md">
      <Navbar.Brand href="#home">Reactball</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <SearchBar />
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavBar;
