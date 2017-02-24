"use strict";
import React, { PropTypes } from 'react';
//import { Link } from 'react-router';
//import ReactDOM from 'react-dom';

import { Authenticated } from 'react-stormpath';
import { Col, Image, Panel, Grid, Row, Button, Form, Schema, Property } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

// //import { images } from 'js/img';

var EvtTeam
var dbuser = {};


//Table stuff

function asMyQuote(input) {
  return '\'' + input + '\'';
}


function imageFormatter(cell, row) {
  var celly = asMyQuote(cell);
  //console.log("IMAGEFORMATTER CELLy::",celly);
  return <img src={require('../img/' + cell)} />;
}


export default class EventerPage extends React.Component {
  static contextTypes = {
    user: React.PropTypes.object
  };

  static defaultProps = {
    selectRowProp: {}
  };

  constructor(props) {
    super(props);
    this.state = { selected: [], value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.options = {
      defaultSortName: 'ridername',  // default sort column name
      defaultSortOrder: 'desc'  // default sort order
    };
  }

  componentWillMount() { }

  componentDidMount() {
      
   }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event, propid) {
    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    console.log('REACT::EVENTERTEAM::HANDLESUBMIT::SELECTEDTEAM', JSON.stringify(this.state.selected));
    console.log('REACT::EVENTERTEAM::HANDLESUBMIT::PROPID', JSON.stringify(propid));

    fetch(`/eventerteam/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: propid,
        teamName: this.state.value,
        team: this.state.selected,
      })
    })
  }




  handleRowSelect = (row, isSelected, e) => {
    if (isSelected) {
      console.log("MYROW::", row);
      console.log("MYSTATEROW1::", this.state.selected)
      this.setState({ selected: this.state.selected.concat([row]) }, () => {
        console.log("MYSTATEROW2::", this.state.selected[0].ridername);
      });
    } else {
      this.setState({ selected: this.state.selected.filter(it => it !== row) });
    }
  }




  render() {

    var selectRowProp = {
      mode: 'checkbox',
      bgColor: '#dcf442', // you should give a bgcolor, otherwise, you can't regonize which row has been selected
      hideSelectColumn: true,  // enable hide selection column.
      clickToSelect: true,  // you should enable clickToSelect, otherwise, you can't select column.
      onSelect: this.handleRowSelect.bind(this)
    };

    //const { Eventer1 } = this.props.tier1


    return (
      
      <div className="container">
        <div className="jumbotron">
          <h2>Welcome Fantasy Eventers</h2>
          <p>Here's the basics:</p>
          <ol>

            <li>User Prop ID:: {this.props.id}</li>
          </ol>
        </div>
        <Grid>
          <Row>
            <div>{this.state.selected.map((selected, index) => (
              <Col sm={2} md={2} key={index}>{selected.ridername}<img src={require('../img/' + selected.pic)} /><p>{selected.horsename}</p></Col>
            ))}</div>
          </Row>

          <Row>

            <form onSubmit={() => this.handleSubmit(this.props.id)}>
              <label>
                Enter Team Name&nbsp;&nbsp;
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              &nbsp;&nbsp;&nbsp;<input type="submit" value="Submit" className="btn btn-warning" />
            </form>
          </Row>
        </Grid>

        <h3>Tier 1 Eventers</h3>
        <h4>Pick 2</h4>
        <BootstrapTable data={this.props.tier1} hover selectRow={selectRowProp} bodyStyle={{ background: '#f4a442' }} ref='table1'>
          <TableHeaderColumn isKey dataField='pk_id_competitor' hidden>compId</TableHeaderColumn>
          <TableHeaderColumn dataField='pic' dataFormat={imageFormatter}>pic</TableHeaderColumn>
          <TableHeaderColumn dataField='ridername' dataSort>Ridername</TableHeaderColumn>
          <TableHeaderColumn dataField='horsename' dataSort>Horsename</TableHeaderColumn>
          <TableHeaderColumn dataField='eventtier'>EventTier</TableHeaderColumn>
        </BootstrapTable>

                <h3>Tier 2 Eventers</h3>
        <h4>Pick 4</h4>
        <BootstrapTable data={this.props.tier2} hover selectRow={selectRowProp} bodyStyle={{ background: '#f4a442' }} ref='table2'>
          <TableHeaderColumn isKey dataField='pk_id_competitor' hidden>compId</TableHeaderColumn>
          <TableHeaderColumn dataField='pic' dataFormat={imageFormatter}>pic</TableHeaderColumn>
          <TableHeaderColumn dataField='ridername' dataSort>Ridername</TableHeaderColumn>
          <TableHeaderColumn dataField='horsename' dataSort>Horsename</TableHeaderColumn>
          <TableHeaderColumn dataField='eventtier'>EventTier</TableHeaderColumn>
        </BootstrapTable>

        <h3>Tier 3 Eventers</h3>
        <h4>Pick 2</h4>
        <BootstrapTable data={this.props.tier3} hover selectRow={selectRowProp} bodyStyle={{ background: '#f4a442' }} ref='table3'>
          <TableHeaderColumn isKey dataField='pk_id_competitor' hidden>compId</TableHeaderColumn>
          <TableHeaderColumn dataField='pic' dataFormat={imageFormatter}>pic</TableHeaderColumn>
          <TableHeaderColumn dataField='ridername' dataSort>Ridername</TableHeaderColumn>
          <TableHeaderColumn dataField='horsename' dataSort>Horsename</TableHeaderColumn>
          <TableHeaderColumn dataField='eventtier'>EventTier</TableHeaderColumn>
        </BootstrapTable>

      </div>
    );

  }

}

