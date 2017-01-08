const jumboDivStyle = {
  backgroundColor: "#e5e0dc"
};

import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import { Authenticated } from 'react-stormpath';
import { Col, Image, Panel, Grid, Row } from 'react-bootstrap';
import $ from 'jquery';


export default class HomePage extends React.Component {
  static contextTypes = {
    user: React.PropTypes.object
  };
constructor(props) {
    super(props);
  this.state= {
    dbuser: []
  };
}
  componentWillMount() { }

  componentDidMount() {
    fetch('/home/' + this.context.user.email)
      .then(function (response) {
        return response.json()
      }).then(function (json) {
        console.log('REACTHOME::CDM::PARSEDJSON', JSON.stringify(json))
        const dbuser = json.map(obj => obj.data);
        this.state({ dbuser });
      }).catch(function (ex) {
        console.log('REACTHOME::CDM::ERRORPARSING', JSON.stringify(ex))
      })
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>Fantasy Equestrian</h1>
          <p>Welcome {this.context.user ? ' ' + this.context.user.givenName : null}.  Select your fantasy equestrian sport, then choose your horse and rider pairs before the next competition!!</p>
          <p>HERE IS MY DBUSER:: {this.state.dbuser.map(post => {post.email})}</p>
          <p><a className="btn btn-warning btn-lg" href="#" role="button">Learn more »</a></p>
        </div>
        <hr />
        <Grid>
          <Row>
            <Col xs={12} sm={4} md={4}>

              {/* <Image src={require('../img/HomeEventer.jpg')}/>*/}
              <p>
                <strong>Fantasy Eventers</strong>
              </p>
              <a href="/eventerpage" className="btn btn-warning" role="button">Lets Play!!</a>

            </Col>


            <Col xs={12} sm={4} md={4}>
          
           {/* <Image src={require('../img/HomeJumper.jpg')}/>*/}
              <p>
                <strong>Fantasy Jumpers</strong>
              </p>
              <a href="/jumperpage" className="btn btn-warning" role="button">Lets Play!!</a>

          </Col>

          <Col xs={12} sm={4} md={4}>

    {/* <Image src={require('../img/HomeDressage.jpg')}/> */}
          <p>
            <strong>Fantasy Dressage</strong>
          </p>
            <a href="/dressagepage" className="btn btn-warning" role="button">Lets Play!!</a>

        </Col>
        </Row>
  </Grid>


      </div>
    );
  }
}
