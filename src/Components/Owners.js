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
  handleId = (child) => {
        this.setState({...child});
    }

  render() {
    return (
      <div>
        <SearchBar onSearchBar={this.handleId}/>
        <div className="list-info">
          <ListInfo info={this.state} />
        </div>
      </div>
    )
  }
}

export default Owners;
