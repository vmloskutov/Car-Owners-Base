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
    let models = this.state.data.filter(item => item.brand === child).map(item => item.models)
    document.querySelector(".models-window").style.display = "block"
    this.setState({models: models})
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
                {console.log(this.state.models)}
                {this.state.models ?  <FilteringListModels className="brand-item pl-2" content={this.state.models} selected={this.modelWindowRender}/> : null}
            </div>
          </div>
        </div>)
  }
}

export default Catalog;
