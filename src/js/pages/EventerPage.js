"use strict";
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';
import DocumentTitle from 'react-document-title';
import { Authenticated } from 'react-stormpath';
import { Col, Image, Panel, Grid, Row, Button, Form, Schema, Property, Component } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

//import { images } from 'js/img';

var EvtTier1
var EvtTier2
var EvtTier3
var EvtTeam
var dbuser

var getTier1 = fetch(`/eventers/` + 1)
  .then(function (response) {
    return response.json();
  }).then(function (json) {
   // console.log('REACT::EVENTTIER1::CDM::PARSEDJSON', JSON.stringify(json));
   // console.log('REACT::EVENTTIER1::CDM::PARSEDJSON', { options: json });
    EvtTier1 = json;
  //  console.log('REACT::EVENTTIER1::CDM::TIER1-', EvtTier1);
    //  console.log('REACT::EVENTERHOME::CDM::OPTIONS-', options);
    return { options: json };
  }).catch(function (ex) {
  //  console.log('REACT::EVENTTIER1::ERROR GETTTING TIER1-', ex)
  })

var getTier2 = fetch(`/eventers/` + 2)
  .then(function (response) {
    return response.json();
  }).then(function (json) {
   // console.log('REACT::EVENTTIER2::CDM::PARSEDJSON', JSON.stringify(json));
  //  console.log('REACT::EVENTTIER2::CDM::PARSEDJSON', { options: json });
    EvtTier2 = json;
 //   console.log('REACT::EVENTHOME2::CDM::TIER2-', EvtTier2);
    //  console.log('REACT::EVENTERHOME::CDM::OPTIONS-', options);
    return { options: json };
  }).catch(function (ex) {
  //  console.log('REACT::EVENTTIER2::ERROR GETTTING TIER2-', ex)
  })

var getTier3 = fetch(`/eventers/` + 3)
  .then(function (response) {
    return response.json();
  }).then(function (json) {
  //  console.log('REACT::EVENTTIER3::CDM::PARSEDJSON', JSON.stringify(json));
  //  console.log('REACT::EVENTTIER3::CDM::PARSEDJSON', { options: json });
    EvtTier3 = json;
  //  console.log('REACT::EVENTTIER3::CDM::TIER3-', EvtTier3);
    //  console.log('REACT::EVENTERHOME::CDM::OPTIONS-', options);
    return { options: json };
  }).catch(function (ex) {
  //  console.log('REACT::EVENTTIER3::ERROR GETTTING TIER3-', ex)
  })



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
  constructor(props) {
    super(props);
    console.log("REACT::EVENTERPAGE::PROPS::",this.props);
    this.state = { selected: [], value: '', dbuser: {} };
    // this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.options = {
      defaultSortName: 'ridername',  // default sort column name
      defaultSortOrder: 'desc'  // default sort order
    };
  }

      // componentWillMount() { }

   componentDidMount() {
    // console.log('REACTHOME::CDM::PARSEDCONTEXTUSER',this.context.user)
    // fetch('/home/' + this.context.user.email)
    //   .then(function (response) {
    //     return response.json()
    //   }).then(function (json) {
    //     console.log('REACTHOME::CDM::PARSEDJSON', JSON.stringify(json));
    //     dbuser = json[0];
    //     this.setState({
    //     id: dbuser.pk_id_user,
    //     firstname: dbuser.firstname,
    //     lastname: dbuser.lastname, 
    //     email: dbuser.email
    //     });
    //   }.bind(this))
    //   .catch(function (ex) {
    //     console.log('REACTHOME::CDM::ERRORPARSING', ex)
    //   });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    console.log('REACT::EVENTERTEAM::CDM::SELECTEDTEAM', JSON.stringify(this.state.selected));
    //var jsonData = JSON.parse(this.state.selected);
    // for (var i=0; i < jsonData.counters.length; i++) {
    //   var counter = jsonData.counters[i];
    //   console.log('REACT::EVENTERTEAM::CDM::SELECTEDTEAM::PARSED::',counter.ridername);
    // }
    fetch(`/eventerteam/`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.id,
        teamName: this.state.value,
        team: this.state.selected,
      })
    })
  }




    // handleClickBtn = () => {
    //   console.log(this.state.selected);
    // }

    // onRowSelect =({id},isSelected) => {
    //   //Here is your answer
    //   if (isSelected) {
    //     console.log("REFTABLES::",this.refs.tables.state.selectedRowKeys);
    //     this.setState({ selected: [...this.state.selected, id]});
    //   } else {
    //     this.setState({ selected: this.state.selected.filter(it => it !== id)});
    //   }
    // }

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
              <li>{this.props.id}</li>
            </ol>
          </div>

          <Grid>
            <Row>
              <div>{this.state.selected.map((selected, index) => (
                <Col sm={2} md={2} key={index}>{selected.ridername}<img src={require('../img/' + selected.pic)} /><p>{selected.horsename}</p></Col>
              ))}</div>
            </Row>

            <Row>
              <h4>{this.state.value}</h4>

              <form onSubmit={this.handleSubmit}>
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
          <BootstrapTable data={EvtTier1} hover selectRow={selectRowProp} bodyStyle={{ background: '#f4a442' }} ref='table1'>
            <TableHeaderColumn isKey dataField='pk_id_competitor' hidden>compId</TableHeaderColumn>
            <TableHeaderColumn dataField='pic' dataFormat={imageFormatter}>pic</TableHeaderColumn>
            <TableHeaderColumn dataField='ridername' dataSort>Ridername</TableHeaderColumn>
            <TableHeaderColumn dataField='horsename' dataSort>Horsename</TableHeaderColumn>
            <TableHeaderColumn dataField='eventtier'>EventTier</TableHeaderColumn>
          </BootstrapTable>

          <h3>Tier 2 Eventers</h3>
          <h4>Pick 4</h4>
          <BootstrapTable data={EvtTier2} hover selectRow={selectRowProp} bodyStyle={{ background: '#f4a442' }} ref='table2'>
            <TableHeaderColumn isKey dataField='pk_id_competitor' hidden>compId</TableHeaderColumn>
            <TableHeaderColumn dataField='pic' dataFormat={imageFormatter}>pic</TableHeaderColumn>
            <TableHeaderColumn dataField='ridername' dataSort>Ridername</TableHeaderColumn>
            <TableHeaderColumn dataField='horsename' dataSort>Horsename</TableHeaderColumn>
            <TableHeaderColumn dataField='eventtier'>EventTier</TableHeaderColumn>
          </BootstrapTable>

          <h3>Tier 3 Eventers</h3>
          <h4>Pick 2</h4>
          <BootstrapTable data={EvtTier3} hover selectRow={selectRowProp} bodyStyle={{ background: '#f4a442' }} ref='table3'>
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

