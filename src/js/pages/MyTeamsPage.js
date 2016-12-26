"use strict";
import React from 'react';
import DocumentTitle from 'react-document-title';

//import {} from 'react-stormpath';

export default class MyTeamsPage extends React.Component {

  render() {
    return (
        <DocumentTitle title={`My Team`}>
      <div className="container">
        <h2 className="text-center">
          Welcome
          { this.context.user ? ' ' + this.context.user.givenName : null }!
        </h2>
        <hr />
        <div className="jumbotron">
          <p>
            <strong>Set your team here!!!!</strong>
          </p>
        </div>
      </div>
      </DocumentTitle>
    );
  }
}