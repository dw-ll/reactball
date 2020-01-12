import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import NavBar from "./components/NavBar/NavBar.js";
import SearchBar from "./components/SearchBar/SearchBar.js";
import Graph from "./components/Graph/Graph.js";
import DataTable from "./components/Table/Table.js";
import { increment } from "./actions/";
import "./App.css";
// const playerList = useSelector(state => list);

const App = () => {
  const [data, setData] = React.useState([]);
  const dispatch = useDispatch(increment);
  const counter = useSelector(state => state.counter);
  return (
    <div className="App">
      <NavBar />
      <div className="App-content">
        <div className="table-container">
          <DataTable data={data} />
        </div>
        <div className="graph-container">
          <Graph data={data} />
        </div>
      </div>
      <div className="current-players">
        <Button
          onClick={() => {
            dispatch(increment());
          }}
        >
          Increment
        </Button>
        <h1>Counter: {counter}</h1>
      </div>
    </div>
  );
};

export default App;
