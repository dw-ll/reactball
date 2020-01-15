import * as React from "react";
import { Container, Row } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { useSelector, useDispatch, connect } from "react-redux";
import { addGraphData } from "../../actions/addGraphDataAction.js";
import { addGraphReboundsData } from "../../actions/addGraphReboundsAction.js";
import "./Graph.css";

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
  const playerData = useSelector(state => state.playerData);
  const graphableData = useSelector(state => state.graphData);
  const graphableRebounds = useSelector(state => state.graphRebounds);

  const addData = useDispatch(addGraphData);
  const addReboundsData = useDispatch(addGraphReboundsData);

  React.useEffect(() => {
    Object.keys(playerData).map(function(item, i) {
      if (graphableData.labels.indexOf(item) > -1) {
        return false;
      } else {
        var playerColor = getRandomRBG();
        addData(addGraphData(item, playerData[item][0].pts, playerColor));
        addReboundsData(
          addGraphReboundsData(item, playerData[item][0].reb, playerColor)
        );
      }
    });
  }, [playerData, graphableData, addData, addReboundsData]);
  return (
    <div className="graphs">
      <div className="stat-graph">
        <h2 className="graph-title"> 2019 Average Points</h2>
        <Bar
          data={graphableData}
          redraw={true}
          maintainAspectRatio={true}
        ></Bar>
      </div>
      <div className="stat-graph">
        <h2 className="graph-title"> 2019 Average Rebounds</h2>
        <Bar
          data={graphableRebounds}
          redraw={true}
          maintainAspectRatio={true}
        ></Bar>
      </div>
    </div>
  );
};
export default connect(mapStateToProps, { addGraphData })(Graph);
