import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import "./App.css";
import Owners from './Components/Owners'
import Notfound from './Components/404'

function selectButton(e) {
  let tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  e.currentTarget.className += " active";
}

const Comments = () => <div>You're on the Comments Tab</div>;
const Contact = () => <div>You're on the Contact Tab</div>;
class App extends Component {

  render() {
    return (

      <div className="container mt-3">
        <Switch>
          <Redirect exact from="/" to="/owners" />
          <Redirect exact from="/catalog" to="/catalog" />
          <Redirect exact from="/statistics" to="/statistics" />
        </Switch>
        <div className="tab">
          <Link to={`/owners`} className="link"><button className="tablinks active" onClick={selectButton}>Автовладельцы</button></Link>
          <Link to={`/catalog`} className="link"><button className="tablinks" onClick={selectButton}>Каталог авто</button></Link>
          <Link to={`/statistics`} className="link"><button className="tablinks" onClick={selectButton}>Статистика</button></Link>
        </div>
        <div className="info">
          <Switch>
            <Route path={`/owners`} component={Owners} />
            <Route path={`/catalog`} component={Comments} />
            <Route path={`/statistics`} component={Contact} />
            <Route component={Notfound} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
