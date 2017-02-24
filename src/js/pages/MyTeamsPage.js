"use strict";
import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

//import {} from 'react-stormpath';

export default class MyTeamsPage extends React.Component {
    static contextTypes = {
    user: React.PropTypes.object
  };

    constructor(props) {
    super(props);
  }

  render() {
    return (
        <DocumentTitle title={`My Team`}>
      <div className="container">
        <h2 className="text-center">
          Welcome
          { this.context.user ? ' ' + this.context.user.givenName : null }!
          { this.context.user.email}
        </h2>
        <hr />
        <div className="jumbotron">
          <p>
            <strong>DBUser: {this.props.id}</strong>
          </p>
        </div>
      </div>
      </DocumentTitle>
    );
  }
}