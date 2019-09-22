import React from "react";
import { Link } from "react-router-dom";
import Heart from "../../common/heart";
import Table from "../../common/table";

const TableMovie = ({ movies, onLove, onDelete, sortColumn, onSort }) => {
  const columns = [
    {
      path: "title",
      name: "Title",
      renderContent: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", name: "Genre" },
    { path: "numberInStock", name: "Stock" },
    { path: "dailyRentalRate", name: "Rate" },
    {
      key: "love",
      renderContent: movie => (
        <Heart love={movie.love} toggleLove={() => onLove(movie)} />
      )
    },
    {
      key: "delete",
      renderContent: movie => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(movie)}
        >
          Delete
        </button>
      )
    }
  ];

  return (
    <Table
      columns={columns}
      data={movies}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default TableMovie;
