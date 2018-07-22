import React, { Component } from 'react';

class Form extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault(); // what does this do?
    const data = new FormData(event.target);
    
    fetch('/api/todos', {
      method: 'POST',
      body: data,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="id">Enter ID</label>
        <input id="id" name="id" type="text" />
        <button>Send data!</button>
      </form>
    );
  }
}

export default Form;