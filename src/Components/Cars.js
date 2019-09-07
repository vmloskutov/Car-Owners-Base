import React, { Component } from 'react'
import Car from './Car'

class Cars extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }


  render() {
      return (
        <ul>
          {this.props.cars.map((car, index) => {return(<li key={index}><Car info={car} /></li>)})}
        </ul>
    )
  }
}

export default Cars;
