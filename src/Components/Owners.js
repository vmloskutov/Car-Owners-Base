import React, { Component } from 'react'
import SearchBar from './SearchBar'
import ListInfo from './ListInfo'
class Owners extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: ''
    }
  }
  handleId = (childId) => {
        this.setState({id: childId});
    }

  render() {
    return (
      <div>
        <SearchBar onSearchBar={this.handleId}/>
        <ListInfo id={this.state.id} />
      </div>
    )
  }
}

export default Owners;
