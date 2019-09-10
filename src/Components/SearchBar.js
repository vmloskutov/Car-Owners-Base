import React, { Component } from 'react'
import axios from "axios";
import InputMask from 'react-input-mask';

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
          this.props.onSearchBar(``)
        } else {
          this.props.onSearchBar(`Пользователь с ID = ${this.state.id} не найден`)
        }
      });
  }

  addUser() {
    document.querySelector(".addUser").style.display = "block"
  }

   okUser() {
     let newData = {}
     document.querySelector(".addUser").style.display = "none"
     document.querySelectorAll(".inpt").forEach((input) => {
       if (input.name === "uname") {
         newData.name = input.value
         input.value = ""
       }
       if (input.name === "bd") {
         newData.birthdate = input.value
         input.value = ""
       }
     });
     axios({
    	method: 'POST',
    	url: 'http://172.30.215.172:8081/RESTfulWebApp/person',
    	data: newData
    });
   }

   closeUser() {
     document.querySelector(".addUser").style.display = "none"
     document.querySelectorAll(".inpt").forEach((input) => {
       input.value = ""
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
             <button type="button" className="btn btn-sm btn-primary btn-circle" onClick={this.addUser}><i className="fa fa-plus"></i></button>
           </div>
           <input type="number" className="form-control"
             name="id" value={this.state.id} onChange={this.handleUserInput} placeholder="ID пользователя"/>
         </div>
       </form>
       <div className="addUser">
         <form>
          <div className="container addform">
            <div className="row">
              <label className="addlabel"> Добавление автовладельца </label>
            </div>
            <div className="row ml-1 mb-0">
              <label className="inplbl ml-3"> Имя </label>
            </div>
            <div className="row ml-3">
              <input className="inpt" type="text" placeholder="Имя" name="uname" />
            </div>
            <div className="row ml-1">
              <label className="inplbl ml-3"> День рождения </label>
            </div>
            <div className="row ml-3">
            <InputMask className="inpt" mask="99.99.9999" name="bd" placeholder="День рождения" />
            </div>
          </div>
          <div className="container buttons">
            <button onClick={this.closeUser} type="button" className="cancelbtn">Отмена</button>
            <button onClick={this.okUser} type="submit" className="okbtn" onSubmit={this.formSubmit}>Ок</button>
          </div>
        </form>
      </div>
      </div>
    );
  }
}

export default SearchPage;
