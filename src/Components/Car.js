import React, { Component } from 'react'

class Error extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }


  render() {
      return (
        <div>
          {this.props.info.model}
        </div>
    )
  }
}

export default Error;
