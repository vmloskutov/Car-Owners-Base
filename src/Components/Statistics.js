import React, { Component } from 'react'
import axios from "axios"
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


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
        let newData = []
        newData.push(response.data.personcount)
        newData.push(response.data.carcount)
        newData.push(response.data.uniquevendorcount)
        let options = {
              chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: null,
                  plotShadow: false,
                  type: 'pie'
              },
              title: {
                  text: 'Статистика'
              },
              tooltip: {
                  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
              },
              plotOptions: {
                  pie: {
                      allowPointSelect: true,
                      cursor: 'pointer',
                      dataLabels: {

                          enabled: true,
                          format: '<b>{point.name}</b>', // : {point.percentage:.1f} %
                      }
                  }
              },
              series: [{
                  name: '',
                  colorByPoint: true,
                  data: [{
                      name: `Количество пользователей, зарегстрированных в системе: ${newData[0]}`,
                      y: newData[0],
                      }, {
                      name: `Количество автомобилей, зарегистрированных в системе: ${newData[1]}`,
                      y: newData[1]
                  }]
              }]
          }
        this.setState({options : options})

      })
  }

  componentWillMount = () => {
    this.getData()

  }

  render() {
      return (
        <div>
        {this.state.options ? <HighchartsReact
            highcharts={Highcharts}
            options={this.state.options}
          /> : null}

        </div>
    )

  }
}

export default Statistics;
