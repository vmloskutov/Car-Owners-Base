import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import "./App.css";
import Owners from './Components/Owners'

const Comments = () => <div>You're on the Comments Tab</div>;
const Contact = () => <div>You're on the Contact Tab</div>;
class App extends Component {
  render() {
    return (

      <div className="container">
        <Switch>
          <Redirect from="/" to="/owners" />
        </Switch>
        <div className="tab">
          <Link to={`/owners`} className="link"><button className="tablinks">Автовладельцы</button></Link>
          <Link to={`/catalog`} className="link"><button className="tablinks">Каталог авто</button></Link>
          <Link to={`/statistics`} className="link"><button className="tablinks">Статистика</button></Link>
        </div>
        <div className="tabs">
          <Switch>
            <Route path={`/owners`} component={Owners} />
            <Route path={`/catalog`} component={Comments} />
            <Route path={`/statistics`} component={Contact} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
