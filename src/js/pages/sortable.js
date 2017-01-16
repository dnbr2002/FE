"use strict";
import ReactDOM from 'react-dom';
import React from 'react';

//var colors = ["Red","Green","Blue","Yellow","Black","White","Orange"];
var n = 0;
function increment(){
  n++;
  return n;
}

var sortable = React.createClass({
  getInitialState: function() {
    console.log("SORT1::",this.props.data + "  " + increment(n));
    return {data: this.props.data};
  },
  render: function() {
    console.log("SORT2::",this.props.data + "  " + increment(n));
    return <ul>
      {this.props.data.map(function(item,i) {
        return <li key={i}>{item}</li>;
      })}
    </ul>
  }
});

export default sortable;