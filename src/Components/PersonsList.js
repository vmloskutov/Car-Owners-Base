import React, { Component } from 'react'
import axios from "axios";
import Person from './Person'


class PersonsList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      personsId : this.props.list
    }
  }


  render() {
      return (
        <div>
          {this.state.personId.map((person) => {
            return(
              <Person personId={person} />
            )
          })}
        </div>
    )
  }
}

export default PersonsList;
