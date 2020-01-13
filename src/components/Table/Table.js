import * as React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
const DataTable = () => {
  const playerList = useSelector(state => state.players);
  const search = async val => {
    try {
      const res = await axios(
        `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${val}`
      );
      const responseData = await res.data.data;
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
          {Object.keys(playerList).map(function(item, i) {
            var currentPlayerData = search(playerList[item]);
            console.log("Current Player Data:" + currentPlayerData);
            if (currentPlayerData[0] !== undefined) {
              return (
                <tr key={i}>
                  <td>{item}</td>
                  <td>{currentPlayerData[0].pts}</td>
                  <td>{currentPlayerData[0]["ast"]}</td>
                  <td>{currentPlayerData[0]["reb"]}</td>
                  <td>{currentPlayerData[0]["stl"]}</td>
                  <td>{currentPlayerData[0]["blk"]}</td>
                  <td>{currentPlayerData[0]["turnover"]}</td>
                </tr>
              );
            }else{return (
                    <tr key={i}>
                      <td>{item}</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
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
