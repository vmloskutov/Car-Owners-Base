import React, { Component } from 'react'
import Car from './Car'
import Card from 'react-bootstrap/Card';


class Cars extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }


  render() {
      return (
        <div>
          <Card bg="light">
            <Card.Header>Автопарк</Card.Header>
            <Card.Body>
              <Card.Text>
                  {this.props.cars.map((car, index) => {return(<li key={index}><Car info={car} /></li>)})}
              </Card.Text>
            </Card.Body>
          </Card>
      </div>
    )
  }
}

export default Cars;
