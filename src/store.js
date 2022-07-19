import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";

const initialState = {
  movies: [],
  sorting: (a, b) => {
    return a.id - b.id;
  },
};

//Reducer

const reducer = (state = initialState, action) => {
  if (action.type === "SET_MOVIES") {
    return { ...state, movies: action.movies.sort(state.sorting) };
  } else if (action.type === "GENERATE_MOVIE") {
    return {
      ...state,
      movies: [...state.movies, action.movie].sort(state.sorting),
    };
  } else if (action.type === "DELETE_MOVIE") {
    return {
      ...state,
      movies: state.movies
        .filter((movie) => movie.id !== action.movieId * 1)
        .sort(state.sorting),
    };
  } else if (action.type === "SET_RATING") {
    const movies = state.movies.filter(
      (movie) => movie.id !== action.movie.id * 1
    );
    return {
      ...state,
      movies: [...movies, action.movie].sort(state.sorting),
    };
  } else if (action.type === "CHANGE_SORT_FUNC") {
    const resortedMovies = state.movies.slice().sort(action.sortFunc);
    return {
      ...state,
      sorting: action.sortFunc,
      movies: resortedMovies,
    };
  }
  return state;
};

//Action Creators

const _setMovies = (movies) => {
  return {
    type: "SET_MOVIES",
    movies: movies,
  };
};

const _generateMovie = (movie) => {
  return {
    type: "GENERATE_MOVIE",
    movie: movie,
  };
};

const _deleteMovie = (movieId) => {
  return {
    type: "DELETE_MOVIE",
    movieId: movieId,
  };
};

const _setRating = (movie) => {
  return {
    type: "SET_RATING",
    movie: movie,
  };
};

const _changeSortFunc = (sortFunc) => {
  return {
    type: "CHANGE_SORT_FUNC",
    sortFunc: sortFunc,
  };
};

//Thunk Creators

export const fetchMovies = () => {
  return async (dispatch) => {
    const movies = (await axios.get("/api/movies")).data;
    dispatch(_setMovies(movies));
  };
};

export const generateMovie = () => {
  return async (dispatch) => {
    const movie = (await axios.post("/api/movies")).data;
    dispatch(_generateMovie(movie));
  };
};

export const deleteMovie = (movieId) => {
  return async (dispatch) => {
    await axios.delete(`/api/movies/${movieId}`);
    dispatch(_deleteMovie(movieId));
  };
};

export const setRating = (rating, movieId) => {
  return async (dispatch) => {
    try {
      const movie = (await axios.put(`/api/movies/${movieId}/rating/${rating}`))
        .data;
      dispatch(_setRating(movie));
    } catch (err) {
      alert(err.response.data.err.errors[0].message);
      return;
    }
  };
};

export const changeSortFunc = (sortFunc) => {
  return (dispatch) => {
    dispatch(_changeSortFunc(sortFunc));
  };
};

//Creating store and exporting

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
