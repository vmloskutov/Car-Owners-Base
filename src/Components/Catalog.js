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
        selectedBrand: {value: "Выберите марку",
        label: "Выберите марку"},
        selectedModel: {value: "Выберите модель",
        label: "Выберите модель"}
    }
  }

  okCar = (e) => {
    e.preventDefault();
    console.log(this.state.selectedOption);
    if (this.state.selectedOption) {
      let newData = {
        model: this.state.selectedBrand.value + "-" + this.state.selectedModel.value,
        horsepower : "100",
        ownerId : this.state.selectedOption.label
      }
      axios({
      method: 'POST',
      url: 'http://172.30.215.172:8081/RESTfulWebApp/car',
      data: newData
     });
     document.querySelector(".add-car-form").style.display = "none"
     document.querySelector(".blur").style.opacity = 1
     document.querySelector(".success").style.display = "block"
     this.setState({selectedBrand: {value: "Выберите марку",
     label: "Выберите марку"},
     selectedModel: {value: "Выберите модель",
     label: "Выберите модель"}})
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
  handleChangeBrand = selectedBrand => {
    let models = []
    this.setState({ selectedBrand });
    console.log(`Option selected:`, selectedBrand);
    this.state.data.forEach((model) => {
      if (selectedBrand.value === model.brand) {
        model.models.forEach((item) => {
          let temp = {
            value: item,
            label: item
          }
          models.push(temp)
        })
      }
    })
    this.setState({models: models})
    console.log(models, 1);
    document.querySelector(".models-window").style.display = "block"

  };

  handleChangeModel = selectedModel => {
    let models = []
    this.setState({ selectedModel });
    console.log(`Option selected:`, selectedModel);
    document.querySelector(".add-car").style.display = "block"

  }

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
    document.querySelector(".blur").style.opacity = 1
  }

  getData(){
    let brands = [];
    axios
    .get('http://172.30.215.172:8081/RESTfulWebApp/cars')
    .then(response => {
      this.setState({data: response.data})
      response.data.forEach((item) => {
                let brand = {
                  value: item.brand,
                  label: item.brand
                }
                brands.push(brand)
      })
      this.setState({brands : brands})
    })
  }

  modelWindowRender = (child) => {
    this.setState({selectedBrand: child})
    let models = this.state.data.filter(item => item.brand === child).map(item => item.models)
    document.querySelector(".models-window").style.display = "block"
    this.setState({models: models})
  }

  addCarToUser = () => {
    document.querySelector(".blur").style.opacity = 0.3
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
          <div className="blur">
            <div className="section-label mt-3">Каталог автомобилей</div>
            <div className="row">
              <div className="col-3 pl-0 mt-3">
                <div className="ml-3">Выберите марку</div>
                {
                  console.log(this.state.brands)
                }
                {this.state.brands ? <Select
                  className="select-id mt-3"
                  value={this.state.selectedBrand}
                  onChange={this.handleChangeBrand}
                  options={this.state.brands}
                  placeholder="Выберите марку"
                  /> : null}
                  {/*{this.state.data ? <FilteringList className="brand-item pl-2" content={this.state.data} selected={this.modelWindowRender}/> : null}*/}
              </div>
              <div className="models-window  col-3 ml-3 mt-3">
                <div className="ml-3">Выберите модель</div>
                {this.state.models ? <Select
                  className="select-id mt-3"
                  value={this.state.selectedModel}
                  onChange={this.handleChangeModel}
                  options={this.state.models}
                  placeholder="Выберите модель"
                  /> : null}
                {/*  {this.state.models ?  <FilteringListModels className="brand-item pl-2" content={this.state.models} selected={this.addCarButton}/> : null}*/}
              </div>
              <button type="button" className="add-car btn btn-sm btn-primary btn-circle" onClick={this.addCarToUser}><i className="fa fa-plus"></i></button>
            </div>
          </div>
          <div className="add-car-form">
            <form>
             <div className="addform container">
               <div className="row d-flex justify-content-between">
                 <label className="addlabel"> Добавление автомобиля в автопарк </label>
                 <button type="button" onClick={this.closeUser} className="close"><svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M1 1L29.5 29.5M1 29.5L29.5 1" stroke="#CFCFCF" strokeWidth="2"/>
                 </svg></button>
               </div>
               <div>
                <Select
                  className="select-id mt-3"
                  value={this.state.selectedOption}
                  onChange={this.handleChange}
                  options={options}
                  placeholder="ID пользователя"
                  />
                  <div className="add-car-error ml-3">Выберите ID пользователя</div>
                    <div className="mt-3 ml-3 ">Последние добавленные:</div>
                  <div className="mt-3 ml-3 last-persons">
                    {this.state.ids ? this.state.ids.slice(0,3).map((person, index) => {
                      return(
                        <div key={index} className="last-person pl-3" onClick={this.selectFromTheLast}>
                          {person}
                        </div>
                      )
                    }) : null}
                  </div>
                  <label className="selected-car mt-3 ml-3">{this.state.selectedBrand.value + " - " + this.state.selectedModel.value}</label>
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
