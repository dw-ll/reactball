import * as React from "react";
import axios from "axios";
import { H5, MenuItem, Divider, Switch } from "@blueprintjs/core";
import { Select, Suggest } from "@blueprintjs/select";
import "./SearchBar.css";

const SearchBar = () => {
  const [data, setData] = React.useState([]);
  const [value, setValue] = React.useState("");

  const search = async val => {
    const res = await axios(
      `https://www.balldontlie.io/api/v1/players?search=${val}&per_page=100`
    );
    const responseData = await res.data.data;

    if (responseData.length > 0) {
      console.log(responseData);
      setData(responseData);
    } else if (responseData.length <= 0) {
      console.log("Empty data.");
      setData([]);
    }
  };

  const onChangeHandler = async e => {
    if (e.target.value === "" || e.target.value.length < 3) {
      console.log("Blank query.");
      setValue(e.target.value);
      setData([]);
    } else {
      search(e.target.value);
      setValue(e.target.value);
    }
  };

  return (
    <div>
      <input
        className="search-bar"
        value={value}
        onChange={e => onChangeHandler(e)}
        placeholder="Search for a player"
      />

      <div className="results">
        {data.map(function(item, i) {
          return (
            <li className="search-result" key={item.id}>
              <a href="#">
                {item.first_name} {item.last_name}
              </a>
              <Divider vertical={true} />
              {item.team.full_name}
            </li>
          );
        })}
      </div>
    </div>
  );
};
export default SearchBar;
