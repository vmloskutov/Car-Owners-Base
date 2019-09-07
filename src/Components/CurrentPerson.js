import React, { Component } from 'react'

class CurrentPerson extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }


  render() {
      return (
        <div className="row">
          <div className="list col-6">
            <div>
                {this.props.data.name}
            </div>
            <div>
                <i className="fas fa-gift"></i> {this.props.data.birthdate}
            </div>
          </div>
          <div className="autopark col-6">
            Автопарк

          </div>
        </div>
    )
  }
}

export default CurrentPerson;
