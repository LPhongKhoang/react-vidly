import React, { Component } from "react";
import Heart from "./common/heart";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";
class Movies extends Component {
  state = {
    movies: getMovies(),
    totalPages: 8,
    pageIndex: 1,
    pages: 4
  };

  handlePageChange = idx => {
    setState(state => ({
      ...state,
      pageIndex: idx
    }))
  }

  handleDelete = movie => {
    this.setState(state => ({
      movies: state.movies.filter(m => m._id !== movie._id)
    }));
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

  render() {
    const { movies, pageIndex, pages, totalPages } = this.state;
    if(movies.length === 0) {
      return <p>There is no movie</p>
    }
    return (
      <>
        <p>There are {movies.length} movie(s)</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, idx) => (
              <tr key={idx}>
                <th scope="row">{idx+1}</th>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Heart love={movie.love} toggleLove={() => this.handleLove(movie)} />
                </td>
                <td>
                  <button className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          pages={pages}
          pageIndex={pageIndex}
          totalPages={totalPages}
          onPageChange={this.handlePageChange} 
        />
      </>
    );
  }
}

export default Movies;
