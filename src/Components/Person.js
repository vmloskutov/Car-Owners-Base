import React, { Component } from 'react'
import axios from "axios";
import Card from 'react-bootstrap/Card';

class Person extends Component {
  constructor (props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    axios
      .get('http://172.30.215.172:8081/RESTfulWebApp/personwithcars', {
        params: {
          personid: this.props.personId
        }
      })
      .then(response => {
        this.setState({...response.data})
      })
  }

  render() {
      return (
        <div>
          <Card bg="light" style={{ width: '18rem', cursor: "pointer" }} >
            <Card.Header>{this.state.name}</Card.Header>
            <Card.Body>
              <Card.Text>
                  <i className="fas fa-gift"></i> {this.state.birthdate}
              </Card.Text>
            </Card.Body>
          </Card>
        <br />
        </div>
    )
  }
}

export default Person;
