import React, { Component } from 'react'

class List extends Component {
  constructor (props) {
    super(props);
    this.state = {
        ids: this.props.info
    }
  }


  render() {
    return(
      <div>
        {this.props.info}
      </div>

    )
  }
}

export default List;
