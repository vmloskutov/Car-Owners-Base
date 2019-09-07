import React, { Component } from 'react'
import axios from "axios"
import PersonsList from './PersonsList'



class ListInfo extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }


  render() {
    console.log(this.props);
    if (this.props.current.name === undefined) {

      return (
        <div>
          <PersonsList list={this.props.info} />
        </div>
      )
    } else return (

      <div className="row">
      {console.log("Программа зашла отрисовку")}
        <div className="list col-6">
          <div>
              {this.props.current.name}
          </div>
          <div>
              <i className="fas fa-gift"></i> {this.props.current.birthdate}
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
