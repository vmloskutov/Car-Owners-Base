import React, { Component } from 'react'
import axios from "axios";


class Person extends Component {
  constructor (props) {
    super(props);
    this.state = {
      personInfo : null
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
        this.setState({perosonInfo: response.data})
        console.log(this.state.personInfo);
      })
  }

  render() {
      return (
        <div>
          <div>
              {this.state.personInfo}
          </div>
          <div>
              <i className="fas fa-gift"></i> {this.state.personInfo}
          </div>
        </div>
    )
  }
}

export default Person;
