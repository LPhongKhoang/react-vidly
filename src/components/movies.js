import React, { Component } from "react";
import _ from "lodash";

import TableMovies from "./table-movies";
import Pagination from "./common/pagination";
import ListGroup from "./common/list-group";
import paginate from "../utils/paginate";

import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
class Movies extends Component {
  state = {
    genres: getGenres(),
    movies: getMovies(),
    selectedGenre: null,
    itemInPage: 3,
    pageIndex: 1,
    sortColumn: {path: 'title', order: 'asc'}
  };

  handlePageChange = idx => {
    this.setState({
      pageIndex: idx
    })
  }

  handleDeleteMovie = (movie) => {
    this.setState(state => ({
      movies: state.movies.filter(m => m._id !== movie._id)
    }))
  }

  handleLove = (movie) => {
    this.setState(state => ({
      movies: state.movies.map(m => {
        if(m._id === movie._id) {
          return {...m, love: !m.love};
        }else{
          return m;
        }
      })
    }));
  }

  handleGrenreSelect = (genre) => {
    this.setState({
      selectedGenre: genre,
      pageIndex: 1
    });
  }

  handleSortMovie = sortColumn => {
    this.setState({sortColumn});
  }

  getMoviesForDisplay = () => {
    const { 
      movies: allMovies,
      pageIndex,
      itemInPage,
      selectedGenre,
      sortColumn 
    } = this.state;

    let allMoviesByGenre = selectedGenre
      ? allMovies.filter(m => m.genre._id === selectedGenre._id)
      : allMovies;
    const totalPages = Math.ceil(allMoviesByGenre.length/itemInPage);
    // sort allMovies
    const allMoviesByGenreSorted = _.orderBy(allMoviesByGenre, [sortColumn.path], sortColumn.order);

    const absPageIndex = pageIndex > totalPages ? totalPages : pageIndex;
    const movies = paginate(allMoviesByGenreSorted, itemInPage, absPageIndex);
    return {lenShow: allMoviesByGenre.length, movies, totalPages};
  }

  render() {
    const { 
            movies: allMovies,
            pageIndex,
            genres,
            selectedGenre,
            sortColumn 
          } = this.state;
    if(allMovies.length === 0) {
      return <p>There is no movie</p>
    }
    
    const {lenShow, movies, totalPages} = this.getMoviesForDisplay();

    return (
      <div className="row">
        <div className="col-3" style={{paddingTop: '40px'}}>
          <ListGroup items={genres} onItemSelect={this.handleGrenreSelect} selectedItem={selectedGenre}/>
        </div>
        <div className="col">
          <p>There are {lenShow} movie(s) in {selectedGenre? selectedGenre.name : "all"}</p>
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
