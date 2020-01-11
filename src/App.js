import React from "react";
import axios from "axios";
import "./App.css";
import NavBar from "./components/NavBar/NavBar.js";
import SearchBar from "./components/SearchBar/SearchBar.js";
import DataSearch from "./components/DataSearch/DataSearch.js";

const chartData = {
  labels: [
    "Golden State",
    "Los Angeles Lakers",
    "Los Angeles Clippers",
    "Milwaukee Bucks",
    "Chicago Bulls"
  ],
  datasets: [
    {
      label: "Points",
      data: [10, 2, 3, 4, 5],
      backgroundColor: [
        "rgb(29, 66, 138)",
        "rgb(85,37,130)",
        "rgb(200,16,46)",
        "rgb(0,71,27)",
        "rgb(91,43,130)"
      ]
    }
  ]
};

class App extends React.Component {
  state = {
    data: {},
    chartData: chartData
  };

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="App-content">
          <div className="search-container">
            <SearchBar className="app-search-bar" />
          </div>
          <div className="table-container">
            <DataSearch data={this.state.chartData} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
