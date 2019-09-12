import React, { Component } from 'react'
import Error from './Error'
import Cars from './Cars'
import Card from 'react-bootstrap/Card';


class CurrentPerson extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }

  render() {
      return (
        <div className="row">
          <div className="list col-6">
            <Card bg="light">
              <Card.Header>{this.props.data.name}</Card.Header>
              <Card.Body>
                <Card.Text>
                    <i className="fas fa-gift"></i> {this.props.data.birthdate}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <br />
          <div className="autopark col-6">
              {(this.props.data.cars.length !== 0) ? <Cars cars={this.props.data.cars} /> : <Error error="-" />}
          </div>
        </div>
    )
  }
}

export default CurrentPerson;
