import React, { Component } from 'react'
import axios from "axios";


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
        console.log(response.data);
        this.setState({...response.data})
        console.log(this.state);
      })
  }

  render() {
      return (
        <div>
          <div>
              {this.state.name}
          </div>
          <div>
              <i className="fas fa-gift"></i> {this.state.birthdate}
          </div>
        </div>
    )
  }
}

export default Person;
