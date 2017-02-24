import { Link } from 'react-router';
import React, { Component,PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import { Authenticated, NotAuthenticated, LoginLink } from 'react-stormpath';
import { Col, Image, Panel, Grid, Row } from 'react-bootstrap';

export default class IndexPage extends React.Component {
  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center">
          Welcome
          {this.context.user ? ' ' + this.context.user.givenName : null}!
        </h2>
        <hr />
        <div className="jumbotron">

          <ol className="lead">
              <li><Link to="/register">Registration</Link></li>
              <li><LoginLink /></li>
              <li><Link to="/forgot">Forgot Password</Link></li>

          </ol>
        </div>
      </div>
    );
  }
}
