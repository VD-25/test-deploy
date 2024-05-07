/*
notes:
to create app: npx create-react-app appname
go to public, index.html, remove everything from head and only div id root in body
delete favico
go to index.js and delete strict mode and import index.css and comments
delete index.css
delete everything from app.js and start from scratch
*/

import React, { Component } from "react";
import "./App.css"
import Child1 from "./Child1"
import Child2 from "./Child2"
import * as d3 from 'd3'
import tips from "./tips.csv"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {data:[]} //empty to begin with
  }
  componentDidMount(){
    //function to read csv file
    var self=this //now self has reference of class
    //because this inside the d3 will not refer to class it will refer to function(csv_data)
    d3.csv(tips, function(d){
      return {
        //must first convert to float because csv currently string
        tip:parseFloat(d.tip), //must match exactly how column is spelled in csv
        total_bill:parseFloat(d.total_bill), 
        day:d.day
      }
    }).then(function(csv_data){
      self.setState({data:csv_data})
      //console.log(csv_data)
      //changed from d3.csv(tips) to this
    })
    .catch(function(err){
      console.log(err)
    })
  }
  render() {
    return <div className="parent">
      <div className="child1"><Child1 data1={this.state.data}></Child1></div>
      <div className="child2"><Child2 data2={this.state.data}></Child2></div>
    </div> //return html component
    //pass data using props, data1 is props in Child1
  } //called when component mounted and whenever state changed
}

export default App
//when something imported in another file, must be exported here