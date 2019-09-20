import React, { Component } from 'react';

class MovieForm extends Component {
  state = {  }
  render() {
    const {match, history} = this.props;

    return (
      <div>
        <h1>MovieForm {match.params.id}</h1>
        <button className="btn btn-primary" onClick={() => history.push("/movies")}>Save</button>
      </div>
    );
  }
}
 
export default MovieForm;