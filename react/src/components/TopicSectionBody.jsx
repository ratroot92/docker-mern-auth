import React, { Component } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove
} from "react-sortable-hoc";
import Topics from "./Topics";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
// const DragHandle = SortableHandle(() => (
//   <span className="lrp-0">
//     <i class="fa fa-bars" aria-hidden="true" />
//     &nbsp;
//   </span>
// ));
// This can be any component you want
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
var subTopics = {};
class TopicSectionBody extends Component {
  state = {
    items: [],
    editName: true,
    sectionTitle: null,
    sectionName: null,
    exam: [],
    keyProp: null,
    isEdit: false
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.setState({
      keyProp: this.props.keyProp,
      isEdit: this.props.isEdit,
      data: this.props.data
    });
    if (this.props.isEdit) {
      this.setState({
        sectionName: this.props.data.Topic,
        editName: false,
        sectionTitle: this.state.sectionName
      });
      var items = [...this.state.items];
      Object.keys(this.props.data.subTopic).map(key1 => {
        items.push(
          <Topics
            type={0}
            remove={this.removeSection}
            onData={this.sendData}
            secId={this.props.secId}
            secTitle={this.props.data.Topic}
            rowId={key1}
            subdata={this.props.data.subTopic[key1]}
            isEdit={this.props.isEdit}
          />
        );
      });
      this.setState({ items });
    }
  }
  removeSection = (key, id, rowid) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            var items = [...this.state.items];
            for (var p = 0; p < items.length; p++) {
              if (parseInt(id) == parseInt(items[p].props.rowId)) {
                items.splice(p, 1);
                this.setState({ items });
                this.props.remove(key, id, rowid);
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

  //   onSortEnd = ({ oldIndex, newIndex }) => {
  // this.setState({
  //   items: arrayMove(this.state.items, oldIndex, newIndex)
  // });
  // if (subTopics[this.props.secId] != undefined) {
  //   //   subTopics[this.props.secId] = arrayMove(
  //   //     subTopics[this.props.secId],
  //   //     oldIndex,
  //   //     newIndex
  //   //   );
  // }
  //console.log(this.state.items);
  //console.log(subTopics);
  //   };
  editName = () => {
    this.setState({ editName: true });
  };
  saveName = () => {
    this.props.secUpdate(this.props.secId, this.state.sectionName);
    this.setState({ editName: false, sectionTitle: this.state.sectionName });
  };

  addSection = () => {
    var items = [...this.state.items];
    items.push(
      <Topics
        type={0}
        remove={this.removeSection}
        onData={this.sendData}
        // onData={this.props.fetchData}
        secId={this.props.secId}
        secTitle={this.state.sectionTitle}
        rowId={items.length}
      />
    );
    this.setState({ items });
  };

  sendData = (data, key) => {
    if (subTopics[key] == undefined) {
      var tp = [];
      tp.push({ subTopic: data });
      subTopics[key] = tp;
    } else {
      var tp = subTopics[key];
      tp.push({ subTopic: data });
      subTopics[key] = tp;
    }
    this.props.fetchData(subTopics[this.props.secId], this.props.secId);
  };
  render() {
    return (
      <React.Fragment>
        <div className="col-md-12">
          <div className="">
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
                          class="fa fa-save clr-darkpurple fa-lg"
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
                      class="fa fa-pencil clr-darkpurple"
                      aria-hidden="true"
                    />{" "}
                  </span>
                </div>
              )}
              <div className="colm-md-3">
                <button
                  className="btn admin-btn-green btn-whitefix_width_btn white fz_13 bold float-right"
                  onClick={this.addSection}
                >
                  Add Paper{" "}
                </button>
              </div>
            </div>

            <div className="">
              {/* <SortableList
                items={this.state.items}
                onSortEnd={this.onSortEnd}
                useDragHandle={true}
              /> */}

              {this.state.items.length > 0 ? (
                <SortableList
                  items={this.state.items}
                  //   onSortEnd={this.onSortEnd}
                  useDragHandle={true}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TopicSectionBody;
