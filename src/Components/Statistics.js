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
        let counter = 0;
        let options = {
          chart: {
              type: 'pie',
              backgroundColor: 'rgba(0,0,0,0)',
              y:100

          },
          tooltip: { enabled: false },
          credits: {
              enabled: false
          },
          title: {
              text: 'Статистика '
          },
          yAxis: {
              title: {
                  text: ' '
              }
          },
          plotOptions: {
              pie: {
//                   y:1,
                  shadow: false,
//                  center: ['50%', '50%'],
                  borderWidth: 0,
                  showInLegend: false,
                  size: '80%',
                  innerSize: '60%'
                ,

                  data: [
                      [`Количество пользователей, зарегистрированных в системе: ${newData[0]}`, newData[0]],
                      [`Количество автомобилей, зарегистрированных в системе: ${newData[1]}. Из них в автопарках пользователей: ${newData[2]}`, newData[1]],
                  ]
              }
          },
          series: [
              {
                  type: 'pie',
                  dataLabels: {
                      color:'white',
                      distance: -20,
                      formatter: function () {
                          if(this.percentage!=0)  return Math.round(this.percentage)  + '%';

                      }
                  }
              },
              {
                  type: 'pie',
                  dataLabels: {
                      connectorColor: 'grey',
                      color:'black',
//                            y:-10,
                      softConnector: false,
                      connectorWidth:1,
                      verticalAlign:'top',
                      distance: 20,
                      formatter: function () {
                          if(this.percentage!=0)  return this.point.name;

                      }
                  }
              }
          ]
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
