import React, { Component } from 'react'
import axios from "axios";
import InputMask from 'react-input-mask';
import DatePicker from "react-datepicker";
var moment = require('moment');

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
  }

  handleChange = (date, e) => {

    this.setState({
      startDate: date
    });
    let valid = true
    var now = moment().format("YYYY-MM-DD");
    let checkDate = moment(date).format("YYYY-MM-DD")
    if (moment(checkDate).isAfter(now)) {
      valid = false
      document.querySelector(".date-error").style.display = "block"
      document.getElementById("bd").style.outline = "2px solid red"
    } else {
      document.querySelector(".date-error").style.display = "none"
      document.getElementById("bd").style.outline = "2px solid green"
    }
  };

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

  nameValidation(e) {
    let valid = /^[a-zA-Z ]+$/.test(e.target.value);
    if (!valid) {
      document.querySelector(".name-error").style.display = "block"
      e.target.style.outline = "2px solid red"
    } else {
      document.querySelector(".name-error").style.display = "none"
      e.target.style.outline = "2px solid green"

    }
  }

   okUser(e) {
     let valid = false;
     let newData = {}
     document.querySelectorAll(".inpt").forEach((input) => {
       if (input.name === "uname") {
         valid = /^[a-zA-Z ]+$/.test(input.value);
         if (valid) {
           newData.name = input.value
         } else {
            input.value = ""
         }

       }
       if (input.name === "bd") {
         let validDate = true
         var now = moment().format("YYYY-MM-DD");
         let checkDate = moment(input.value, "DD.MM.YYYY").format("YYYY-MM-DD")
         console.log(now, checkDate,moment(checkDate).isAfter(now) );
         if (moment(checkDate).isAfter(now)) {
           validDate = false
           input.value = ""
           valid = false
         }
         if (validDate) {
           newData.birthdate = input.value
         }
       }
     });
     if (valid) {
       document.querySelectorAll(".inpt").forEach((input) => {
         input.value = ""
       })
       axios({
       method: 'POST',
       url: 'http://172.30.215.172:8081/RESTfulWebApp/person',
       data: newData
      });
      document.querySelector(".addUser").style.display = "none"
    } else {
      e.preventDefault()
      alert("Форма заполнена неверно")
    }

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
              <input className="inpt" onChange={this.nameValidation} type="text" placeholder="Имя" name="uname" />
            </div>
            <div className="name-error ml-4">В имени могут присутствовать только буквы</div>
            <div className="row ml-1">
              <label className="inplbl ml-3"> День рождения </label>
            </div>
            <div className="row ml-3">
            <DatePicker className="datepicker inpt"
                id="bd"
                name="bd"
                placeholderText="День рождения"
                dateFormat="dd.MM.yyyy"
                selected={this.state.startDate}
                onChange={this.handleChange}
              />
              <div className="date-error ml-4">Дата должна быть меньше сегодняшней</div>
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
