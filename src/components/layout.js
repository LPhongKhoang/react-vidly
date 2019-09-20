import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import MenuHeader from "./menu-header";

import Movies from "./movies";
import Customers from "./customers";
import Rentals from "./rentals";
import PageNotFound from "./PageNotFound";
import MovieForm from './movies-form';

const Layout = () => {
  return (
    <Router>
      <MenuHeader />
      <main className="container">
        <div className="pt-20">
          <Switch>
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
