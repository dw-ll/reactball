import * as React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

class DataSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData : this.props.data
    };
  }
  render() {
    return <Bar data={this.state.chartData} maintainAspectRatio={true}></Bar>;
  }
}
export default DataSearch;
