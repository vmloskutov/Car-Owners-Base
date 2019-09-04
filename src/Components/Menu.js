import React, { Component } from 'react'
import { Tabs } from 'react-bootstrap'
import Owners from './Owners'
import { NavLink } from 'react-router-dom'

class Menu extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="owners" id="uncontrolled-tab-example">

          <NavLink to="/owners" eventKey="owners" title="Автовладельцы">
              <Owners />
          </NavLink>

        <NavLink to="/catalog" eventKey="catalog" title="Каталог авто">

        </NavLink>
        <NavLink to="/statistics" eventKey="statistics" title="Статистика">

        </NavLink>
      </Tabs>
    )
  }
}

export default Menu;
