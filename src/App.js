import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import "./App.css";
import Owners from './Components/Owners'
import Catalog from './Components/Catalog'
import Notfound from './Components/404'

function selectButton(e) {
  let tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  e.currentTarget.className += " active";
}

const Contact = () => <div>Статистика</div>;
class App extends Component {

  checkUrl  = () => {
    if (this.props.history.location.pathname === "/owners") {
      document.querySelector(".owners").classList.add("active")
    }
    if (this.props.history.location.pathname === "/cars") {
      document.querySelector(".cars").classList.add("active")
    }
    if (this.props.history.location.pathname === "/statistics") {
      document.querySelector(".statistics").classList.add("active")
    }
  }

  render() {
    return (
      <div className="container mt-3">
        <Switch>
          <Redirect exact from="/" to="/owners" />
          <Redirect exact from="/catalog" to="/catalog" />
          <Redirect exact from="/statistics" to="/statistics" />
        </Switch>
        <div className="tab">
          <Link to={`/owners`} className="link"><button className="tablinks owners" onClick={selectButton}>Автовладельцы</button></Link>
          <Link to={`/cars`} className="link"><button className="tablinks cars" onClick={selectButton}>Каталог авто</button></Link>
          <Link to={`/statistics`} className="link"><button className="tablinks statistics" onClick={selectButton}>Статистика</button></Link>
        </div>
        <div className="info">
          <Switch>
            <Route path={`/owners`} component={Owners} />
            <Route path={`/cars`} component={Catalog} onLoad={() => {console.log(111)}}/>
            <Route path={`/statistics`} component={Contact} />
            <Route component={Notfound} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
