import React from "react";
import axios from "axios";
import "./App.css";
import NavBar from "./components/NavBar/NavBar.js";
import SearchBar from "./components/SearchBar/SearchBar.js";
import Graph from "./components/Graph/Graph.js";
import DataTable from "./components/Table/Table.js";

class App extends React.Component {
  state = {
    data: {},
    chartData: []
  };

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="App-content">
          <div className="table-container">
            <DataTable data={this.state.chartData} />
          </div>
          <div className="graph-container">
            <Graph data={this.state.chartData} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
