import { createRoot } from "react-dom/client";
import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import store from "./store";
import { fetchMovies, deleteMovie } from "./store";
import Rating from "./components/Rating";
import ControlPanel from "./components/ControlPanel";

const root = createRoot(document.querySelector("#root"));

class _App extends Component {
  componentDidMount() {
    this.props.load();
  }

  render() {
    const movies = this.props.movies;

    return (
      <React.Fragment>
        <div id="title">
          <h1>Acme Movie Generator</h1>
          <h3>
            Average Movie Rating is{" "}
            {movies.length > 0
              ? Math.round(
                  (movies.reduce((accum, curr) => accum + curr.rating, 0) /
                    movies.length) *
                    100
                ) / 100
              : 0}
          </h3>
        </div>
        <ControlPanel />

        <div id="movieGrid">
          {movies.map((movie) => (
            <div key={movie.id}>
              <i
                data-id={movie.id}
                className="fa-solid fa-x"
                onClick={(e) => {
                  this.props.deleteMovie(e.target.getAttribute("data-id"));
                }}
              ></i>
              <img src={movie.image} />
              <Rating movieId={movie.id} />
              <h3>{movie.name}</h3>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

const mapState = (state) => {
  return {
    movies: state.movies,
    sorting: state.sorting,
  };
};

const mapDispatch = (dispatch) => {
  return {
    load: () => {
      dispatch(fetchMovies());
    },
    deleteMovie: async (movieId) => {
      dispatch(deleteMovie(movieId));
    },
  };
};

const App = connect(mapState, mapDispatch)(_App);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
