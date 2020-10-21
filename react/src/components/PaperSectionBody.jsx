import React, { Component } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove
} from "react-sortable-hoc";
import Papers from "./Papers";
import AddPaper from "./AddPaper";
import clonedeep from "lodash.clonedeep";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
const DragHandle = SortableHandle(() => (
  <span className="lrp-0 ">
    <i class="fa fa-bars" aria-hidden="true" />
    &nbsp;
  </span>
));
// This can be any component you want
const SortableItem = SortableElement(({ value }) => (
  <div className="grab">
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
var PoolData = {};
var topics = [];
var S_title = [];
class PaperSectionBody extends Component {
  state = {
    items: [],
    editName: true,
    sectionTitle: null,
    sectionName: null,
    exam: [],
    editRow: null,
    editSec: null,
    keyProp: null,
    activeComp: 0,

    isEdit: false
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.setState({
      keyProp: this.props.keyProp
    });

    if (this.props.isEdit) {
      this.setState({
        sectionName: this.props.data[this.props.secId].topicName,
        editName: false,
        sectionTitle: this.props.data[this.props.secId].topicName
      });
      PoolData = this.props.data;
      var items = [...this.state.items];
      if (this.props.data[this.props.secId].topics != undefined) {
        Object.keys(this.props.data[this.props.secId].topics).map(key1 => {
          items[key1] = (
            <Papers
              type={0}
              title={
                this.props.data[this.props.secId]["topics"][key1].examDetails
                  .title
              }
              // remove={this.removeSection}
              onData={this.sendData}
              secId={this.props.secId}
              paperClone={this.paperClone}
              paperDelete={this.paperDelete}
              secTitle={this.props.data[this.props.secId].topicName}
              rowId={key1}
              editPaper={this.editPaper}
              isEdit={this.state.isEdit}
            />
          );
        });
      }
      this.setState({ items });
    } else {
      if (this.props.data != undefined && this.props.data != null) {
        this.setState({
          sectionName: this.props.data[this.props.secId].topicName,
          editName: false,
          sectionTitle: this.props.data[this.props.secId].topicName
        });
        PoolData = this.props.data;
        var items = [...this.state.items];
        Object.keys(this.props.data[this.props.secId].topics).map(key1 => {
          items[key1] = (
            <Papers
              type={0}
              title={
                this.props.data[this.props.secId]["topics"][key1].examDetails
                  .title
              }
              remove={this.removeSection}
              onData={this.sendData}
              secId={this.props.secId}
              paperClone={this.paperClone}
              paperDelete={this.paperDelete}
              secTitle={this.props.data[this.props.secId].topicName}
              rowId={key1}
              editPaper={this.editPaper}
              isEdit={this.state.isEdit}
            />
          );
        });
        this.setState({ items });
      }
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
  //   };
  editName = () => {
    this.setState({ editName: true });
  };
  saveName = () => {
    this.props.secUpdate(this.props.secId, this.state.sectionName);
    //  S_title[id] = title;
    if (PoolData[this.props.secId] != undefined) {
      PoolData[this.props.secId] = {
        topicName: this.state.sectionName,
        topics: {}
      };
    }
    PoolData[this.props.secId] = {
      topicName: this.state.sectionName,
      topics: {}
    };

    this.setState({ editName: false, sectionTitle: this.state.sectionName });
  };

  addSection = title => {
    var items = [...this.state.items];
    items.push(
      <Papers
        title={title}
        // type={0}
        // remove={this.removeSection}
        // onData={this.sendData}
        paperDelete={this.paperDelete}
        // // onData={this.props.fetchData}
        editPaper={this.editPaper}
        paperClone={this.paperClone}
        secId={this.props.secId}
        secTitle={this.state.sectionTitle}
        rowId={items.length}
        isEdit={this.state.isEdit}
      />
    );
    this.setState({ items });
  };
  addPaperShow = () => {
    this.setState({ activeComp: 1, isEdit: false });
  };
  addPaperHide = () => {
    this.setState({ activeComp: 0 });
  };
  editPaper = data => {
    this.setState({
      isEdit: true,
      activeComp: 1,
      editIndex: data.rowId,
      editSection: data.secId,
      editData: PoolData[data.secId]["topics"][data.rowId]
    });
  };
  addPaper = data => {
    var items = data.items;
    var exam = [];
    for (var q = 0; q < items.length; q++) {
      exam.push(items[q].props.qobj);
    }
    if (data.edit) {
      this.setState({ isEdit: false, editData: null });

      let topic = this.state.editSection;
      let subTopic = this.state.editIndex;
      PoolData[topic]["topics"][subTopic] = {
        //  topicName: data.title,

        exam: exam,
        examDetails: {
          max_score: 100,
          max_time: data.duration,
          min_score: data.minScore,
          title: data.title,
          info: data.info,
          instructions: data.ins,
          isShuffle: data.isShuffle
        }
      };
      //   var paperList = { ...this.state.paperList };
      //   paperList[this.state.editIndex]["examDetails"]["title"] = data.title;
      //   this.setState({ paperList });
      //   var papers = { ...this.state.papers };
      //   papers[this.state.editIndex] = {
      //     title: data.title,
      //     key: this.state.editIndex
      //   };
      var items = [...this.state.items];
      items[subTopic] = (
        <Papers
          title={data.title}
          // type={0}
          paperDelete={this.paperDelete}
          // remove={this.removeSection}
          // onData={this.sendData}
          // // onData={this.props.fetchData}
          editPaper={this.editPaper}
          secId={topic}
          secTitle={this.state.sectionTitle}
          paperClone={this.paperClone}
          rowId={subTopic}
          isEdit={this.state.isEdit}
        />
      );

      this.setState({ items });
    } else {
      this.addSection(data.title);
      if (PoolData[data.secId] == undefined) {
        PoolData[data.secId] = {};
      }

      if (PoolData[data.secId]["topics"] == undefined) {
        PoolData[data.secId]["topics"] = {};
      }

      if (PoolData[data.secId]["topics"][data.rowId] == undefined) {
        PoolData[data.secId]["topics"][data.rowId] = {};
      }

      PoolData[data.secId]["topics"][data.rowId] = {
        //  topicName: data.title,

        exam: exam,
        examDetails: {
          max_score: 100,
          max_time: data.duration,
          min_score: data.minScore,
          title: data.title,
          info: data.info,
          instructions: data.ins,
          isShuffle: data.isShuffle
        }
      };
    }

    // if (!data.edit) {
    //   var papers = { ...this.state.papers };
    //   papers[topics.length - 1] = { title: data.title, key: topics.length - 1 };
    //   this.setState({ papers });
    // } else {
    //   this.setState({
    //     editData: PoolData[data.secId]["topics"][data.rowId]
    //   });
    // }
    this.setState({ activeComp: 0 });
    this.props.fetchData(PoolData, this.props.secId);
    // db.ref("courseExams/" + this.state.keyProp + "/paper")
    //   .set(paperData)
    //   .then(e => {
    //     alert("Data posted");
    //     var papers = { ...this.state.papers };
    //     papers[data.title] = { title: data.title, key: "paper" };
    //     this.setState({ papers });
    //     this.setState({ activeComp: 0 });
    //   });
  };

  paperClone = data => {
    var items = [...this.state.items];
    let deepcloned = clonedeep(PoolData[data.secId]["topics"][data.rowId]);

    PoolData[data.secId]["topics"][items.length] = deepcloned;
    PoolData[data.secId]["topics"][items.length]["examDetails"]["title"] =
      data.title;

    items.push(
      <Papers
        title={data.title}
        // type={0}
        // remove={this.removeSection}
        // onData={this.sendData}
        // // onData={this.props.fetchData}
        editPaper={this.editPaper}
        paperClone={this.paperClone}
        secId={data.secId}
        secTitle={this.state.sectionTitle}
        paperDelete={this.paperDelete}
        rowId={items.length}
        isEdit={this.state.isEdit}
      />
    );

    this.props.fetchData(PoolData);

    this.setState({ items });
  };

  paperDelete = data => {
    if (PoolData[data.secId]["topics"][data.rowId] != undefined) {
      delete PoolData[data.secId]["topics"][data.rowId]; // Removes json.foo from the dictionary.
      //   PoolData[data.secId]["topics"].splice(parseInt(data.rowId), 1);
      var items = [...this.state.items];
      //   items.splice(parseInt(data.rowId), 1);
      delete items[data.rowId]; // Removes json.foo from the dictionary.

      this.props.fetchData(PoolData, this.props.secId);

      this.setState({ items });
    }
  };
  onSortEnd = ({ oldIndex, newIndex }) => {
    const { items } = this.state;

    this.setState({
      items: arrayMove(items, oldIndex, newIndex)
    });
    var dataClone = [];
    Object.keys(PoolData[this.props.secId]["topics"]).map(key => {
      dataClone.push(PoolData[this.props.secId]["topics"][key]);
    });
    dataClone = arrayMove(dataClone, oldIndex, newIndex);

    Object.keys(dataClone).map(key => {
      PoolData[this.props.secId]["topics"][key] = dataClone[key];
    });

    this.props.fetchData(PoolData);
  };
  render() {
    return (
      <React.Fragment>
        {this.state.activeComp == 0 ? (
          <React.Fragment>
            <div className="col-md-12">
              <div className="">
                <div className="mockExamSectionName row">
                  {this.state.editName || this.state.sectionTitle == null ? (
                    <div className="col-md-9 ">
                      <div className="row lrp-15">
                        <input
                          className="form-control admin-form-control col-md-3"
                          placeholder="Enter Section Name here"
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
                              className="fa fa-save clr-darkpurple fa-lg pointer"
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
                          className="fa fa-pencil clr-darkpurple pointer"
                          aria-hidden="true"
                        />{" "}
                      </span>
                    </div>
                  )}
                  <div className="col-md-3">
                    <button
                      className="btn admin-btn-green btn-whitefix_width_btn white fz_13 bold float-right"
                      onClick={this.addPaperShow}
                      {...(this.state.editName
                        ? { disabled: true }
                        : { disabled: false })}
                    >
                      Add Paper{" "}
                    </button>
                  </div>
                </div>
                <div className="lrp-0">
                  {/* <SortableList
                items={this.state.items}
                onSortEnd={this.onSortEnd}
                useDragHandle={true}
              /> */}

                  {this.state.items.length > 0 ? (
                    <SortableList
                      items={this.state.items}
                      onSortEnd={this.onSortEnd}
                      // useDragHandle={true}
                      distance={15}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <AddPaper
            courseType={this.props.courseType}
            addPaper={this.addPaper}
            isEdit={this.state.isEdit}
            data={this.state.editData}
            secId={this.props.secId}
            permissions={this.props.permissions}
            secTitle={this.state.sectionTitle}
            rowId={this.state.items.length}
            cancel={this.addPaperHide}
          />
        )}
      </React.Fragment>
    );
  }
}

export default PaperSectionBody;
