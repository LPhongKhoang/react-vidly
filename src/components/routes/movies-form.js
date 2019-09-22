import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import PropTypes from "prop-types";

import { getGenres } from "../../services/fakeGenreService";
import { saveMovie, getMovie } from './../../services/fakeMovieService';

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    mode: "",
    genres: [],
    errors: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    }
  };
  schemaDataSpec = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Daily rental rate")
  };
  schemaDataCommon = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .label("Number in stock"),
    dailyRentalRate: Joi.number()
      .required()
      .label("Daily rental rate")
  };

  doSubmit = () => {
    // Call http request to server
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  componentDidMount() {
    // get genres for dropdown list
    const genres = getGenres();

    const { history, match } = this.props;
    const idCheck = match.params.id;
    if(idCheck === "new") {
      this.setState({genres, mode: "create"});
    }else{
      const movie = getMovie(idCheck);
      if(!movie) {
        return history.replace("/not-found");
      }else{
        this.setState({genres, mode: "update", data: this.mapToViewModel(movie), errors:{}});
      }
    }
  }

  mapToViewModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  render() {
    const { mode, genres } = this.state;
    return (
      <div className="container w-600">
        <h1 className="mb-40">{{create: "Create movie", update: "Update movie"}[mode]}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput({ name: "title", label: "Title", autoFocus: true })}
          {this.renderDropdown({
            name: "genreId",
            label: "Genre",
            dataList: genres,
            keyProperty: "_id",
            valueProperty: "name"
          })}
          {this.renderInput({
            name: "numberInStock",
            label: "Stock",
            type: "number"
          })}
          {this.renderInput({
            name: "dailyRentalRate",
            label: "Rate",
            type: "number"
          })}

          {this.renderBtnSubmit(mode)}
        </form>
      </div>
    );
  }
}

MovieForm.defaultProps = {
  titlePage: "Movie details",
  movie: {}
};

MovieForm.propTypes = {
  titlePage: PropTypes.string,
  onSubmitMovie: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    title: PropTypes.string,
    genre: PropTypes.string,
    numberInStock: PropTypes.number,
    dailyRentalRate: PropTypes.number
  })
};

export default MovieForm;