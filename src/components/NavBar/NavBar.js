import * as React from "react";
import "./NavBar.css";
import SearchBar from "../SearchBar/SearchBar.js";
import { Navbar, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { invalidAction } from "../../actions/invalidAction.js";

const NavBar = () => {
  const invalid = useSelector(state => state.invalidAction);
  const validate = useDispatch(invalidAction);
  const toggleToast = () => {
    validate(invalidAction(false));
  };
  return (
    <Navbar bg="light" expand="md">
      <Navbar.Brand href="#home">Reactball</Navbar.Brand>
      <SearchBar className=" mr-sm-2" />
      <Toast show={invalid} onClose={toggleToast} className="invalid-toast">
        <Toast.Header>
          {" "}
          <small>
            We either can't find this player or we already have for you!
          </small>
        </Toast.Header>
      </Toast>
    </Navbar>
  );
};
export default NavBar;
