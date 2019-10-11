import React, { Component } from 'react';

export default class Sidebar extends Component {
  render() {
    return (
      <ul className="sidebar">
        {this.props.children}
      </ul>
    )
  }
}
