import React from 'react';

export default class FilteringList extends React.Component {
    state = {
        initialItems: [],
        items: []
    }

    filterList = (event) => {
      let items = this.state.initialItems;
      items = items.filter((item) => {
        return item.brand.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
      });
      this.setState({items: items});
    }

    componentWillMount = () => {
      this.setState({
          initialItems: this.props.content,
          items: this.props.content
      })
    }

    render() {
      return (
        <div>
          <form >
                <input className="cars-search" type="text" placeholder="Поиск" onChange={this.filterList}/>
          </form>
          <div className="brands-window mt-3 px-0">
            {
                this.state.items.map((item, index) => {
                    return <div onClick={() => {this.props.selected(item.brand)}} className="brand-item" key={index}>{item.brand}</div>
                })
            }
            </div>
        </div>
      );
    }
};
