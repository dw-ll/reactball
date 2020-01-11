import React from "react";
import axios from "axios";
import "./App.css";
import NavBar from "./components/NavBar/NavBar.js";
import SearchBar from "./components/SearchBar/SearchBar.js";
import DataSearch from "./components/DataSearch/DataSearch.js";

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
