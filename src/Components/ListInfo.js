import React, { Component } from 'react'
import axios from "axios"
import PersonsList from './PersonsList'



class ListInfo extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: this.props.info.ids,
      persons: this.props.info
    }
    console.log(this.state.ids);
  }


  render() {
    if (this.props.info.name === undefined) {
      return (
        <div>
          <PersonsList list={this.state.ids} />
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
