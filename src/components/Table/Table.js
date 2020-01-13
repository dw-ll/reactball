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

  var cData = [];

  const search = async val => {
    const res = await axios(
      `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${val}`
    )
      .then(result => {
        const responseData = result.data.data;
        console.log(responseData);
        return responseData;
      })
      .catch(err => {
        console.log(err);
      });
  };

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
          {/* {completeData &&
            completeData.map(function(item, i) {
              console.log(item);
              return (
                <tr key={i}>
                  <td>{players[item.player_id]}</td>
                  <td>{item.pts}</td>
                  <td>{item.ast}</td>
                  <td>{item.reb}</td>
                  <td>{item.stl}</td>
                  <td>{item.blk}</td>
                  <td>{item.turnover}</td>
                </tr>
              );
            })} */}
        </tbody>
      </Table>
    </div>
  );
};
export default connect(mapStateToProps, { addPlayerData })(DataTable);
