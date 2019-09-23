import React, { Component } from 'react'
import SearchBar from './SearchBar'
import ListInfo from './ListInfo'
import axios from "axios"
import DatePicker from "react-datepicker";
var moment = require('moment');

class Owners extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: [],
      error: "",
      url: null
    }

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
         if (!input.value) {
           validDate = false
           valid = false
         }
         var now = moment().format("YYYY-MM-DD");
         let checkDate = moment(input.value, "DD.MM.YYYY").format("YYYY-MM-DD")
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
      document.querySelector(".blur").style.opacity = 1
      document.querySelector(".addUser").style.display = "none"
    } else {
      e.preventDefault()
      alert("Форма заполнена неверно")
    }

   }

   closeUser() {
     document.querySelector(".blur").style.opacity = 1
     document.querySelector(".addUser").style.display = "none"
     document.querySelectorAll(".inpt").forEach((input) => {
       input.value = ""
       input.style.outline = "none";
     });
   }

   handleChange = (date, e) => {

     this.setState({
       startDate: date
     });
     var now = moment().format("YYYY-MM-DD");
     let checkDate = moment(date).format("YYYY-MM-DD")
     if (moment(checkDate).isAfter(now)) {
       document.querySelector(".date-error").style.display = "block"
       document.getElementById("bd").style.outline = "2px solid red"
     } else {
       document.querySelector(".date-error").style.display = "none"
       document.getElementById("bd").style.outline = "2px solid green"
     }
   };

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
    // if (document.querySelector(".addUser")) {
    //   if (document.querySelector(".addUser").style.display === "block") {
    //     this.props.history.push("/add")
    //   }
    // }
    return (

      <div>
        <div className="blur">
          <div className="section-label mt-3">Автовладельцы</div>
          <SearchBar className="searchbar" onSearchBar={this.handleId} />
          <div className="last-label">Последние добавленные пользователи:</div>
          <div className="list-info">
            {this.state.data ? <ListInfo info={this.state.data} current={this.state} /> : <ListInfo /> }
          </div>
        </div>
        <div className="addUser">
          <form className="">
           <div className="container addform">
             <div className="row d-flex justify-content-between">
               <label className="addlabel"> Добавление автовладельца</label>

               <button type="button" onClick={this.closeUser} className="close"><svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M1 1L29.5 29.5M1 29.5L29.5 1" stroke="#CFCFCF" strokeWidth="2"/>
               </svg></button>
             </div>
             <div className="row ml-1 mb-0">
               <label className="inplbl ml-3"> Имя автовладельца</label>
             </div>
             <div className="row ml-3">
               <input className="inpt" onChange={this.nameValidation} type="text" placeholder="ФИО" name="uname" />
             </div>
             <div className="name-error ml-4">В имени могут присутствовать только буквы</div>
             <div className="row ml-1">
               <label className="inplbl ml-3"> День рождения </label>
             </div>
             <div className="row ml-3">
             <DatePicker className="datepicker inpt"
                 id="bd"
                 name="bd"
                 placeholderText="дд.мм.гггг"
                 dateFormat="dd.MM.yyyy"
                 selected={this.state.startDate}
                 onChange={this.handleChange}
               />
               <div className="date-error ml-4">Дата должна быть меньше сегодняшней</div>
             </div>
           </div>
           <div className="container buttons">
             <button onClick={this.closeUser} type="button" className="cancelbtn">Отмена</button>
             <button onClick={this.okUser} type="submit" className="okbtn" onSubmit={this.formSubmit}>Добавить</button>
           </div>
         </form>
       </div>
      </div>
    )
  }
}

export default Owners;
