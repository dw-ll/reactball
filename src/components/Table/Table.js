import * as React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
const DataTable = () => {
  const [completeData, setCompleteData] = React.useState([]);
  const [currentData, setCurrentData] = React.useState({});
  const players = useSelector(state => state.players);
  var cData = {};
  React.useEffect(players => {
    if (!completeData) {
    }
  });
  const search = async val => {
    try {
      const res = await axios(
        `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${val}`
      );
      const responseData = res.data.data;
      console.log(responseData);
      return responseData;
    } catch (err) {
      console.log(err);
    }
  };

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
          {Object.keys(players).map(function(item, i) {
            var currentPlayerData = search(players[item])
              .then(result => {
                cData = JSON.parse(JSON.stringify(result[0]));

                // setCurrentData(cData);
              })
              .catch(err => {
                console.log(err);
              });
            if (cData !== undefined) {
              console.log("cData is here." + cData);
              console.log(cData);
              return (
                <tr key={i}>
                  <td>{item}</td>
                  <td>{currentData.pts}</td>
                  <td>{currentData.ast}</td>
                  <td>{currentData.reb}</td>
                  <td>{currentData.stl}</td>
                  <td>{currentData.blk}</td>
                  <td>{currentData.turnover}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </Table>
    </div>
  );
};
export default DataTable;
