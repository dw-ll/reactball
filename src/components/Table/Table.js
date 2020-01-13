import * as React from "react";
import axios from "axios";
import { useSelector, useDispatch, connect } from "react-redux";
import { addPlayerData } from "../../actions/addPlayerDataAction.js";
import Table from "react-bootstrap/Table";
function mapStateToProps(state) {
  return { completeData: state.playerData };
}
const DataTable = () => {
  const [completeData, setCompleteData] = React.useState({});
  const playerAdd = useDispatch(addPlayerData);
  const players = useSelector(state => state.players);
  const playerData = useSelector(state => state.playerData);

  React.useEffect(() => {
    console.log("====Players has been updated: ");
    Object.keys(players).map(function(item, i) {
      console.log(item);
    });

    Object.keys(players).map(function(item, i) {
      playerAdd(addPlayerData(item, players[item]));
    });
  }, [players, playerAdd]);

  return (
    <div>
      <h3>2019-2020 Season Averages</h3>

      <Table responsive>
        <thead>
          <tr>
            <th>Player</th>
            <th>Points</th>
            <th>Assists</th>
            <th>Rebounds</th>
            <th>Steals</th>
            <th>Blocks</th>
            <th>Turnovers</th>
          </tr>
        </thead>
        <tbody>
          {playerData &&
            Object.keys(playerData).map(function(item, i) {
              console.log(playerData[item][0]);
              return (
                <tr key={i}>
                  <td>{item}</td>
                  <td>{playerData[item][0].pts}</td>
                  <td>{playerData[item][0].ast}</td>
                  <td>{playerData[item][0].reb}</td>
                  <td>{playerData[item][0].stl}</td>
                  <td>{playerData[item][0].blk}</td>
                  <td>{playerData[item][0].turnover}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};
export default connect(mapStateToProps, { addPlayerData })(DataTable);
