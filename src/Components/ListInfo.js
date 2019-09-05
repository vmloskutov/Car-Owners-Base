import React, { Component } from 'react'
import axios from "axios";

class ListInfo extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: ''
    }
  }

  render() {
    return (
      <div>
        {this.props.id}
      </div>
    )
  }
}

export default ListInfo;
