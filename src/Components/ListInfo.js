import React, { Component } from 'react'
import PersonsList from './PersonsList'
import Error from './Error'
import CurrentPerson from './CurrentPerson'
import Button from 'react-bootstrap/Button';

class ListInfo extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }

  selectedId = (id) => {
    this.setState({...id})
  }

  getBack() {
    this.setState({id : null})
    document.querySelector(".last-label").style.display = "block";
  }


  render() {
    if (this.state.id !== undefined && this.state.id !== null && this.props.current.name === undefined) {
      document.querySelector(".last-label").style.display = "none";
      return(
        <div>
          <Button onClick={(() => {this.getBack()})} className="mb-3" variant="outline-secondary">Назад</Button>
          <CurrentPerson data={this.state} />
        </div>
      )
    }
    if ((this.props.current.name === undefined || this.props.current.name === "") && this.props.current.error === "" ) {
      return (
        <div>
          <PersonsList list={this.props.info} selectedTable={this.selectedId} />
        </div>
      )
    } else {
      document.querySelector(".last-label").style.display = "none";
      return (
        <div>
          {this.props.current.error ? <Error error={this.props.current.error} /> : <CurrentPerson data={this.props.current} />}
        </div>
      )
    }

  }
}

export default ListInfo;
