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
      console.log(this.props.content);
      this.setState({
          initialItems: this.props.content,
          items: this.props.content
      })
    }
    componentWillReceiveProps = (nextProps) => {
      this.setState({
          initialItems: nextProps.content,
          items: nextProps.content
      })
    }

    render() {
      return (
        <div>
          <form >
                <input className="cars-search" type="text" placeholder="Поиск" onChange={this.filterList}/>
          </form>
          <div className="brands-window mt-3 px-0">
            {this.state.items[0].map((item, index) => {
                    return (
                      <div onClick={() => {}} className="models-item" key={index}>
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
