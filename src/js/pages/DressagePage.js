"use strict";
import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

//import {} from 'react-stormpath';

export default class DressagePage extends React.Component {
    static contextTypes = {
    user: React.PropTypes.object
  };

  render() {
    return (
      <div className="container">
        <h2 className="text-center">
          Welcome
          { this.context.user ? ' ' + this.context.user.givenName : null }!
        </h2>
        <hr />
        <div className="jumbotron">
          <p>
            <strong>Welcome to the Dressage Page</strong>
          </p>
        </div>
      </div>
    );
  }
}