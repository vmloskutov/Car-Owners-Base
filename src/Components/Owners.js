import React, { Component } from 'react'
import SearchBar from './SearchBar'
import ListInfo from './ListInfo'
import axios from "axios"

class Owners extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: '',
      persons: ''
    }
  }
  handleId = (child) => {
        this.setState({...child});
        //document.querySelector(".list-info").style.display = "block";
    }

  personlist = () => {
    axios
    .get('http://172.30.215.172:8081/RESTfulWebApp/getpersonlist')
    .then(response => {
      let temp;
      temp =  response.data;
      console.log(temp);
      this.setState({ persons: temp })
      console.log(this.state);
    })
  }

  render() {
    this.personlist();
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
