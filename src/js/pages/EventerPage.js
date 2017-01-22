"use strict";
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import DocumentTitle from 'react-document-title';
import { Col, Image, Panel, Grid, Row, Button, Form, Schema, Property } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//import { images } from 'js/img';

var Evt1
var Evt2
var Evt3

var getTier1 = fetch(`/eventers/` + 1)
  .then(function (response) {
    return response.json();
  }).then(function (json) {
    console.log('REACT::EVENTERHOME::CDM::PARSEDJSON', JSON.stringify(json));
    console.log('REACT::EVENTERHOME::CDM::PARSEDJSON', { options: json });
    Evt1 = json;
    console.log('REACT::EVENTERHOME::CDM::TIER1-', Evt1);
    //  console.log('REACT::EVENTERHOME::CDM::OPTIONS-', options);
    return { options: json };
  }).catch(function (ex) {
    console.log('REACT::EVENTERHOME::ERROR GETTTING TIER1-', ex)
  })

var getTier1 = fetch(`/eventers/` + 2)
  .then(function (response) {
    return response.json();
  }).then(function (json) {
    console.log('REACT::EVENTERHOME::CDM::PARSEDJSON', JSON.stringify(json));
    console.log('REACT::EVENTERHOME::CDM::PARSEDJSON', { options: json });
    Evt2 = json;
    console.log('REACT::EVENTERHOME::CDM::TIER1-', Evt1);
    //  console.log('REACT::EVENTERHOME::CDM::OPTIONS-', options);
    return { options: json };
  }).catch(function (ex) {
    console.log('REACT::EVENTERHOME::ERROR GETTTING TIER1-', ex)
  })

var getTier1 = fetch(`/eventers/` + 3)
  .then(function (response) {
    return response.json();
  }).then(function (json) {
    console.log('REACT::EVENTERHOME::CDM::PARSEDJSON', JSON.stringify(json));
    console.log('REACT::EVENTERHOME::CDM::PARSEDJSON', { options: json });
    Evt3 = json;
    console.log('REACT::EVENTERHOME::CDM::TIER1-', Evt1);
    //  console.log('REACT::EVENTERHOME::CDM::OPTIONS-', options);
    return { options: json };
  }).catch(function (ex) {
    console.log('REACT::EVENTERHOME::ERROR GETTTING TIER1-', ex)
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
    this.state = { selected: [], value: '' };
   // this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.options = {
      defaultSortName: 'ridername',  // default sort column name
      defaultSortOrder: 'desc'  // default sort order
    };
  }

  handleChange(event) {
    this.setState({ value: event.target.value },() => {
        console.log("SUBMIT HANDLE CHANGE::", this.state.value);
      });

  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }


  // componentWillMount() { }

  // componentDidMount() { }

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
          </ol>
        </div>

        <Grid>
          <Row>
            <div>{this.state.selected.map((selected, index) => (
              <Col sm={2} md={2} key={index}>{selected.ridername}<img src={require('../img/' + selected.pic)} /><p>{selected.horsename}</p></Col>
            ))}</div>
          </Row>

          <Row>

            <form onSubmit={this.handleSubmit}>
              <label>
                <h3>Team Name  </h3>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              &nbsp;&nbsp;&nbsp;<input type="submit" value="Submit" className="btn btn-warning"/>
            </form>

          </Row>
        </Grid>


        <h3>Tier 1 Eventers</h3>
        <h4>Pick 2</h4>
        <BootstrapTable data={Evt1} hover selectRow={selectRowProp} bodyStyle={{ background: '#f4a442' }} ref='table1'>
          <TableHeaderColumn isKey dataField='pk_id_competitor' hidden>compId</TableHeaderColumn>
          <TableHeaderColumn dataField='pic' dataFormat={imageFormatter}>pic</TableHeaderColumn>
          <TableHeaderColumn dataField='ridername' dataSort>Ridername</TableHeaderColumn>
          <TableHeaderColumn dataField='horsename' dataSort>Horsename</TableHeaderColumn>
          <TableHeaderColumn dataField='eventtier'>EventTier</TableHeaderColumn>
        </BootstrapTable>

        <h3>Tier 2 Eventers</h3>
        <h4>Pick 4</h4>
        <BootstrapTable data={Evt2} hover selectRow={selectRowProp} bodyStyle={{ background: '#f4a442' }} ref='table2'>
          <TableHeaderColumn isKey dataField='pk_id_competitor' hidden>compId</TableHeaderColumn>
          <TableHeaderColumn dataField='pic' dataFormat={imageFormatter}>pic</TableHeaderColumn>
          <TableHeaderColumn dataField='ridername' dataSort>Ridername</TableHeaderColumn>
          <TableHeaderColumn dataField='horsename' dataSort>Horsename</TableHeaderColumn>
          <TableHeaderColumn dataField='eventtier'>EventTier</TableHeaderColumn>
        </BootstrapTable>

        <h3>Tier 3 Eventers</h3>
        <h4>Pick 2</h4>
        <BootstrapTable data={Evt3} hover selectRow={selectRowProp} bodyStyle={{ background: '#f4a442' }} ref='table3'>
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

// var MyForm = React.createClass({

//   render: function () {

//     // render Form as <div /> and transfer all props to it
//     var form = this.transferPropsTo(
//       <Form ref="form" component={React.DOM.div} />
//     )

//     // return <form /> component with rendered form and a submit button
//     return (
//       <form onSubmit={this.onSubmit} className="MyForm">
//         {form}
//         <button type="submit" bsStyle="warning">Submit</button>
//       </form>
//     )
//   },

//   onSubmit: function (e) {
//     e.preventDefault()

//     // check if form is valid
//     var validation = this.refs.form.value().validation
//     if (ReactForms.validation.isFailure(validation)) {
//       console.log('invalid form')
//       return
//     }

//     alert('form submitted!')
//   }
// })