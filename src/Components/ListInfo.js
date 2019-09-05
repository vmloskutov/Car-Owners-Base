import React, { Component } from 'react'


class ListInfo extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: ""
    }
  }


  render() {
    return (
      <div className="list">
      {console.log(this.props.info)}
          {this.props.info.name}
      </div>
    )
  }
}

export default ListInfo;
