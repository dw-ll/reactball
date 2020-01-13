import * as React from "react";
import axios from "axios";
import { Form, FormControl, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addPlayer } from "../../actions/addAction.js";
import { removePlayer } from "../../actions/removeAction.js";
import "./SearchBar.css";
import $ from "jquery";

const SearchBar = () => {
  const [data, setData] = React.useState([]);
  const [value, setValue] = React.useState("");
  const playerList = useSelector(state => state.players);
  const addDispatch = useDispatch(addPlayer);
  const removeDispatch = useDispatch(removePlayer);

  const search = async val => {
    const res = await axios(
      `https://www.balldontlie.io/api/v1/players?search=${val}&per_page=100`
    );
    const responseData = await res.data.data;

    if (responseData.length > 0) {
      setData(responseData);
    } else if (responseData.length <= 0) {
      setData([]);
    }
  };

  const onChangeHandler = async e => {
    if (e.target.value === "" || e.target.value.length < 3) {
      setValue(e.target.value);
      setData([]);
    } else {
      search(e.target.value);
      setValue(e.target.value);
    }
  };

  $(".result").on("click", function() {
    var $this = $(this);
    var playerID = $this.attr("value");
    console.log(playerID);
    if ($this.text() in playerList) {
      console.log($this.text() + "is already in player list.");
    } else {
      addDispatch(addPlayer($this.text(), playerID));
    }
  });

  return (
    <div>
      <div>
        <Form inline className="search-bar">
          <FormControl
            type="text"
            value={value}
            onChange={e => onChangeHandler(e)}
            placeholder="Search for a player"
            className="mr-sm-2"
          />
        </Form>
      </div>
      <div className="results">
        <ListGroup>
          {data.map(function(item, i) {
            return (
              <ListGroup.Item action className="result" key={i} value={item.id}>
                {item.first_name} {item.last_name}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    </div>
  );
};
export default SearchBar;
