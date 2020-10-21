import React, { Component } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove
} from "react-sortable-hoc";

const DragHandle = SortableHandle(() => (
  <span className="lrp-0">
    <i class="fa fa-bars" aria-hidden="true" />
    &nbsp;
  </span>
)); // This can be any component you want
const SortableItem = SortableElement(({ value }) => (
  <div className="row admin-paper-div bm-20 grab">
    <DragHandle />
    {value}
  </div>
));

const SortableList = SortableContainer(({ items }) => {
  return (
    <div>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </div>
  );
});

class PaperSection extends Component {
  state = {
    items: [],
    render: true
  };
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextprops) {
    if (nextprops != undefined) {
      this.setState({
        render: false,
        items: nextprops.items,
        render: true
      });
    }
  }
  componentDidMount() {
    this.setState({
      items: this.props.items
    });
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({ render: false });
    const { items } = this.state;
    this.setState({
      items: arrayMove(items, oldIndex, newIndex)
    });
    this.setState({ render: true });
    if (this.props.remapData != undefined) {
      this.props.remapData(oldIndex, newIndex);
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.state.items.length > 0 && this.state.render ? (
          <SortableList
            items={this.state.items}
            onSortEnd={this.onSortEnd}
            //useDragHandle={true}
            distance={15}
            paperShow={this.props.paperShow}
          />
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default PaperSection;
