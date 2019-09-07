import React, { Component } from 'react'
import PersonsList from './PersonsList'
import Error from './Error'
import CurrentPerson from './CurrentPerson'

class ListInfo extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }

  render() {
    if (this.props.current.name === undefined && this.props.current.error === "" ) {
      return (
        <div>
          <PersonsList list={this.props.info} />
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
