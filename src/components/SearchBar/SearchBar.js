import * as React from "react";
import axios from "axios";
import { Suggest } from "@blueprintjs/select";

const SearchBar = () => {
  const [data, setData] = React.useState([]);
  const [suggestData, setSuggestData] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [renderedResults, setRenderedResults] = React.useState();

  const search = async val => {
    setLoading(true);
    const res = await axios(
      `https://www.balldontlie.io/api/v1/players?search=${val}`
    );
    const mainData = await res.data.data;
    console.log("Main query data:" + mainData);
    console.log(mainData[0].first_name);

    if (mainData !== undefined) {
      setData(mainData);
    }
    console.log(res);
  };

  const renderResults = async d => {
    console.log(d);
    d.map(function(item, i) {
      console.log(item.first_name);
      return (
        <li key={item.id}>
          {item.first_name} {item.last_name}
        </li>
      );
    });
  };

  const onChangeHandler = async e => {
    search(e.target.value);
    setValue(e.target.value);
    if (value !== undefined) {
      setData([]);
    }
  };

  return (
    <div>
      <input
        value={value}
        onChange={e => onChangeHandler(e)}
        placeholder="Type something to search"
      />
      {data.map(function(item, i) {
        console.log(item.first_name);
        return (
          <li key={item.id}>
            {item.first_name} {item.last_name}
          </li>
        );
      })}
    </div>
  );
};
export default SearchBar;
