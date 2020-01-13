import * as React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData : this.props.data
    };
  }
  render() {
    return <Bar className="stat-graph"data={this.state.chartData} maintainAspectRatio={true}></Bar>;
  }
}
export default Graph;
