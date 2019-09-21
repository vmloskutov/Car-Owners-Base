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
        <div className="d-flex person-list">
          {this.props.list.slice(0, 5).map((person, index) => {
            return(
              <div className="ml-4 ml-2" key={index}>
                <Person  personId={person} selectedInfo={this.personRender}/>
              </div>
            )
          })}
        </div>
    )
  }
}

export default PersonsList;
