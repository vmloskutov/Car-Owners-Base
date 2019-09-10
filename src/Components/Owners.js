import React, { Component } from 'react'
import SearchBar from './SearchBar'
import ListInfo from './ListInfo'
import axios from "axios"

class Owners extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: [],
      error: ""
    }
  }

  handleId = (child) => {
      if (typeof child === "string") {
        if (child === "") {
          this.setState({name : undefined})
        }
        this.setState({error: child});
      } else {
        this.setState({error: ""});
        this.setState({...child});
      }
    }

    componentDidMount() {
            this.getData()
        }

        getData(){
          axios
          .get('http://172.30.215.172:8081/RESTfulWebApp/getpersonlist')
          .then(response => {
            this.setState({ data : response.data.reverse() })
          })
        }

  render() {
    return (
      <div>
        <SearchBar onSearchBar={this.handleId}/>
        <div className="list-info">
          {this.state.data ? <ListInfo info={this.state.data} current={this.state} /> : <ListInfo /> }
        </div>
      </div>
    )
  }
}

export default Owners;
