import React, { Component } from 'react'
import Person from './Person'

class PersonsList extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }

  personRender = (child) => {
    this.props.selectedTable(child)
  }


  render() {
      return (
        <div className="person-list">
          {this.props.list.slice(0, 6).map((person, index) => {
            return(
              <div className="" key={index}>
                <Person  personId={person} selectedInfo={this.personRender}/>
              </div>
            )
          })}
        </div>
    )
  }
}

export default PersonsList;
