import * as React from "react";
import axios from "axios";
import { useSelector, useDispatch, connect } from "react-redux";
import { addPlayerData } from "../../actions/addPlayerDataAction.js";
import Table from "react-bootstrap/Table";
import $ from "jquery";

const DataTable = () => {
  const playerAdd = useDispatch(addPlayerData);
  const players = useSelector(state => state.players);
  const playerData = useSelector(state => state.playerData);
  React.useEffect(() => {
    Object.keys(players).map(function(item, i) {
      playerAdd(addPlayerData(item, players[item]));
    });
  }, [players, playerAdd]);

  $(document).ready(function() {
    $("#player-search").on("keyup", function() {
      var value = $(this)
        .val()
        .toLowerCase();
      $("#players-table tr").filter(function() {
        $(this).toggle(
          $(this)
            .text()
            .toLowerCase()
            .indexOf(value) > -1
        );
      });
    });
  });

  return (
    <div>
      <h3>2019-2020 Season Averages</h3>
      <input
        class="form-control"
        id="player-search"
        type="text"
        placeholder="Enter player name or statistic eg. Stephen Curry, 23.5 ... "
      />

      <Table bordered striped responsive>
        <thead>
          <tr class="stat-types">
            <th>Player</th>
            <th>Points</th>
            <th>Assists</th>
            <th>Rebounds</th>
            <th>Steals</th>
            <th>Blocks</th>
            <th>Turnovers</th>
          </tr>
        </thead>
        <tbody id="players-table">
          {playerData &&
            Object.keys(playerData).map(function(item, i) {
              return (
                <tr id="player-row" key={i}>
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
export default DataTable;
