import React from "react";
import { connect } from "react-redux";
import { generateMovie, changeSortFunc } from "../store";

//Control Panel component to house view controls:
//Generate Movie Button -> creates a movie, adds to db and renders in grid
//Sorting Selector -> allows for different sorting methods of movies

const ControlPanel = ({ generateMovie, changeSortFunc }) => {
  const sortingOptions = [
    {
      sortMethod: "ID Ascend",
      sortFunc: (a, b) => {
        return a.id - b.id;
      },
    },
    {
      sortMethod: "ID Descend",
      sortFunc: (a, b) => {
        return b.id - a.id;
      },
    },
    {
      sortMethod: "Name Ascend",
      sortFunc: (a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (b.name > a.name) {
          return -1;
        }
        return 0;
      },
    },
    {
      sortMethod: "Name Descend",
      sortFunc: (a, b) => {
        if (a.name > b.name) {
          return -1;
        }
        if (b.name > a.name) {
          return 1;
        }
        return 0;
      },
    },
    {
      sortMethod: "Rating Lowest",
      sortFunc: (a, b) => {
        return a.rating - b.rating;
      },
    },
    {
      sortMethod: "Rating Highest",
      sortFunc: (a, b) => {
        return b.rating - a.rating;
      },
    },
  ];

  return (
    <div id="controlPanel">
      <button onClick={generateMovie}>Generate Movie</button>
      <select
        defaultValue={0}
        onChange={(ev) => {
          changeSortFunc(sortingOptions[ev.target.value].sortFunc);
        }}
      >
        {sortingOptions.map((sortingOption, index) => (
          <option key={index} value={index}>
            {sortingOption.sortMethod}
          </option>
        ))}
      </select>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    generateMovie: async () => {
      dispatch(generateMovie());
    },
    changeSortFunc: async (sortFunc) => {
      dispatch(changeSortFunc(sortFunc));
    },
  };
};

export default connect(null, mapDispatch)(ControlPanel);
