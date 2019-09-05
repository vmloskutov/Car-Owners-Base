import React, { Component } from 'react'

class SearchPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: ''
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  formSubmit = (e) => {
    e.preventDefault();
    this.props.onSearchBar(this.state.id);
    console.log(this.state.id);
  }

render() {
    const formStyle = {
         marginTop: "30px"
    }
    return (
      <div style={formStyle}>
        <form className="demoForm" onSubmit={this.formSubmit}>
         <div className="form-group">
           <div className="searchbar-button">
             <label htmlFor="id">Поиск автовладельца</label>
             <button className="btn btn-sm btn-primary btn-circle"><i className="fa fa-plus"></i></button>
           </div>
           <input type="number" className="form-control"
             name="id" value={this.state.id} onChange={this.handleUserInput} placeholder="ID пользователя"/>
         </div>
       </form>
      </div>
    );
  }
}

export default SearchPage;
