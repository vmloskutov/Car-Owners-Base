import React, { Component } from 'react';
import './App.css';
import Menu from './Components/Menu'

class App extends Component {

  render() {
    return (
      <div className = "container mt-3">
        <Menu />
      </div>
    );
  }


  //
  // state = {
  //   cars: [
  //     {name: 'Ford', year: 2018},
  //     {name: 'Audi', year: 2016},
  //     {name: 'Mazda', year: 2010}
  //   ],
  //   pageTitle: 'React components' 
  // }
  //
  // changeTitleHandler = (newTitle) => {
  //   this.setState({
  //     pageTitle: newTitle
  //   })
  // }
  //
  // handleInput = (event) => {
  //   this.setState({
  //     pageTitle: event.target.value
  //   })
  // }
  //
  // render() {
  //   const divStyle = {
  //     textAlign: 'center'
  //   }
  //
  //   return (
  //     <div style={divStyle}>
  //       <h1>{this.state.pageTitle}</h1>
  //
  //       <input type="text" onChange={this.handleInput} />
  //
  //       <button
  //         onClick={this.changeTitleHandler.bind(this, 'Changed!')}
  //       >Change title</button>
  //
  //       { this.state.cars.map((car, index) => {
  //         return (
  //           <Car
  //             key={index}
  //             name={car.name}
  //             year={car.year}
  //             onChangeTitle={() => this.changeTitleHandler(car.name)}
  //           />
  //         )
  //       }) }
  //     </div>
  //   );
  // }
}

export default App;
