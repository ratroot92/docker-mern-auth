import React, { Component } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove
} from "react-sortable-hoc";

const DragHandle = SortableHandle(() => (
  <span className="lrp-0">
    <i className="fa fa-bars" aria-hidden="true" />
    &nbsp;
  </span>
)); // This can be any component you want
const SortableItem = SortableElement(({ value }) => (
  <div className="row admin-paper-div bm-20">
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

class CourseSection extends Component {
  state = {
    items: []
  };
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextprops) {
    if (nextprops !== undefined) {
      this.setState({
        items: nextprops.items
      });
    }
  }
  componentDidMount() {
    this.setState({
      items: this.props.items
    });
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex)
    });
  };
  render() {
    return (
      <React.Fragment>
        {this.state.items.length > 0 ? (
          <SortableList
            items={this.state.items}
            onSortEnd={this.onSortEnd}
            useDragHandle={true}
          />
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default CourseSection;
