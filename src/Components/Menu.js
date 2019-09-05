import React, { Component } from 'react'
//import Owners from './Owners'
import { Link } from "react-router-dom";



class Menu extends Component {
  render() {
    return (
      <div>
        <Link to="/owners" className="link">Автовладельцы</Link>
        <Link to="/catalog" className="link">Каталог</Link>
      </div>
    )
  }
}

export default Menu;
