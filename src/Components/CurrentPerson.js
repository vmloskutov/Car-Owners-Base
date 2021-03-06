import React, { Component } from 'react'
import Error from './Error'
import Cars from './Cars'
import Card from 'react-bootstrap/Card';
var moment = require('moment');



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
                    Дата рождения: {this.props.data.birthdate}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <br />
          <div className="autopark col-6">
              {(this.props.data.cars.length !== 0) ? <Cars cars={this.props.data.cars} /> : (moment().diff(this.props.data.birthdate, 'years') < 18)? <Error error="Пользователю еще нет 18 лет" /> :<Error error="У этого пользователя нет автомобилей" />}
          </div>
        </div>
    )
  }
}

export default CurrentPerson;
