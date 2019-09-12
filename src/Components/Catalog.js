import React, { Component } from 'react'
import axios from "axios"

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

  modelWindowRender = (e) => {
    let models = this.state.data.filter(item => item.brand === e.target.innerHTML).map(item => item.models)
    console.log(models);
    document.querySelector(".models-window").style.display = "block"
    this.setState({models: models})
  }

  render() {
      return (
        <div className="">
          Выберите Автомобиль
          <div className="row">
            <div className="brands-window col-3 mt-3 ml-3 px-0">
              {this.state.data ? this.state.data.map((brand, index) => {
                return(
                  <div onClick={this.modelWindowRender} className="brand-item pl-2" key={index}>
                    {brand.brand}
                  </div>
                )
              }) : null}
            </div>
            <div className="models-window col-3 mt-3 ml-5 px-0">
              {console.log(this.state.models)}
                {this.state.models ? this.state.models[0].map((model, index) => {
                return(
                  <div className="model-item pl-2" key={index}>
                    {model}
                  </div>
                )
              }): null}
            </div>
          </div>
        </div>)
  }
}

export default Catalog;
