import React, { Component } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove
} from "react-sortable-hoc";
import DragableDiv from "./DragableDiv";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
const DragHandle = SortableHandle(() => (
  <span className="lrp-0">
    <i className="fa fa-bars" aria-hidden="true" />
    &nbsp;
  </span>
)); // This can be any component you want
const SortableItem = SortableElement(({ value }) => (
  <div className="row admin-paper-div">
    {/* <DragHandle /> */}
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

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});
class CourseSectionBody extends Component {
  state = {
    items: [],
    editName: true,
    sectionTitle: null,
    render: true,
    sectionName: null,
    exam: [],
    keyProp: null,
    isEdit: false
  };
  topicTitles = {};
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.setState({
      keyProp: this.props.keyProp
    });
    if (this.props.isEdit) {
      var items = [...this.state.items];
      if (this.props.data.topics != undefined) {
        this.setState({
          sectionName: this.props.data.topicName,
          sectionTitle: this.props.data.topicName,
          isEdit: this.props.isEdit,
          editName: !this.props.isEdit
        });
        Object.keys(this.props.data.topics).map(c => {
          items.push(
            <DragableDiv
              type={0}
              topics={this.props.topics}
              remove={this.removeSection}
              isEdit={this.props.isEdit}
              data={this.props.data.topics[c]}
              onData={this.props.fetchData}
              handleSelectedTopic={this.handleSelectedTopic}
              secId={this.props.secId}
              secTitle={this.state.sectionName}
              rowId={c}
            />
          );
        });
        this.setState({ items });
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ PoolData: nextProps.newCoursePoolData });
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({ render: false });
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex)
    });
    this.setState({ render: true });
  };
  editName = () => {
    this.setState({ editName: true });
  };
  saveName = () => {
    this.props.secUpdate(this.props.secId, this.state.sectionName);
    this.setState({ editName: false, sectionTitle: this.state.sectionName });
  };
  removeSection = (key, id, rowid) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            var items = [...this.state.items];
            this.setState({ render: false });

            for (var p = 0; p < items.length; p++) {
              if (items[p] != null && id == items[p].props.rowId) {
                items.splice(p, 1);
                this.props.remove(key, id, rowid);

                // items[p] = null;

                this.setState({ items }, () => {
                  this.resetSections();
                });
              }
            }
          }
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  };
  resetSections = () => {
    var items = [...this.state.items];
    var obj = [];
    Object.keys(items).map(id => {
      obj.push(
        <DragableDiv
          type={items[id].props.type}
          topics={this.props.topics}
          remove={this.removeSection}
          onData={this.props.fetchData}
          handleSelectedTopic={this.handleSelectedTopic}
          secId={items[id].props.secId}
          secTitle={this.state.sectionTitle}
          rowId={items[id].props.rowId}
          data={
            this.props.data
              ? this.props.data.topics[items[id].props.rowId]
              : this.topicTitles[items[id].props.rowId]
          }
        />
      );
    });

    this.setState({ items: obj, render: true });
  };
  handleSelectedTopic = (data, ref) => {
    if (this.topicTitles == undefined) {
      this.topicTitles[ref.rowId] = {};
    }
    this.topicTitles[ref.rowId] = { examDetails: { title: data } };
  };
  addSection = () => {
    var items = [...this.state.items];
    items.push(
      <DragableDiv
        type={0}
        topics={this.props.topics}
        remove={this.removeSection}
        onData={this.props.fetchData}
        secId={this.props.secId}
        handleSelectedTopic={this.handleSelectedTopic}
        secTitle={this.state.sectionTitle}
        rowId={"subSec" + this.state.items.length}
      />
    );
    this.setState({ items });
  };
  render() {
    return (
      <React.Fragment>
        <div className="col-md-12">
          <div className="mockExamSectionName row">
            {this.state.editName || this.state.sectionTitle == null ? (
              <div className="col-md-9 ">
                <div className="row lrp-15">
                  <input
                    className="form-control admin-form-control col-md-3"
                    placeholder="Enter section tilte here"
                    value={this.state.sectionName}
                    onChange={event =>
                      this.setState(
                        byPropKey("sectionName", event.target.value)
                      )
                    }
                  />
                  <div style={{ padding: "5px" }}>
                    <span>
                      {" "}
                      <i
                        onClick={this.saveName}
                        className="fa fa-save clr-darkpurple fa-lg"
                        aria-hidden="true"
                      />{" "}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-md-9 ">
                {this.state.sectionName}
                &nbsp;
                <span>
                  {" "}
                  <i
                    onClick={this.editName}
                    className="fa fa-pencil clr-darkpurple"
                    aria-hidden="true"
                  />{" "}
                </span>
              </div>
            )}
            <div className="col-md-3">
              <button
                className="btn admin-btn-green btn-whitefix_width_btn white fz_13 bold float-right"
                onClick={this.addSection}
                {...(this.state.editName
                  ? { disabled: true }
                  : { disabled: false })}
              >
                Add new Topic
              </button>
            </div>
          </div>

          <div className="">
            {/* <SortableList
                items={this.state.items}
                onSortEnd={this.onSortEnd}
                useDragHandle={true}
              /> */}

            {this.state.items.length > 0 && this.state.render ? (
              <SortableList
                items={this.state.items}
                // onSortEnd={this.onSortEnd}
                // lockAxis={"x"}
                useDragHandle={true}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CourseSectionBody;
