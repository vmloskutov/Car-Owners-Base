import React, { Component } from 'react'
import Person from './Person'

class PersonsList extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }

  personRender(person) {
    this.props.selected(person)
  }

  render() {
      return (
        <div>
          {this.props.list.slice(0, 3).map((person, index) => {
            return(
              <div key={index} onClick={() => {this.personRender(person)}}>
                <Person  personId={person} />
              </div>
            )
          })}
        </div>
    )
  }
}

export default PersonsList;
