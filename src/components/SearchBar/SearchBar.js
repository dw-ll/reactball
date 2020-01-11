import * as React from "react";
import axios from "axios";
import { H5, MenuItem, Switch } from "@blueprintjs/core";
import { Select, Suggest } from "@blueprintjs/select";
import "./SearchBar.css";

const SearchBar = () => {
  const [data, setData] = React.useState([]);
  const [value, setValue] = React.useState("");

  const search = async val => {
    const res = await axios(
      `https://www.balldontlie.io/api/v1/players?search=${val}`
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
    if (e.target.value === "") {
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
        placeholder="Type something to search"
      />

      {data.map(function(item, i) {
        return (
          <li className="search-result" key={item.id}>
            {item.first_name} {item.last_name}
          </li>
        );
      })}
    </div>
  );
};
export default SearchBar;
