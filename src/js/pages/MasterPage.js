import { Link, browserHistory } from 'react-router';
import React, { Component, PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import EventerPage from './EventerPage'
//import { LoginLink } from 'react-stormpath';
//import { Component } from 'react-bootstrap';


//var dbuser = {}
var EvtTier1 = [];
var EvtTier2 = [];
var EvtTier3 = [];

export default class MasterPage extends React.Component {
  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    //this.componentDidMount = this.componentDidMount.bind(this);

    this.state = { id: '', firstname: '', lastname: '', email: '', tier1: [], tier2: [], tier3: [] };
  }

  componentDidMount() {
    // console.log('REACTHOME::CDM::PARSEDCONTEXTUSER',this.context.user)
    if (this.context.authenticated) {
      fetch('/home/' + this.context.user.email)
        .then(function (response) {
          return response.json()
        }).then(function (json) {
          // console.log('REACTMASTERPAGE::CDM::PARSEDJSON', JSON.stringify(json));
          var dbuser = json[0]
          this.setState({
            id: dbuser.pk_id_user,
            firstname: dbuser.firstname,
            lastname: dbuser.lastname,
            email: dbuser.email
          });
        }.bind(this))
        .catch(function (ex) {
          //  console.log('REACTHOME::CDM::ERRORPARSING', ex)
        });

      fetch(`/eventers/` + 1)
        .then(function (response) {
          return response.json();
        }).then(function (json) {
          EvtTier1 = json
          this.setState({
            tier1: EvtTier1
          });
        }.bind(this))
        .catch(function (ex) {
        })

      fetch(`/eventers/` + 2)
        .then(function (response) {
          return response.json();
        }).then(function (json) {
          EvtTier2 = json
          this.setState({
            tier2: EvtTier2
          });
        }.bind(this))
        .catch(function (ex) {
        })

      fetch(`/eventers/` + 3)
        .then(function (response) {
          return response.json();
        }).then(function (json) {
          EvtTier3 = json;
          this.setState({
            tier3: EvtTier3
          });
        }.bind(this))
        .catch(function (ex) {
        })
    }
  }

  render() {
    var children = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, {
        id: this.state.id,
        tier1: this.state.tier1,
        tier2: this.state.tier2,
        tier3: this.state.tier3
      })
    }, this)
    return (
      <DocumentTitle title='Fantasy Equestrian'>
        <div className='MasterPage'>
          <Header />
          {children}
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
}



