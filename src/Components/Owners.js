import React, { Component } from 'react'
import SearchBar from './SearchBar'
import ListInfo from './ListInfo'
import axios from "axios"

class Owners extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: [],
      error: "",
      url: null
    }

  }

  handleId = (child) => {
      if (typeof child === "string") {
        if (child === "") {
          this.setState({name : undefined, error: ""})
        }
        this.setState({error: child});
      } else {
        this.setState({error: ""});
        this.setState({...child});
      }
      if (child.id !== undefined) {
        //window.location.pathname = `owners/${this.state.id}`
        // console.log(this.props.history);
        // console.log(this.props.match);
        //this.props.history.goBack(1)
        //console.log(this.props.match.params.id); -вот так получим инфу из url
        this.props.history.push(`${child.id}`)
      }
    }

    checkUrl = () => {
      if (this.state.url !== this.props.match.params.id) {
        if (Number.isInteger(parseInt(this.props.match.params.id))) {
          axios
            .get('http://172.30.215.172:8081/RESTfulWebApp/personwithcars', {
              params: {
                personid: this.props.match.params.id
              }
            })
            .then(response => {
              this.setState({error: ""});
              this.setState({...response.data})
            })
            .catch(error => {
              if (error.response.status === 400) {
                this.setState({name : undefined, error: ""})
              } else {
                this.setState({error:` Пользователь с ID = ${this.props.match.params.id} не найден`})
              }
            });
        }
        this.setState({url: this.props.match.params.id})
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
    this.checkUrl()
    return (
      <div>
        <SearchBar onSearchBar={this.handleId} />
        <div className="list-info">
          {this.state.data ? <ListInfo info={this.state.data} current={this.state} /> : <ListInfo /> }
        </div>
      </div>
    )
  }
}

export default Owners;
