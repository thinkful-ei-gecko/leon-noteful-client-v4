import React, { Component } from 'react';

export default class Main extends Component {
  render() {
    return (
      <ul className="main">
        {this.props.children}
      </ul>
    )
  }
}
