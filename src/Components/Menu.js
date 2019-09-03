import React, { Component } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import Owners from './Owners'

class Menu extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="owners" id="uncontrolled-tab-example">
        <Tab eventKey="owners" title="Автовладельцы">
          <Owners />
        </Tab>
        <Tab eventKey="catalog" title="Каталог авто">

        </Tab>
        <Tab eventKey="statistics" title="Статистика">

        </Tab>
      </Tabs>
    )
  }
}

export default Menu;
