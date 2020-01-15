# Reactball :basketball:

##### Reactball is a React app that queries the [balldontlie] API and visualizes it's response.


# Features 
---

  - Search for a NBA player to display their average stats from the current season.
  - A table containing multiple selected NBA players to compare their respective average stats from the current season.
  - A graph visualization to compare the respective stats from the current players selected.

### Components, Store, Structure 
--- 
##### Navbar
---
The navbar is a vanilla Navbar component from React Bootstrap. SearchBar is a child of the Navbar component.
##### SearchBar 
---
The SearchBar component is where the flow of data within the application starts. SearchBar is a Form component from React Bootstrap. Upon querying for a player using the SearchBar, an asnychronous axios request via the ```search()``` function, will be made to the balldontlie API based on the current input value of SearchBar as seen below. We then use the data from the response to render a list of search results.

- HTML
```html
 <Form inline className="search-bar">
          <FormControl
            type="text"
            value={value}
            onChange={e => onChangeHandler(e)}
            placeholder="Search for a player"
            className="mr-sm-2"
          />
 </Form>
```
- ```onChangeHandler()```
  To render more accurate search results, I have onChangeHandler() wait until there is 
  an input value of length that is greater then 3.
```js
const onChangeHandler = async e => {
    if (e.target.value === "" || e.target.value.length < 3) {
      setValue(e.target.value);
      setData([]);
    } else {
      search(e.target.value);
      setValue(e.target.value);
    }
  };
  ```
 - ```search()```
    We use the ```responseData``` as the parameter to ```setData()``` in order to display the search results.
 ```js
  const search = async val => {
    const res = await axios(
      `https://www.balldontlie.io/api/v1/players?search=${val}&per_page=25`
    );
    const responseData = await res.data.data;

    if (responseData.length > 0) {
      setData(responseData);
    } else if (responseData.length <= 0) {
      setData([]);
    }
  };
  ```
  - ```ListGroup```
    Using a ListGroup component from React Bootstrap, we use the data from ```search()``` to render a collection of search results.
```html
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
```
- jquery + Redux
  I used jquery to handle the user selecting a search result. If the value (player name) is not already in the SearchBar's local list of selected players, we then dispatch the ```addPlayer``` action to the store.
```js
  $(".result").on("click", function() {
    var $this = $(this);
    var playerID = $this.attr("value");
    if ($this.text() in playerList) {
      console.log($this.text() + "is already in player list.");
    } else {
      addDispatch(addPlayer($this.text(), playerID));
    }
  });
  ```
 - The ```addPlayer``` Action and Reducer
   Every time a search result is selected, jquery will dispatch an ```addPlayer``` action. The action simply returns an object containing the player name and id, along with the ```ADD``` type for the reducer to interpret and send off a new player object to the store, like so:
- ```addPlayer``` action (stored in addAction.js)
```js
export const addPlayer = (name, id) => {
  return {
    type: "ADD",
    name: name,
    id: id
  };
};
```
- ```addPlayer ``` reducer (stored in addData.js )
```js
const dataReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD":
      var newData = {};
      newData[action.name] = action.id;
      return Object.assign({}, state, newData);
    default:
      return state;
  }
};
export default dataReducer;
```


##### Before moving on, now would be a good time to document the Redux store.
- ##### Redux, and index.js 
---
The Redux store for Reactball contains 3 objects: ```players```, ```playerData```, and ```graphData```:
- The ```players``` object is simply a mapping of the player name and player id that SearchBar dispatches to the store. 
- The ```playerData``` object maps a selected player to an object containing their data from the balldontlie API. 
- The ```graphData``` object is structured for chartjs. It contains a ```labels``` and ```datasets``` object.
- Here is what the store can look like at a particular moment:
![Redux Store](https://res.cloudinary.com/dtu8zsq1c/image/upload/v1579040156/Screen_Shot_2020-01-14_at_2.09.13_PM_hvnh1q.png "Philadelphia's Magic Gardens")

- The store is rooted at ```src/index.js```:
```js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import allReducers from "./reducers/";
import "bootstrap/dist/css/bootstrap.min.css";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(allReducers, composeEnhancer(applyMiddleware(thunk)));
store.subscribe(() => console.log(store.getState()));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
```
- ```allReducers``` is imported from ```./reducers```:
```js
import dataReducer from "./addData.js";
import playerDataReducer from "./addPlayerData.js";
import graphDataReducer from "./addGraphData.js";
import { combineReducers } from "redux";
const allReducers = combineReducers({
  players: dataReducer,
  playerData: playerDataReducer,
  graphData: graphDataReducer
});
export default allReducers;
```

- ##### Table 
----
The Table component relies on listening to the store, more particularly the ```players``` object, and leveraging ```useEffect``` to dispatch actions in order to populate ```playerData```, which it references in order to populate the table for the user.
- We first set up ```useSelector()``` and ```useDispatch()``` in order to achieve this, like so:
```js
  const playerAdd = useDispatch(addPlayerData);
  const players = useSelector(state => state.players);
  const playerData = useSelector(state => state.playerData);
  ```
- We then use ```useEffect()``` to dispatch a ```addPlayerData``` action that populates the ```playerData``` object in the store, every time ```players``` is updated (when a new player is selected).
```js
React.useEffect(() => {
    Object.keys(players).map(function(item, i) {
      playerAdd(addPlayerData(item, players[item]));
    });
  }, [players, playerAdd]);
```
- The ```addPlayerData``` action then sends a request to the balldontlie API, and packs the response into a ```dispatch``` object which the action returns to the reducer:
```import axios from "axios";
export const addPlayerData = (name, id) => {
  return dispatch => {
    return axios
      .get(
        `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${id}`
      )
      .then(response => {
        if (response.data.data[0].length === 0) {
          dispatch({ type: "FAIL", name: name });
        } else {
          dispatch({ type: "SUCCESS", name: name, obj: response.data.data });
        }
      })
      .catch(error => {
        dispatch({ type: "FAIL", name: name, error: error });
      });
  };
};
```
- The reducer then takes the ```dispatch``` object and creates a new object that maps the player name to the data inside of the ```dispatch``` object, and return that new object to the store.
```js
const playerDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "SUCCESS":
      var newData = {};
      newData[action.name] = action.obj;
      return Object.assign({}, state, newData);
    case "FAIL":
      return state;
    default:
      return state;
  }
};
export default playerDataReducer;
```
- Finally, the Table component will dynamically render the ```playerData``` object that it is listening to:
```HTML
  <tbody>
          {playerData &&
            Object.keys(playerData).map(function(item, i) {
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
```
- ##### Graph 
---
The Graph component shares a lot of the same behavior with the Table component; but how the Table component is reliant on the ```players``` object in the store, the Graph component is reliant on the ```playersData``` the Table component is responsible for.
- We first set up ```useSelector()``` and ```useDispatch()``` like so, listening to ```playerData``` and ```graphData``` , while having the ability to add to ```graphData```:
```js
 
  const playerData = useSelector(state => state.playerData);
  const graphableData = useSelector(state => state.graphData);
  const addData = useDispatch(addGraphData);
  ```
 - We then turn once again to ```useEffect()``` to know when to add to ```graphData``` in which we use the ```addGraphData``` action to push the player name, the points data that is in ```playerData``` for the newly selected player, and a random rgb color for them:
 ```js
 React.useEffect(() => {
    Object.keys(playerData).map(function(item, i) {
      if (graphableData.labels.indexOf(item) > -1) {
        return false;
      } else {
        addData(addGraphData(item, playerData[item][0].pts, getRandomRBG()));
        return setChartData(graphableData);
      }
    });
  }, [playerData, graphableData, addData]);
  ```
  - The ```addGraphData``` action takes the the name, data, and color and returns it to the ```addGraphData``` reducer:
 ```js
  export const addGraphData = (name, data, color) => {
  return {
    type: "ADD_DATA",
    label_name: name,
    data: data,
    color: color
  };
};
```
- The ```addGraphData``` reducer will make sure we received a valid object, in other words, an object that actually contains a response from the API that isn't undefined, which we stored in ```playerData```. If valid, the reducer will then push this data to ```graphData  ``` object the store and return:
```js
const graphDataReducer = (
  state = {
    labels: [],
    datasets: [{ label: "", data: [], backgroundColor: [] }]
  },
  action
) => {
  switch (action.type) {
    case "ADD_DATA":
      if (
        action.label_name !== undefined &&
        action.data !== undefined &&
        action.color !== undefined
      ) {
        state.labels.push(action.label_name);
        state.datasets[0].data.push(action.data);
        state.datasets[0].backgroundColor.push(action.color);
        return state;
      } else {
        return state;
      }
    default:
      return state;
  }
};
export default graphDataReducer;
```
- The Graph component will then dynamically render the data that is found in the ```graphData``` object in the store:
```HTML
  return (
    <div>
      <h2> 2019 Average Points</h2>
      <Bar
        className="stat-graph"
        data={graphableData}
        redraw={true}
        maintainAspectRatio={true}
      ></Bar>
    </div>
  );
};
```
###### *The "2019 Average Rebounds" graph follows the exact same flow of data as above, only with the rebounds data point.
- ##### App.js
---
- The components defined above are all children of ```App.js```:
```HTML
const App = () => {
  return (
    <div className="App">
      <NavBar />
      <div className="App-content">
        <Container className="data-content">
          <Row className="data-row">
            <Col className="table-col">
              <DataTable />
            </Col>
            <Col>
              <Graph />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default App;
```

### Tech 
---
##### Reactball was built using the following technologies:
* [ReactJS] - My favorite library to get everything started.
* [Redux] - A no-brainer in order to have each component know what stats the user wants to look at.
* [balldontlie] - This was the API I used to retrieve the stats, it's really neat.
 * [axios] - To handle the requests to the balldontlie API.
* [chart.js] - I  used react-chartjs-2 for this project, it's essentially a React wrapper for chartJS.
* [React Bootstrap] - For the frontend.
* [jquery] - It's usually useful.

### Installation 
---
You can find the repo on Github [here].
Once cloned, you can use node to install the dependencies, then start up the server and site itself.


```sh
$ cd reactball
$ npm install -d
$ npm start
```
###### If there are issues, the project is also hosted [via] Github pages.
### Bugs
---
###### There were a few things I ran into, regarding the responses from the API that I did not have the time to work around:
- A response will include players who haven't played in years. These players are irrelevant when regarding averages from the most recent season. If a user selects one of these players from the list, the table or graph simply won't render anything regarding this player.
    - To work around this, I would find a way to reverse the order of players in the response, as it seems the "newer" players showed up last in most response. The API didn't have functionality of this kind.


  [here]: <https://github.com/dw-ll/reactball>
  [ReactJS]: <https://reactjs.org/>
  [Redux]:<https://redux.js.org/>
  [balldontlie]:<https://www.balldontlie.io/#getting-started>
  [axios]:<https://github.com/axios/axios>
  [chart.js]:<https://www.chartjs.org/>
  [React Bootstrap]:<https://react-bootstrap.github.io/>
  [jquery]: http://jquery.com
  [via]:<https://dw-ll.github.io/reactball/>
  
