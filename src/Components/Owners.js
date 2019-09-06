import React, { Component } from 'react'
import SearchBar from './SearchBar'
import ListInfo from './ListInfo'
import axios from "axios"

class Owners extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }
  handleId = (child) => {
        this.setState({...child});
        //document.querySelector(".list-info").style.display = "block";
    }

    getOwnersIds() {
            axios
                .get('http://172.30.215.172:8081/RESTfulWebApp/getpersonlist')
                .then(response => {
                    let firstIdToShow = response.data.length - 3
                    if (firstIdToShow >= 0) {
                        let last3Ids = response.data.splice(firstIdToShow, firstIdToShow + 3)
                        this.setState({ ...last3Ids })
                        // console.log(this.state);
                    } else {
                        let last3Ids = response.data
                        this.setState({ ...last3Ids })
                    }
                    console.log(this.state);
                })
        }

  componentWillMount() {
    this.getOwnersIds()
      }

  personlist = () => {
    axios
    .get('http://172.30.215.172:8081/RESTfulWebApp/getpersonlist')
    .then(response => {
      console.log(response.data);
      this.setState({ids: response.data})
      console.log(this.state);
    })
  }

  render() {
    return (
      <div>
        <SearchBar onSearchBar={this.handleId}/>
        // <div className="list-info">
        //   <ListInfo info={this.state} />
        // </div>
      </div>
    )
  }
}

export default Owners;
