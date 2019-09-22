import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import TableMovies from "./table-movies";
import Pagination from "../../common/pagination";
import ListGroup from "../../common/list-group";
import paginate from "../../../utils/paginate";

import { getMovies, deleteMovie } from "../../../services/fakeMovieService";
import { getGenres } from "../../../services/fakeGenreService";
import SearchBox from "../../common/search-box";
class Movies extends Component {
  state = {
    genres: getGenres(),
    movies: getMovies(),
    searchQuery: "",
    selectedGenre: null,
    itemInPage: 3,
    pageIndex: 1,
    sortColumn: { path: "title", order: "asc" }
  };

  handlePageChange = idx => {
    this.setState({
      pageIndex: idx
    });
  };

  handleDeleteMovie = movie => {
    deleteMovie(movie._id);
    this.setState({
      movies: getMovies()
    });
  };

  handleLove = movie => {
    this.setState(state => ({
      movies: state.movies.map(m => {
        if (m._id === movie._id) {
          return { ...m, love: !m.love };
        } else {
          return m;
        }
      })
    }));
  };

  handleGrenreSelect = genre => {
    this.setState({
      selectedGenre: genre,
      searchQuery: "",
      pageIndex: 1
    });
  };

  handleSortMovie = sortColumn => {
    this.setState({ sortColumn });
  };

  getMoviesForDisplay = () => {
    const {
      movies: allMovies,
      pageIndex,
      itemInPage,
      searchQuery,
      selectedGenre,
      sortColumn
    } = this.state;

    let movieFiltered;
    // filter by searchQuery
    if (searchQuery) {
      movieFiltered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
    } else {
      // filter by genre
      movieFiltered = selectedGenre
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;
    }

    const totalPages = Math.ceil(movieFiltered.length / itemInPage);
    // sort movies filterd
    const movieFilteredSorted = _.orderBy(
      movieFiltered,
      [sortColumn.path],
      sortColumn.order
    );

    const absPageIndex = pageIndex > totalPages ? totalPages : pageIndex;
    const movies = paginate(movieFilteredSorted, itemInPage, absPageIndex);
    return { lenShow: movieFiltered.length, movies, totalPages };
  };

  handleSearch = searchQuery => {
    this.setState({ searchQuery, selectedGenre: null, pageIndex: 1 });
  };

  render() {
    const {
      movies: allMovies,
      pageIndex,
      genres,
      searchQuery,
      selectedGenre,
      sortColumn
    } = this.state;
    if (allMovies.length === 0) {
      return <p>There is no movie</p>;
    }

    const { lenShow, movies, totalPages } = this.getMoviesForDisplay();

    return (
      <div className="row">
        <div className="col-3 pt-40">
          <ListGroup
            items={genres}
            onItemSelect={this.handleGrenreSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col pt-40">
          <div className="row">
          	<div className="col-8 offset-md-2">
          		<SearchBox searchQuery={searchQuery} onChange={this.handleSearch} />
          	</div>
          </div>
          <div className="row mb-10">
            <div className="col-10">
              <p className="pt-8">
                There are {lenShow} movie(s) in
                {selectedGenre ? selectedGenre.name : "all"}
              </p>
            </div>
            <div className="col-2">
              <Link className="btn btn-success" to="/movies/new">
                New Movie
              </Link>
            </div>
          </div>

          <TableMovies
            movies={movies}
            onLove={this.handleLove}
            onDelete={this.handleDeleteMovie}
            sortColumn={sortColumn}
            onSort={this.handleSortMovie}
          />
          <Pagination
            pageIndex={pageIndex}
            totalPages={totalPages}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
