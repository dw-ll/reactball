import * as React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { useSelector, useDispatch, connect } from "react-redux";
import { addGraphData } from "../../actions/addGraphDataAction.js";

function mapStateToProps(state) {
  return { chartData: state.graphData };
}
const Graph = () => {
  const [chartData, setChartData] = React.useState({});
  const playerData = useSelector(state => state.playerData);
  const [playerList, setPlayerList] = React.useState([]);
  const graphableData = useSelector(state => state.graphData);
  const addData = useDispatch(addGraphData);

  React.useEffect(() => {
    Object.keys(playerData).map(function(item, i) {
      if (graphableData.labels.indexOf(item) > -1) {
        console.log(item + "already in chart data.");
        return false;
      } else {
        addData(
          addGraphData(item, playerData[item][0].pts, "rgb(29, 66, 138)")
        );
      }
    });
    setChartData(graphableData);
  }, [playerData, graphableData, addData]);
  return (
    <Bar
      className="stat-graph"
      data={chartData}
      redraw={true}
      maintainAspectRatio={false}
    ></Bar>
  );
};
export default connect(mapStateToProps, { addGraphData })(Graph);
