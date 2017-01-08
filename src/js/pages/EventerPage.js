"use strict";
import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

//import {} from 'react-stormpath';

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
        <hr />

      </div>
    );
  }
}