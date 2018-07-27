import React, { Component } from "react";
import axios from "axios";


export default class FormRes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    console.log("db data has mounted 'bottom up' ");
    var _this = this;
    axios.get('/api/todos')
    .then(function(res){
      _this.setState({
        items: res.data
      });
    })
    .catch(function(e) {
      console.log("ERROR ", e);
    })
  }

  getData(){
    console.log("db data has mounted 'bottom up' ");
    var _this = this;
    axios.get('/api/todos')
    .then(function(res){
      _this.setState({
        items: res.data
      });
    })
    .catch(function(e) {
      console.log("ERROR ", e);
    })
  }

  render() {

    console.log("rending form res");
    let renderItems = this.state.items.map((item, i) => {
      return <li key={i}>{item}</li>
    });

    return (
      <div>
        <button onClick={this.getData} > Get data from server </button>
        <ul className="FormRes">
          <li> Results: </li>
          {renderItems}
        </ul>
      </div>
    );
  }
}
