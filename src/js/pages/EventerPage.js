"use strict";
import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import { Col, Image, Panel, Grid, Row } from 'react-bootstrap';
//import { Select } from 'react-bootstrap-select';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import $ from 'jquery';

//import {} from 'react-stormpath';

//var Select = require('react-select');

// var Teir1Options = [
//     { value: 'one', label: 'One' },
//     { value: 'two', label: 'Two' }
// ];

// function logChange(val) {
//     console.log("Selected: " + JSON.stringify(val));
// }

var getTier1 = (input) => {
  fetch(`/eventers/` + 1)
    .then(function (response) {
      return response.json();
    }).then(function (json) {
      console.log('REACT::EVENTERHOME::CDM::PARSEDJSON', JSON.stringify(json));
      console.log('REACT::EVENTERHOME::CDM::PARSEDJSON', { options: json });
      return { options: json };
    }).catch(function (ex) {
      console.log('REACT::EVENTERHOME::ERROR GETTTING TIER1-', ex)
    })
}

export default class EventerPage extends React.Component {
  static contextTypes = {
    user: React.PropTypes.object
  };



  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h2>Welcome Fantasy Eventers</h2>
          <p>Here's the basics:</p>
          <ol>
            <li>Riders are posted as final 48 hrs before the start of the next great event.</li>
            <li>You will able to select one scratch replacement in case you select a horse and rider pair that scratch before the event.</li>
            <li>Select a total of 8 riders from the list below plus one scratch replacement.</li>
            <li>All teams lock once the first rider enters the dressage arena.</li>
            <li>Once you've picked you team, go create your own league, invite your friends or join and existing league.</li>
          </ol>
        </div>
        <h1>Teir 1 Eventers</h1>
        <h2>Pick 2</h2>

        <Select.Async
          name="form-field-name"
          multi={true}
          value=""
          loadOptions={getTier1}
          />

      </div>
    );
  }
}
