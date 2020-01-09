import React from "react";
import axios from "axios";
import "./App.css";
import NavBar from "./components/NavBar/NavBar.js";
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
    loading: false,
    inputValue: ""
  };
  search = async val => {
    this.setState({ loading: true });
    const res = await axios(
      `https://www.balldontlie.io/api/v1/players?search=${val}`
    );
    const statsRes = await axios("https://www.balldontlie.io/api/v1/stats");
    const mainData = await res.data.results;
    const playerStats = await statsRes.data.results;

    this.setState({ mainData, loading: false });
    this.setState({ data: playerStats });
    console.log(res);
  };

  onChangeHandler = async e => {
    this.search(e.target.value);
    this.setState({ inputValue: e.target.value });
    console.log(this.state.data);
    console.log(Date.now());
  };

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="App-content">
          <input
            value={this.state.value}
            onChange={e => this.onChangeHandler(e)}
            placeholder="Type something to search"
          />
          <div className="table-container">
            <DataSearch data={this.state.data} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
