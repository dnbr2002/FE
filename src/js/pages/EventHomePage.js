"use strict";
import React from 'react';
import DocumentTitle from 'react-document-title';

//import {} from 'react-stormpath';

export default class EventHomePage extends React.Component {

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
            <strong>Welcome to the Eventer Page</strong>
          </p>
        </div>
      </div>
    );
  }
}