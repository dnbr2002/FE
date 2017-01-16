"use strict";
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import DocumentTitle from 'react-document-title';
//import { Col, Image, Panel, Grid, Row } from 'react-bootstrap';
import ReactDataGrid from 'react-data-grid';
import{ Editors, Toolbar, AutoCompleteEditor, DropDownEditor } from 'react-data-grid/addons';



//import { Select } from 'react-bootstrap-select';
//import Select from 'react-select';
//import 'react-select/dist/react-select.css';
//import $ from 'jquery';

//import {} from 'react-stormpath';

//var Select = require('react-select');
//var Evt1

// var getTier1 = fetch(`/eventers/` + 1)
//   .then(function (response) {
//     return response.json();
//   }).then(function (json) {
//     console.log('REACT::EVENTERHOME::CDM::PARSEDJSON', JSON.stringify(json));
//    console.log('REACT::EVENTERHOME::CDM::PARSEDJSON', { options: json });
//     Evt1 = json;
//    console.log('REACT::EVENTERHOME::CDM::TIER1-', Evt1);
//     console.log('REACT::EVENTERHOME::CDM::OPTIONS-', options);
//     return { options: json };
//   }).catch(function (ex) {
//   console.log('REACT::EVENTERHOME::ERROR GETTTING TIER1-', ex)
//   })

// var options = [
//   { value: 'one', label: 'One' },
//   { value: 'two', label: 'Two' },
//   { value: 'three', label: 'Three' }
// ];

// function logChange(val) {
// //  console.log("Selected: " + JSON.stringify(val));
// }





// var getOptions = (input) => {
//   return fetch(`/eventers/` + 1)
//   .then((response) => {
//         console.log('REACT::EVENTERHOME::CDM::PARSEDRESPONSE', JSON.stringify(response.json));
//       return response.json();
//     }).then((json) => {
//           console.log('REACT::EVENTERHOME::CDM::PARSEDJSON', JSON.stringify(json));
//       return { options: json };
//     });
// }



export default class EventerPage extends React.Component {
  static contextTypes = {
    user: React.PropTypes.object
  };
  constructor(props) {
    super(props);
  }
  componentWillMount() { }

  componentDidMount() { }

  


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
        <h1>Tier 3 Eventers</h1>
        <h2>Pick 2</h2>

<Example />

      </div>
    );
    
  }
  
}



var Example = React.createClass({
  getInitialState: function(){
    var rows = [];
    for (var i = 1; i < 5; i++) {
      rows.push({
        id: i,
        title: 'Title ' + i,
        count: i * 1000
      });
    }
    return {rows, selectedIndexes: []};
  },
  getColumns: function() {
    return  [
      {
        key: 'id',
        name: 'ID'
      },
      {
        key: 'title',
        name: 'Title'
      },
      {
        key: 'count',
        name: 'Count'
      }
    ];
  },
  rowGetter: function(i) {
    return this.state.rows[i];
  },
  onRowsSelected: function(rows) {
    this.setState({selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx))});
  },
  onRowsDeselected: function(rows) {
    var rowIndexes = rows.map(r => r.rowIdx);
    this.setState({selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1 )});
  },
  render: function() {
    var rowText = this.state.selectedIndexes.length === 1 ? 'row' : 'rows';
    return  (
      <div>
        <span>{this.state.selectedIndexes.length} {rowText} selected</span>
        <ReactDataGrid
          rowKey='id'
          columns={this.getColumns()}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={200}
          rowSelection={{
            showCheckbox: true,
            enableShiftSelect: true,
            onRowsSelected: this.onRowsSelected,
            onRowsDeselected: this.onRowsDeselected,
            selectBy: {
              indexes: this.state.selectedIndexes
            }
          }} />
      </div>);
  }
});


 