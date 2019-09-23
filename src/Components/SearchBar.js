import React, { Component } from 'react'
import axios from "axios";


class SearchPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: '',
      startDate: null
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
    if (value === "") {
      this.props.onSearchBar(``)
    }
    document.querySelector(".last-label").style.display = "block";
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
          this.props.onSearchBar(``)
        } else {
          this.props.onSearchBar(`Пользователь с ID = ${this.state.id} не найден`)
        }
      });
  }

  addUser() {
    document.querySelector(".addUser").style.display = "block"
    document.querySelector(".blur").style.opacity = 0.3
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
             <div className="d-flex"><div className="addUser-link" onClick={this.addUser}>Добавить пользователя</div> <button type="button" className="btn btn-sm btn-circle" onClick={this.addUser}><i className="fa fa-plus"></i></button></div>
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
