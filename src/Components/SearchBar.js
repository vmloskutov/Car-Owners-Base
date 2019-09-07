import React, { Component } from 'react'
import axios from "axios";

class SearchPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: ''
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  formSubmit = (e) => {
    e.preventDefault();
    axios
      .get('http://172.30.215.172:8081/RESTfulWebApp/personwithcars', {
        params: {
          personid: this.state.id
        }
      })
      .then(response => {
        this.setState({...response.data})
        this.props.onSearchBar(this.state);
      })
      .catch(error => {
        if (error.response.status === 400) {
          this.props.onSearchBar(`Введите ID`)
        } else {
          this.props.onSearchBar(`Пользователь с ID = ${this.state.id} не найден`)
        }
      });
  }

render() {
    const formStyle = {
         marginTop: "30px"
    }
    return (
      <div style={formStyle}>
        <form className="demoForm" onSubmit={this.formSubmit}>
         <div className="form-group">
           <div className="searchbar-button">
             <label htmlFor="id">Поиск автовладельца</label>
             <button className="btn btn-sm btn-primary btn-circle"><i className="fa fa-plus"></i></button>
           </div>
           <input type="number" className="form-control"
             name="id" value={this.state.id} onChange={this.handleUserInput} placeholder="ID пользователя"/>
         </div>
       </form>
      </div>
    );
  }
}

export default SearchPage;
