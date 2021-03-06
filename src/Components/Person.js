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

  personRender() {
    this.props.selectedInfo(this.state)
  }

  render() {
      return (
        <div>
          <Card onClick={() => {this.personRender()} } bg="light" style={{ width: '18rem', cursor: "pointer" }} >
            <Card.Header>{this.state.name}</Card.Header>
            <Card.Body>
              <Card.Text>
                  Дата рождения: {this.state.birthdate}
              </Card.Text>
            </Card.Body>
          </Card>
        <br />
        </div>
    )
  }
}

export default Person;
