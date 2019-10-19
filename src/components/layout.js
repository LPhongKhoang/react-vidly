import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import MenuHeader from "./menu-header";
import TestRichText from "./routes/test-rich-text";
import Movies from "./routes/movies/";
import MovieForm from "./routes/movies-form";
import Customers from "./routes/customers";
import Rentals from "./routes/rentals";
import PageNotFound from "./routes/page-not-found";
import RegisterForm from "./routes/register-form";
import LoginForm from "./routes/login-form";
import Logout from "./routes/logout";
import ProtectedRoute from "./common/protected-route";
import { getCurrentUser } from "../services/authService";

class Layout extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <Router>
        <ToastContainer />
        <MenuHeader user={user} />
        <main className="container">
          <div className="pt-20">
            <Switch>
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <Route path="/register" component={RegisterForm} />
              <Route path="/test-rich-text" render={TestRichText} />
              <ProtectedRoute path="/movies/:id" component={MovieForm} />
              <Route
                path="/movies"
                render={props => <Movies {...props} user={user} />}
              />
              <Route path="/customers" component={Customers} />
              <Route path="/rentals" component={Rentals} />
              <Route path="/not-found" component={PageNotFound} />
              <Redirect from="/" exact={true} to="/test-rich-text" />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </main>
      </Router>
    );
  }
}

export default Layout;
