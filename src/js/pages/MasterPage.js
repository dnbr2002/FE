import { Link, browserHistory } from 'react-router';
import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import EventerPage from './EventerPage'
import { LoginLink } from 'react-stormpath';

var uid = {};
var dbuser = {};


// var UserId = React.createClass({
//   render: function() {
//       return (
//         <div>
//           <h1>{this.props.uid}</h1>
//         </div>
//       );
//     }
// });

export default class MasterPage extends React.Component {
    static contextTypes = {
    user: React.PropTypes.object
  };

    constructor(props) {
    super(props);
    console.log("REACT::MASTERPAGE::PROPS::",this.props);
    
    this.state = { dbuser: {} };
    
    //this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    // console.log('REACTHOME::CDM::PARSEDCONTEXTUSER',this.context.user)
    if(this.context.user.email){    
    fetch('/home/' + this.context.user.email)
      .then(function (response) {
        return response.json()
      }).then(function (json) {
        console.log('REACTMASTERPAGE::CDM::PARSEDJSON', JSON.stringify(json));
        dbuser = json[0];
        this.setState({
        id: dbuser.pk_id_user,
        firstname: dbuser.firstname,
        lastname: dbuser.lastname, 
        email: dbuser.email
        });
      }.bind(this))
      .catch(function (ex) {
        console.log('REACTHOME::CDM::ERRORPARSING', ex)
      });
    }
  }

  render() {
    var children = React.Children.map(this.props.children, function (child)  {
      return React.cloneElement(child, {
        id: this.state.id
      })
    },this)
    return (
      <DocumentTitle title='Fantasy Equestrian'>
        <div className='MasterPage'>
          <Header />
          { children }
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
}



