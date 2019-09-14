import React, { Component } from 'react'
import axios from "axios"



class Statistics extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }

  getData = () => {
    axios
      .get('http://172.30.215.172:8081/RESTfulWebApp/statistics')
      .then(response => {
        console.log(response.data);
        let data = []
        data.push(response.data.personcount)
        data.push(response.data.carcount)
        data.push(response.data.uniquevendorcount)
        this.setState({data : data})
      })
  }

  componentDidMount = () => {
    this.getData()

  }

  render() {
      return (
        <div>
          <div className="ml-3">Статистика</div>
        </div>
    )

  }
}

export default Statistics;
