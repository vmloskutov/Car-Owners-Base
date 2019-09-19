import React, { Component } from 'react'
import axios from "axios"
import FilteringList from './FilteringList'
import FilteringListModels from './FilteringListModels'
import Select from 'react-select'

let options = [];

class Catalog extends Component {
  constructor (props) {
    super(props);
    this.state = {
        selectedOption: null,
    }
  }

  okCar = (e) => {
    e.preventDefault();
    console.log(this.state.selectedOption);
    if (this.state.selectedOption) {
      let newData = {
        model: this.state.selectedBrand + "-" + this.state.selectedModel,
        horsepower : "100",
        ownerId : this.state.selectedOption.label
      }
      axios({
      method: 'POST',
      url: 'http://172.30.215.172:8081/RESTfulWebApp/car',
      data: newData
     });
     document.querySelector(".add-car-form").style.display = "none"
     document.querySelector(".success").style.display = "block"
     setTimeout(() => {
       document.querySelector(".success").style.display = "none"
       console.log(this.state.selectedOption);
       this.setState({selectedOption:null})
     }, 1000)

   } else {
     this.setState({selectedOption:null})
     document.querySelector(".add-car-error").style.display = "block"
   }

  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
    selectedOption ? document.querySelector(".add-car-error").style.display="none" : document.querySelector(".add-car-error").style.display="block"
  };

  componentDidMount() {
          this.getUserData()
    }

  getUserData(){
    options = []
    axios
      .get('http://172.30.215.172:8081/RESTfulWebApp/getpersonlist')
      .then(response => {
          this.setState({ ids : response.data })
          response.data.reverse().forEach(item => {
            let temp = {
              value: item,
              label: item
            }
            options.push(temp)
          })
      })
    }

  componentWillMount() {
    this.getData()
  }

  closeUser = () => {
    document.querySelector(".add-car-form").style.display = "none"
  }

  getData(){
    axios
    .get('http://172.30.215.172:8081/RESTfulWebApp/cars')
    .then(response => {
      this.setState({ data : response.data })
    })
  }

  modelWindowRender = (child) => {
    this.setState({selectedBrand: child})
    let models = this.state.data.filter(item => item.brand === child).map(item => item.models)
    document.querySelector(".models-window").style.display = "block"
    this.setState({models: models})
  }

  addCarButton = (child) => {
    this.setState({selectedModel: child.target.innerHTML })
    let posY = child.target.getBoundingClientRect().top
    document.querySelector(".add-car").style.display = "block"
    document.querySelector(".add-car").style.marginTop =posY - 120 +"px"
  }

  addCarToUser = () => {

    document.querySelector(".add-car-form").style.display = "block"
  }

  selectFromTheLast = (e) => {
    let selectedId = {
      value: e.target.innerHTML,
      label: e.target.innerHTML
    }
    document.querySelector(".add-car-error").style.display="none"
    this.setState({selectedOption: selectedId})
  }

  render() {
      return (
        <div className="">
          <div className="ml-3">Выберите Автомобиль</div>
          <div className="row">
            <div className="col-3 ml-3 mt-3">
                {this.state.data ? <FilteringList className="brand-item pl-2" content={this.state.data} selected={this.modelWindowRender}/> : null}
            </div>
            <div className="models-window  col-3 ml-3 mt-3">
                {this.state.models ?  <FilteringListModels className="brand-item pl-2" content={this.state.models} selected={this.addCarButton}/> : null}
            </div>
            <button type="button" className="add-car btn btn-sm btn-primary btn-circle" onClick={this.addCarToUser}><i className="fa fa-plus"></i></button>
          </div>
          <div className="add-car-form">
            <form>
             <div className="addform container">
               <div className="row d-flex justify-content-between">
                 <label className="addlabel"> Добавление автомобиля в автопарк пользователя </label>
                 <button type="button" onClick={this.closeUser} className="close"><i className="fas fa-times"></i></button>
               </div>
               <div>
                <Select
                  className="select-id mt-3"
                  value={this.state.selectedOption}
                  onChange={this.handleChange}
                  options={options}
                  placeholder="Поиск пользователя по ID"
                  />
                  <div className="add-car-error ml-3">Выберите ID пользователя</div>
                  <div className="mt-3 ml-3">
                  Последние добавленные:
                    {this.state.ids ? this.state.ids.slice(0,3).map((person, index) => {
                      return(
                        <div key={index} className="mt-1 last-persons pl-3" onClick={this.selectFromTheLast}>
                          {person}
                        </div>
                      )
                    }) : null}
                  </div>
                  <label className="selected-car mt-3 ml-3">{this.state.selectedBrand + " - " + this.state.selectedModel}</label>
               </div>
               <div className= "buttons align-items-end mr-3">
                <button onClick={this.closeUser} type="button" className="cancelbtn">Отмена</button>
                <button onClick={this.okCar} type="submit" className="okbtn" onSubmit={this.formSubmit}>Ок</button>
               </div>
              </div>

             </form>
         </div>
         <form>
          <div className="success container">
            Автомобиль успешно добавлен пользователю c id = {this.state.selectedOption ? this.state.selectedOption.label : null}
           </div>
          </form>
        </div>)
  }
}

export default Catalog;
