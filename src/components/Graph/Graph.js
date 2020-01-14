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
  const graphData = useSelector(state => state.graphData);
  const addData = useDispatch(addGraphData);

  React.useEffect(() => {
    console.log(graphData);
    setPlayerList(Object.keys(playerData));
    console.log(playerList);
    Object.keys(playerData).map(
      function(item, i) {
        if (graphData.labels.indexOf(item) > -1) {
          console.log(item + "already in chart data.");
          return false;
        } else {
          addData(
            addGraphData(item, playerData[item][0].pts, "rgb(29, 66, 138)")
          );
        }
      },
      [playerData, graphData]
    );
  });
  return (
    <Bar
      className="stat-graph"
      data={graphData}
      maintainAspectRatio={true}
    ></Bar>
  );
};
export default connect(mapStateToProps, { addGraphData })(Graph);
