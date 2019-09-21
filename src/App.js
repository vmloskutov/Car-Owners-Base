import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import "./App.css";
import Owners from './Components/Owners'
import Statistics from './Components/Statistics'
import Catalog from './Components/Catalog'
import Notfound from './Components/404'

function selectButton(e) {
  let tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  e.currentTarget.className += " active";
}
class App extends Component {


  checkUrl = () => {
    document.querySelectorAll(".tablinks").forEach(item => {
      item.classList.remove("active")
    })
    console.log(document.querySelector(".tablinks .owners"));
    if (this.props.location.pathname === "/"){
      document.querySelector(".owners").classList.add("active")
    }
    if (this.props.location.pathname === "/owners/id") {
      document.querySelector(".owners").classList.add("active")
    }
    if (this.props.location.pathname === "/cars") {
      console.log(1);
      document.querySelector(".cars").classList.add("active")
    }
    if (this.props.location.pathname === "/statistics") {
      console.log(2);
      document.querySelector(".statistics").classList.add("active")
    }
    let id = this.props.location.pathname.split("/")[2]
    if (Number.isInteger(parseInt(id))) {
      document.querySelector(".owners").classList.add("active")
    }
  }

  componentDidMount = () => {
    // if (this.props.location.pathname === "/"){
    //   document.querySelector(".owners").classList.add("active")
    // }
    // if (this.props.location.pathname === "/owners/id"){
    //   document.querySelector(".owners").classList.add("active")
    // }


    this.checkUrl()
  }

  render() {
    return (
      <div className=" global row">
        <Switch>
          <Redirect exact from="/owners" to="/owners/id" />
          <Redirect exact from="/" to="/owners/id" />
          <Redirect exact from="/catalog" to="/cars" />
          <Redirect exact from="/statistics" to="/statistics" />
        </Switch>
        <div className="tab col-2 left-menu d-flex">
          <div className="base-name">База<br/> Автовладельцев</div>
          <hr className="hr-main"/>
          <Link to={`/owners/id`} className="link first-link"><button className="tablinks owners" onClick={selectButton}>Автовладельцы</button></Link>
          <Link to={`/cars`} className="link"><button className="tablinks cars" onClick={selectButton}>Каталог авто</button></Link>
          <Link to={`/statistics`} className="link"><button className="tablinks statistics" onClick={selectButton}>Статистика</button></Link>
        </div>
        <div className="info col-8 offset-1">
          <Switch>
            <Route path={`/owners/:id`} component={Owners} />
            <Route path={`/cars`} component={Catalog} onLoad={() => {console.log(111)}}/>
            <Route path={`/statistics`} component={Statistics} />
            <Route component={Notfound} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
