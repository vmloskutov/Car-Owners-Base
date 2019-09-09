import React, { Component } from 'react'

class Car extends Component {
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

export default Car;
