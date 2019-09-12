import React from 'react';

export default class FilteringListModels extends React.Component {
    state = {
        initialItems: [],
        items: []
    }

    filterList = (event) => {
      let items = this.state.initialItems;
      items = items.filter((item) => {
        return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
      });
      this.setState({items: items});
    }

    componentWillMount = () => {
      this.setState({
          initialItems: this.props.content[0],
          items: this.props.content[0]
      })
    }
    componentWillReceiveProps = (nextProps) => {
      this.setState({
          initialItems: nextProps.content[0],
          items: nextProps.content[0]
      })
    }



    render() {
      return (
        <div>
          <form >
                <input className="cars-search" type="text" placeholder="Поиск" onChange={this.filterList}/>
          </form>
          <div className="brands-window mt-3 px-0">
            {this.state.items.map((item, index) => {
                    return (
                      <div onMouseEnter={e => {this.props.selected(e)}} className="model-item pl-2" key={index}>
                        {item}
                      </div>
                  )
                })
            }
            </div>
        </div>
      );
    }
};
