import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";

import { getGenres } from "../../services/genreService";
import { saveMovie, getMovie } from "../../services/movieService";
import { toast } from "react-toastify";

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

  doSubmit = async () => {
    try{
      // Call http request to server
      const { data: movie, mode } = this.state;
      await saveMovie(movie);
      if(mode==="update"){
        toast.success("Update movie ok");
      }else {
        // mode === "create"
        toast.success("Create new movie ok");
      }
      this.props.history.push("/movies");
    }catch(ex) {
      if(ex.response) {
        if(ex.response.status === 404) {
          toast.error("This movie is already deleted");
        }else if(ex.response.status === 400) {
          toast.error("Bad request!!!");
        }
      }
    }
  };

  async componentDidMount() {
    // get genres for dropdown list
    const { data: genres } = await getGenres();

    // check id param to see this form is for creating or updating
    const { history, match } = this.props;
    const idCheck = match.params.id;
    if (idCheck === "new") {
      this.setState({ genres, mode: "create" });
    } else {
      // get movie with id
      try {
        const { data: movie } = await getMovie(idCheck);
        this.setState({
          genres,
          mode: "update",
          data: this.mapToViewModel(movie),
          errors: {}
        });
      } catch (ex) {
        if (ex.response && ex.response.status === 404) {
          return history.replace("/not-found");
        }
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
  };

  render() {
    const { mode, genres } = this.state;
    return (
      <div className="container w-600">
        <h1 className="mb-40">
          {{ create: "Create movie", update: "Update movie" }[mode]}
        </h1>
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

export default MovieForm;
