import React from "react";
import { connect } from "react-redux";
import { setRating } from "../store";

//Rating component to add 5 stars to each movie for ratings
//setRating is triggered when any of the starts is clicked and passes the index of the star as the new rating

const Rating = ({ movies, movieId, setRating }) => {
  const rating = movies.filter((movie) => movie.id === movieId)[0].rating;
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        return (
          <i
            key={index}
            className={`fa-solid fa-star star ${index < rating ? "on" : "off"}`}
            onClick={() => setRating(index + 1, movieId)}
          ></i>
        );
      })}
    </div>
  );
};

const mapState = (state) => {
  return {
    movies: state.movies,
  };
};

const mapDispatch = (dispatch) => {
  return {
    setRating: (rating, movieId) => {
      dispatch(setRating(rating, movieId));
    },
  };
};

export default connect(mapState, mapDispatch)(Rating);
