import React, { Component } from 'react'
import axios from "axios"
import FilteringList from './FilteringList'
import FilteringListModels from './FilteringListModels'

class Catalog extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
    this.getData()
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
    console.log(this.state.selectedBrand + "-" + this.state.selectedModel);
  }

  render() {
      return (
        <div className="">
          Выберите Автомобиль
          <div className="row">
            <div className="col-3 ml-3 mt-3">
                {this.state.data ? <FilteringList className="brand-item pl-2" content={this.state.data} selected={this.modelWindowRender}/> : null}
            </div>
            <div className="models-window  col-3 ml-3 mt-3">
                {this.state.models ?  <FilteringListModels className="brand-item pl-2" content={this.state.models} selected={this.addCarButton}/> : null}
            </div>
            <button type="button" className="add-car btn btn-sm btn-primary btn-circle" onClick={this.addCarToUser}><i className="fa fa-plus"></i></button>
          </div>
        </div>)
  }
}

export default Catalog;
