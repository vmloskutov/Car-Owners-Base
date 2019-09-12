import React, { Component } from 'react'
import PersonsList from './PersonsList'
import Error from './Error'
import CurrentPerson from './CurrentPerson'
import axios from "axios"

class ListInfo extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }

  selectedId = (id) => {
    this.setState({...id})
  }




  render() {
    console.log(this.state);
    if (this.state.id !== undefined) {
      console.log(1);
      return(
        <div>
          <CurrentPerson data={this.state} />
        </div>
      )
    }
    console.log(this.state.selectedId);
    if ((this.props.current.name === undefined || this.props.current.name === " ") && this.props.current.error === "" ) {
      return (
        <div>
          <PersonsList list={this.props.info} selectedTable={this.selectedId} />
        </div>
      )
    } else {
      return (
        <div>
          {this.props.current.error ? <Error error={this.props.current.error} /> : <CurrentPerson data={this.props.current} />}
        </div>
      )
    }

  }
}

export default ListInfo;
