import React, { Component } from "react";
import DragCardQuestion from "./DragCardQuestion";
import { db } from "../firebase/firebase";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove
} from "react-sortable-hoc";

const DragHandle = SortableHandle(() => (
  <span className="lrp-0 qCard">
    <i class="fa fa-bars" aria-hidden="true" />
    &nbsp;
  </span>
)); // This can be any component you want
const SortableItem = SortableElement(({ value }) => (
  <div className="row lrm-0">
    <DragHandle />
    {value}
  </div>
));

const SortableList = SortableContainer(({ items }) => {
  return (
    <div className="col">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </div>
  );
});

class QuestionList extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    items: [
      // <DragCardQuestion
      //   q={"beenish"}
      //   q_option={[{ name: "item 1" }, { name: "item2" }]}
      //   ans={"kjb"}
      ///>
      // // <DragCardQuestion />,
      // // <DragCardQuestion />,
      // // <DragCardQuestion />
    ]
  };

  componentDidMount() {
    // this.setState({ items: this.props.items });
    // db.ref(`questions`)
    //   .once("value")
    //   .then(snapshot => {
    //     this.setState({ questions_array: snapshot.val() });
    //   });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ items: nextProps.items });
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    const { items } = this.state;

    this.setState({
      items: arrayMove(items, oldIndex, newIndex)
    });
  };
  render() {
    return (
      <SortableList
        items={this.state.items}
        onSortEnd={this.onSortEnd}
        useDragHandle={true}
      />
    );
  }
}

export default QuestionList;
