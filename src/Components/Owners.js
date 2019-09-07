import React, { Component } from 'react'
import SearchBar from './SearchBar'
import ListInfo from './ListInfo'
import axios from "axios"

class Owners extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: []
    }
  }

  handleId = (child) => {
        this.setState({...child});
        //document.querySelector(".list-info").style.display = "block";
    }

    componentDidMount() {
            this.getData()
        }

        getData(){
        //  const self = this
          axios
          .get('http://172.30.215.172:8081/RESTfulWebApp/getpersonlist')
          .then(response => {
            this.setState({ data : response.data })
          })
        }

  render() {
    return (
      <div>
        <SearchBar onSearchBar={this.handleId}/>
        <div className="list-info">
          {this.state.data ? <ListInfo info={this.state.data} /> : <ListInfo /> }
        </div>
      </div>
    )
  }
}

export default Owners;
