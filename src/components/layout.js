import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import MenuHeader from "./menu-header";

import Movies from "./routes/movies/index";
import MovieForm from './routes/movies-form';
import Customers from "./routes/customers";
import Rentals from "./routes/rentals";
import PageNotFound from "./routes/page-not-found";
import RegisterForm from "./routes/register-form";
import LoginForm from "./routes/login-form";

const Layout = () => {
  return (
    <Router>
      <ToastContainer />
      <MenuHeader />
      <main className="container">
        <div className="pt-20">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={PageNotFound} />
            <Redirect from="/" exact={true} to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </main>
    </Router>
  );
};

export default Layout;
