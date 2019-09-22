import React from "react";
import { NavLink, Link } from 'react-router-dom';

const MenuHeader = () => {
  return (
    <ul className="nav" style={{backgroundColor: '#49b877', padding: '0 30px'}}>
      <li className="nav-item">
        <Link className="nav-link" to="/" >
          <h4>Vidly</h4>
        </Link>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/movies">
          Movies
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/customers">
          Customers
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/rentals">
          Rentals
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/register">
          Register
        </NavLink>
      </li>
    </ul>
  );
};

export default MenuHeader;
