import React, { Component } from 'react'
import axios from "axios";
import Person from './Person'


class PersonsList extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }


  render() {
      return (
        <div>
          {this.props.list.map((person, index) => {
            console.log(person);
            return(
              <Person key={index} personId={person} />
            )
          })}
        </div>
    )
  }
}

export default PersonsList;
