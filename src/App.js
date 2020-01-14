import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "./components/NavBar/NavBar.js";
import Graph from "./components/Graph/Graph.js";
import DataTable from "./components/Table/Table.js";
import { useSelector } from "react-redux";
import "./App.css";

const App = () => {
  const playerList = useSelector(state => state.players);
  return (
    <div className="App">
      <NavBar />
      <div className="App-content">
        <Container className="data-content">
          <Row className="data-row">
            <Col className="table-col">
              <DataTable />
            </Col>
            <Col>
              <Graph />
            </Col>
          </Row>
        </Container>
      </div>
      <div className="current-players"></div>
    </div>
  );
};

export default App;
