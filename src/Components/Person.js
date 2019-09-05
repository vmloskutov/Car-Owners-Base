import React, { Component } from 'react'
import axios from "axios";


class Persons extends Component {
  constructor (props) {
    super(props);
    this.state = {
      personId : this.props.personId,
      personInfo : null
    }
  }

  componentDidMount() {
    axios
      .get('http://172.30.215.172:8081/RESTfulWebApp/personwithcars', {
        params: {
          personid: this.state.personId
        }
      })
      .then(response => {
        this.setState({perosonInfo: response.data})
        console.log(this.state.personInfo);
      })
  }

  render() {

      return (
        <div>
          <div>
              {this.state.personInfo.name}
          </div>
          <div>
              <i className="fas fa-gift"></i> {this.state.personInfo.birthdate}
          </div>
        </div>
    )
  }
}

export default Persons;
