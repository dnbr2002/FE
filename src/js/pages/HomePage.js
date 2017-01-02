import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import { Authenticated } from 'react-stormpath';
import { Col, Image, Panel } from 'react-bootstrap';

const jumboDivStyle = {
  backgroundColor: "#e5e0dc"
};

export default class HomePage extends React.Component {
  static contextTypes = {
    user: React.PropTypes.object
  };


  render() {
    return (
      <div className="container">
        <h1 className="text-center">
         Welcome
          {this.context.user ? ' ' + this.context.user.givenName : null} to Fantasy Equestrian.  Choose your Game!
        </h1>
        <hr />
        <div>
          <Col xs={12} sm={4} md={4}>
            <div className="jumbotron" style={jumboDivStyle}>
              <Image src={require('../img/HomeEventer.jpg')}/>
              <p>
                <strong>Fantasy Eventers</strong>
              </p>          
                <a href="/eventerpage" className="btn btn-warning" role="button">Lets Play!!</a>
            </div>
          </Col>

        </div>
        <div>
          <Col xs={12} sm={4} md={4}>
            <div className="jumbotron" style={jumboDivStyle}>
            <Image src={require('../img/HomeJumper.jpg')}/>
              <p>
                <strong>Fantasy Jumpers</strong>
              </p>
              <a href="/jumperpage" className="btn btn-warning" role="button">Lets Play!!</a>
            </div>
          </Col>
        </div>
        <div>
          <Col xs={12} sm={4} md={4}>
        <div className="jumbotron" style={jumboDivStyle}>
        <Image src={require('../img/HomeDressage.jpg')}/>
          <p>
            <strong>Fantasy Dressage</strong>
          </p>
            <a href="/dressagepage" className="btn btn-warning" role="button">Lets Play!!</a>
        </div>
        </Col>
        </div>
      </div>
    );
  }
}
