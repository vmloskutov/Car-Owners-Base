import React, { Component } from 'react'

class ErrorId extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }


  render() {
      return (
        <div>
          {this.props.error}
        </div>
    )
  }
}

export default ErrorId;
