import * as React from "react";
import { Bar } from "react-chartjs-2";
import { useSelector, useDispatch, connect } from "react-redux";
import { addGraphData } from "../../actions/addGraphDataAction.js";

function mapStateToProps(state) {
  console.log("Inside mapStateToProps");
  return { chartData: state.playerData };
}
function getRandomRBG() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + "," + g + "," + b + ")";
}
const Graph = () => {
  const [chartData, setChartData] = React.useState({});
  const playerData = useSelector(state => state.playerData);
  const graphableData = useSelector(state => state.graphData);
  const addData = useDispatch(addGraphData);

  React.useEffect(() => {
    Object.keys(playerData).map(function(item, i) {
      if (graphableData.labels.indexOf(item) > -1) {
        console.log(item + "already in chart data.");
        return false;
      } else {
        addData(addGraphData(item, playerData[item][0].pts, getRandomRBG()));
        return setChartData(graphableData);
      }
    });
  }, [playerData, graphableData, addData]);
  return (
    <div>
      <h2> 2019 Average Points</h2>
      <Bar
        className="stat-graph"
        data={graphableData}
        redraw={true}
        maintainAspectRatio={true}
      ></Bar>
    </div>
  );
};
export default connect(mapStateToProps, { addGraphData })(Graph);
