const jumboDivStyle = {
  backgroundColor: "#e5e0dc"
};

import { Link, browserHistory } from 'react-router';
import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import { Authenticated } from 'react-stormpath';
import { Col, Image, Panel, Grid, Row } from 'react-bootstrap';
import  EventerPage from './EventerPage';
import  MasterPage  from './MasterPage';
//import $ from 'jquery';

var dbuser = {};

//const element = <UserId id={...} />;

export default class HomePage extends React.Component {
  static contextTypes = {
    user: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    console.log("REACT::HOMEPAGE::PROPS::",this.props);
    console.log("REACT::HOME::IDPROP::",this.props.id)
        console.log("REACT::MasterPAGE::PROPS::",this.props.MasterPage);

    //this.state = { dbuser: {} };
    
    //this.componentDidMount = this.componentDidMount.bind(this);
  }



  componentWillMount() { }

  // componentDidMount() {
  //   this.serverRequest = $.get('/home/' + this.context.user.email, function (result) {
  //     console.log('REACTHOME::CDM::PARSEDJSON', JSON.stringify(result));
  //     var dbret = result[0];
  //     console.log('REACTHOME::CDM::PARSEDPROP', JSON.stringify(dbret));
  //     this.setState({
  //       email: dbret.email
  //     });
  //   }.bind(this));
  // }

  componentDidMount() {

  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>Fantasy Eq</h1>
          <p>Welcome {this.context.user ? ' ' + this.context.user.givenName : null}.  Select your fantasy equestrian sport, then choose your horse and rider pairs before the next competition!!</p>
          <p>HERE IS MY DBUSER:: {this.props.id}</p>    
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

// ReactDOM.render(
//   document.getElementById('container')
// );
