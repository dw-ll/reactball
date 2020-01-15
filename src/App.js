import React from "react";
import { Container, Row, Col, Toast } from "react-bootstrap";
import NavBar from "./components/NavBar/NavBar.js";
import Graph from "./components/Graph/Graph.js";
import DataTable from "./components/Table/Table.js";
import { useSelector } from "react-redux";
import "./App.css";

const App = () => {
   


  return (
    <div className="App">
      <NavBar />
      <div className="App-content">
        
        <h2>Reactball 🏀</h2>
        <h5>An app to compare and visualize NBA stats.</h5>
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
    </div>
  );
};

export default App;
