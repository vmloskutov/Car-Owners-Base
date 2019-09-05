import React, { Component } from 'react'
import axios from "axios"
import PersonsList from './PersonsList'



class ListInfo extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: "",
      persons: this.props.persons
    }
  }

  // componentDidMount() {
  //   axios
  //     .get('http://172.30.215.172:8081/RESTfulWebApp/getpersonlist')
  //     .then(response => {
  //       this.setState({persons: response.data});
  //       console.log(this.state.persons);
  //     })
  // }

  render() {
    if (this.props.info.name === undefined) {
      return (
        <div>
          <PersonsList list={this.state.persons} />
        </div>
      )
    } else return (
      <div className="row">
        <div className="list col-6">
          <div>
              {this.props.info.name}
          </div>
          <div>
              <i className="fas fa-gift"></i> {this.props.info.birthdate}
          </div>
        </div>
        <div className="autopark col-6">
          Автопарк

        </div>
      </div>
    )
  }
}

export default ListInfo;
