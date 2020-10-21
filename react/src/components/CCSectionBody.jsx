import React, { Component } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove
} from "react-sortable-hoc";
import Papers from "./Papers";
import AddPaper from "./AddPaper";
import MediaContentHome from "./MediaContentHome";
import LiveContentHome from "./LiveContentHome";
import clonedeep from "lodash.clonedeep";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import AssignmentContentHome from "./AssignmentContentHome";
import DocContentHome from "./DocContentHome";
const DragHandle = SortableHandle(() => (
  <span className="lrp-0">
    <i class="fa fa-bars" aria-hidden="true" />
    &nbsp;
  </span>
));
// This can be any component you want
const SortableItem = SortableElement(({ value }) => (
  <div>
    <DragHandle />
    {value}
  </div>
));

const SortableList = SortableContainer(({ items }) => {
  return (
    <div>
      {items.map((value, index) => (
        <React.Fragment>
          {value != undefined ? (
            <SortableItem key={`item-${index}`} index={index} value={value} />
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
});

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

var topics = [];
var S_title = [];
class CCSectionBody extends Component {
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
    mycomponent: null,
    isEdit: false,
    dropdownOpen: false
  };

  subTopics = {};
  PoolData = {};
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    //consoleg("cc section body next props", nextProps);
    // var items = nextProps.items;
  }
  componentDidMount() {
    console.log("CC Section Body Props", this.props);
    this.subTopics = {};
    if (this.props.data) {
      this.PoolData = this.props.data;
    }
    this.setState({
      keyProp: this.props.keyProp
    });
    if (this.props.title != undefined && this.props.title != null) {
      this.setState({
        sectionTitle: this.props.title,
        sectionName: this.props.title,
        editName: false
      });
      if (this.PoolData[this.props.secId] == undefined) {
        this.PoolData[this.props.secId] = {};
      }
      this.PoolData[this.props.secId].topicName = this.props.title;
      this.props.fetchData(this.PoolData);
    }
    if (this.props.isEdit) {
      console.log("is edit mount ", this.props);
      this.setState({
        sectionName: this.props.data[this.props.secId].topicName,
        editName: false,
        sectionTitle: this.props.data[this.props.secId].topicName
      });
      this.PoolData = this.props.data;
      var items = [...this.state.items];
      if (this.props.data[this.props.secId]["topics"] != undefined) {
        Object.keys(this.props.data[this.props.secId].topics).map(key1 => {
          var cType = this.props.data[this.props.secId]["topics"][key1]
            .examDetails.type;
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
              paperDelete={this.paperDelete}
              secTitle={this.props.data[this.props.secId].topicName}
              rowId={key1}
              editPaper={
                cType == 0
                  ? this.editPaper
                  : cType == 1
                  ? this.editAssignment
                  : cType == 2
                  ? this.editDocument
                  : cType == 3
                  ? this.editLive
                  : cType == 4
                  ? this.editMedia
                  : null
              }
              isEdit={this.state.isEdit}
            />
          );
        });
      }

      this.setState({ items });
    } else {
      if (
        this.props.data != undefined &&
        this.props.data[this.props.secId] != undefined
      ) {
        this.setState({
          sectionName: this.props.data[this.props.secId].topicName,
          editName: false,
          items: [],
          sectionTitle: this.props.data[this.props.secId].topicName
        });
        var items = [];

        Object.keys(this.props.data[this.props.secId].topics).map(key1 => {
          var cType = this.props.data[this.props.secId]["topics"][key1]
            .examDetails.type;
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
              paperDelete={this.paperDelete}
              secTitle={this.props.data[this.props.secId].topicName}
              rowId={key1}
              editPaper={
                cType == 0
                  ? this.editPaper
                  : cType == 1
                  ? this.editAssignment
                  : cType == 2
                  ? this.editDocument
                  : cType == 3
                  ? this.editLive
                  : cType == 4
                  ? this.editMedia
                  : null
              }
              isEdit={this.state.isEdit}
            />
          );
        });
        this.setState({ items });
      }
    }
  }
  cancelSection = () => {
    this.setState({
      activeComp: 0
    });
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

  editName = () => {
    this.setState({ editName: true });
  };
  saveName = () => {
    console.log("Pool data section ", this.PoolData);
    this.props.secUpdate(this.props.secId, this.state.sectionName);
    if (this.PoolData[this.props.secId] == undefined) {
      this.PoolData[this.props.secId] = {
        topicName: this.state.sectionName,
        topics: {}
      };
    } else {
      this.PoolData[this.props.secId]["topicName"] = this.state.sectionName;
    }
    this.setState({ editName: false, sectionTitle: this.state.sectionName });
  };

  addSection = (title, cType) => {
    var items = [...this.state.items];
    items.push(
      <Papers
        title={title}
        // type={0}
        // remove={this.removeSection}
        // onData={this.sendData}
        paperDelete={this.paperDelete}
        cancel={this.cancelSection}
        // // onData={this.props.fetchData}
        keyProp={this.props.keyProp}
        editPaper={
          cType == 0
            ? this.editPaper
            : cType == 1
            ? this.editAssignment
            : cType == 2
            ? this.editDocument
            : cType == 3
            ? this.editLive
            : cType == 4
            ? this.editMedia
            : null
        }
        secId={this.props.secId}
        secTitle={this.state.sectionTitle}
        rowId={items.length}
        isEdit={this.state.isEdit}
      />
    );
    this.setState({ items });
  };
  addPaperShow = () => {
    this.setState({
      activeComp: 1,
      isEdit: false,
      mycomponent: (
        <AddPaper
          courseType={this.props.courseType}
          addPaper={this.addPaper}
          editPaper={this.editPaper}
          keyProp={this.props.keyProp}
          cancel={this.cancelSection}
          isEdit={this.state.isEdit}
          data={this.state.editData}
          permissions={this.props.permissions}
          secId={this.props.secId}
          secTitle={this.state.sectionTitle}
          rowId={this.state.items.length}
        />
      )
    });
  };
  addAssignShow = () => {
    this.setState({
      activeComp: 1,
      isEdit: false,
      mycomponent: (
        <AssignmentContentHome
          courseType={this.props.courseType}
          addContentData={this.addContentData}
          cancel={this.cancelSection}
          isEdit={this.state.isEdit}
          keyProp={this.props.keyProp}
          data={this.state.editData}
          secId={this.props.secId}
          secTitle={this.state.sectionTitle}
          rowId={this.state.items.length}
        />
      )
    });
  };
  addMediaShow = () => {
    this.setState({
      activeComp: 1,
      isEdit: false,
      mycomponent: (
        <MediaContentHome
          addContentData={this.addContentData}
          cancel={this.cancelSection}
          cancel={this.cancelSection}
          isEdit={this.state.isEdit}
          keyProp={this.props.keyProp}
          data={this.state.editData}
          secId={this.props.secId}
          secTitle={this.state.sectionTitle}
          rowId={this.state.items.length}
        />
      )
    });
  };
  addLiveShow = () => {
    this.setState({
      activeComp: 1,
      isEdit: false,
      mycomponent: (
        <LiveContentHome
          addContentData={this.addContentData}
          cancel={this.cancelSection}
          cancel={this.cancelSection}
          isEdit={this.state.isEdit}
          data={this.state.editData}
          secId={this.props.secId}
          secTitle={this.state.sectionTitle}
          rowId={this.state.items.length}
          keyProp={this.props.keyProp}
        />
      )
    });
  };
  addDocShow = () => {
    this.setState({
      activeComp: 1,
      isEdit: false,
      mycomponent: (
        <DocContentHome
          addContentData={this.addContentData}
          cancel={this.cancelSection}
          cancel={this.cancelSection}
          isEdit={this.state.isEdit}
          data={this.state.editData}
          secId={this.props.secId}
          secTitle={this.state.sectionTitle}
          rowId={this.state.items.length}
          keyProp={this.props.keyProp}
        />
      )
    });
  };

  editPaper = data => {
    this.setState({
      isEdit: true,
      activeComp: 1,
      editIndex: data.rowId,
      editSection: data.secId,
      mycomponent: (
        <AddPaper
          addPaper={this.addPaper}
          permissions={this.props.permissions}
          cancel={this.cancelSection}
          isEdit={true}
          data={this.PoolData[data.secId]["topics"][data.rowId]}
          secId={this.props.secId}
          secTitle={this.state.sectionTitle}
          rowId={this.state.items.length}
          keyProp={this.props.keyProp}
        />
      )
    });
  };
  editAssignment = data => {
    this.setState({
      isEdit: true,
      activeComp: 1,
      editIndex: data.rowId,
      editSection: data.secId,
      mycomponent: (
        <AssignmentContentHome
          addContentData={this.addContentData}
          cancel={this.cancelSection}
          isEdit={true}
          data={this.PoolData[data.secId]["topics"][data.rowId]}
          secId={this.props.secId}
          secTitle={this.state.sectionTitle}
          rowId={this.state.items.length}
          keyProp={this.props.keyProp}
        />
      )
    });
  };

  editLive = data => {
    this.setState({
      isEdit: true,
      activeComp: 1,
      editIndex: data.rowId,
      editSection: data.secId,
      mycomponent: (
        <LiveContentHome
          addContentData={this.addContentData}
          cancel={this.cancelSection}
          isEdit={true}
          data={this.PoolData[data.secId]["topics"][data.rowId]}
          secId={this.props.secId}
          secTitle={this.state.sectionTitle}
          rowId={this.state.items.length}
          keyProp={this.props.keyProp}
        />
      )
    });
  };

  editDocument = data => {
    this.setState({
      isEdit: true,
      activeComp: 1,
      editIndex: data.rowId,
      editSection: data.secId,
      mycomponent: (
        <DocContentHome
          addContentData={this.addContentData}
          cancel={this.cancelSection}
          isEdit={true}
          data={this.PoolData[data.secId]["topics"][data.rowId]}
          secId={this.props.secId}
          secTitle={this.state.sectionTitle}
          rowId={this.state.items.length}
          keyProp={this.props.keyProp}
        />
      )
    });
  };

  editMedia = data => {
    this.setState({
      isEdit: true,
      activeComp: 1,
      editIndex: data.rowId,
      editSection: data.secId,
      mycomponent: (
        <MediaContentHome
          addContentData={this.addContentData}
          cancel={this.cancelSection}
          isEdit={true}
          data={this.PoolData[data.secId]["topics"][data.rowId]}
          secId={this.props.secId}
          secTitle={this.state.sectionTitle}
          rowId={this.state.items.length}
          keyProp={this.props.keyProp}
        />
      )
    });
  };

  addContentData = (data, secRef) => {
    console.log("PoolData before adding content", this.PoolData);
    console.log("PoolData before adding content secRef", secRef);
    var items = secRef.items;
    var exam = [];

    if (secRef.edit) {
      this.setState({ isEdit: false, editData: null });

      let topic = this.state.editSection;
      let subTopic = this.state.editIndex;
      this.PoolData[topic]["topics"][subTopic] = {
        exam: exam,
        examDetails: data
      };

      var items = [...this.state.items];
      items[subTopic] = (
        <Papers
          title={data.title}
          // type={0}
          paperDelete={this.paperDelete}
          // remove={this.removeSection}
          // onData={this.sendData}
          // // onData={this.props.fetchData}
          editPaper={this.editMedia}
          secId={topic}
          secTitle={this.state.sectionTitle}
          rowId={subTopic}
          isEdit={this.state.isEdit}
        />
      );

      this.setState({ items });
    } else {
      this.addSection(data.title, data.type);
      if (this.PoolData[secRef.secId] == undefined) {
        this.PoolData[secRef.secId] = {};
      }
      if (this.PoolData[secRef.secId]["topics"] == undefined) {
        this.PoolData[secRef.secId]["topics"] = {};
      }
      if (this.PoolData[secRef.secId]["topics"][secRef.rowId] == undefined) {
        this.PoolData[secRef.secId]["topics"][secRef.rowId] = {};
      }
      this.PoolData[secRef.secId]["topics"][secRef.rowId] = {
        exam: exam,
        examDetails: data
      };
      console.log("PoolData after adding content", this.PoolData);
    }

    this.setState({ activeComp: 0 });
    this.props.fetchData(this.PoolData);
  };

  addPaper = data => {
    console.log("PoolData before adding paper", this.PoolData, data);

    var items = data.items;
    var exam = [];
    for (var q = 0; q < items.length; q++) {
      exam.push(items[q].props.qobj);
    }
    if (data.edit) {
      this.setState({ isEdit: false, editData: null });

      let topic = this.state.editSection;
      let subTopic = this.state.editIndex;
      this.PoolData[topic]["topics"][subTopic] = {
        exam: exam,
        examDetails: {
          max_score: 100,
          max_time: data.duration,
          min_score: data.minScore,
          title: data.title,
          info: data.info,
          instructions: data.ins,
          type: 0, // quiz
          isShuffle: data.isShuffle
        }
      };

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
          rowId={subTopic}
          isEdit={this.state.isEdit}
        />
      );

      this.setState({ items });
    } else {
      this.addSection(data.title, 0);
      if (this.PoolData[data.secId] == undefined) {
        this.PoolData[data.secId] = {};
      }
      if (this.PoolData[data.secId]["topics"] == undefined) {
        this.PoolData[data.secId]["topics"] = {};
      }
      if (this.PoolData[data.secId]["topics"][data.rowId] == undefined) {
        this.PoolData[data.secId]["topics"][data.rowId] = {};
      }

      this.PoolData[data.secId]["topics"][data.rowId] = {
        //  topicName: data.title,

        exam: exam,
        examDetails: {
          max_score: 100,
          max_time: data.duration,
          min_score: data.minScore,
          type: 0, // quiz
          title: data.title,
          info: data.info,
          instructions: data.ins,
          isShuffle: data.isShuffle
        }
      };
    }
    console.log("PoolData after adding paper", this.PoolData);

    this.setState({ activeComp: 0 });
    this.props.fetchData(this.PoolData);
  };

  paperClone = data => {
    var items = [...this.state.items];
    let deepcloned = clonedeep(this.PoolData[data.secId]["topics"][data.rowId]);

    this.PoolData[data.secId]["topics"][items.length] = deepcloned;
    this.PoolData[data.secId]["topics"][items.length]["examDetails"]["title"] =
      data.title;

    items.push(
      <Papers
        title={data.title}
        // type={0}
        // remove={this.removeSection}
        // onData={this.sendData}
        // // onData={this.props.fetchData}
        editPaper={this.editPaper}
        secId={data.secId}
        secTitle={this.state.sectionTitle}
        paperDelete={this.paperDelete}
        rowId={items.length}
        isEdit={this.state.isEdit}
      />
    );

    this.props.fetchData(this.PoolData);

    this.setState({ items });
  };

  paperDelete = data => {
    if (this.PoolData[data.secId]["topics"][data.rowId] != undefined) {
      delete this.PoolData[data.secId]["topics"][data.rowId]; // Removes json.foo from the dictionary.
      var items = [...this.state.items];
      delete items[data.rowId]; // Removes json.foo from the dictionary.

      this.props.fetchData(this.PoolData);

      this.setState({ items });
    }
  };
  onSortEnd = ({ oldIndex, newIndex }) => {
    console.log("active sort");
    if (this.state.activeComp == 0) {
      const { items } = this.state;

      this.setState({
        items: arrayMove(items, oldIndex, newIndex)
      });
      var dataClone = [];
      Object.keys(this.PoolData[this.props.secId]["topics"]).map(key => {
        dataClone.push(this.PoolData[this.props.secId]["topics"][key]);
      });
      dataClone = arrayMove(dataClone, oldIndex, newIndex);

      Object.keys(dataClone).map(key => {
        this.PoolData[this.props.secId]["topics"][key] = dataClone[key];
      });

      this.props.fetchData(this.PoolData);
    }
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
                  <div className="col">
                    <Dropdown
                      isOpen={this.state.dropdownOpen}
                      toggle={this.toggle}
                      {...(this.state.editName
                        ? { disabled: true }
                        : { disabled: false })}
                    >
                      <DropdownToggle
                        caret
                        className="fs-12"
                        {...(this.state.editName
                          ? { disabled: true }
                          : { disabled: false })}
                      >
                        Add element
                      </DropdownToggle>
                      {this.props.examsOnly ? (
                        <React.Fragment>
                          <DropdownMenu>
                            <DropdownItem className="pointer">
                              <span
                                onClick={this.addPaperShow}
                                className="ptb-10 fs-12"
                              >
                                Add Quiz{" "}
                              </span>
                            </DropdownItem>
                            <DropdownItem className="pointer">
                              {" "}
                              <span
                                onClick={this.addAssignShow}
                                className="ptb-10 fs-12"
                              >
                                Add Assignment{" "}
                              </span>
                            </DropdownItem>
                          </DropdownMenu>
                        </React.Fragment>
                      ) : this.props.mediaOnly ? (
                        <React.Fragment>
                          <DropdownMenu>
                            <DropdownItem className="pointer">
                              {" "}
                              <span
                                onClick={this.addMediaShow}
                                className="ptb-10 fs-12"
                              >
                                Add Media{" "}
                              </span>
                            </DropdownItem>
                          </DropdownMenu>
                        </React.Fragment>
                      ) : this.props.sessionOnly ? (
                        <React.Fragment>
                          <DropdownMenu>
                            <DropdownItem className="pointer">
                              {" "}
                              <span
                                onClick={this.addLiveShow}
                                className="ptb-10 fs-12"
                              >
                                Add Live{" "}
                              </span>
                            </DropdownItem>
                          </DropdownMenu>
                        </React.Fragment>
                      ) : this.props.sessionOnly && this.props.examsOnly ? (
                        <React.Fragment>
                          <DropdownMenu>
                            <DropdownItem className="pointer">
                              {" "}
                              <span
                                onClick={this.addMediaShow}
                                className="ptb-10 fs-12"
                              >
                                Add Media{" "}
                              </span>
                            </DropdownItem>
                            <DropdownItem className="pointer">
                              {" "}
                              <span
                                onClick={this.addDocShow}
                                className="ptb-10 fs-12"
                              >
                                Add Document
                              </span>
                            </DropdownItem>
                          </DropdownMenu>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <DropdownMenu>
                            <DropdownItem className="pointer">
                              <span
                                onClick={this.addPaperShow}
                                className="ptb-10 fs-12"
                              >
                                Add Quiz{" "}
                              </span>
                            </DropdownItem>
                            <DropdownItem className="pointer">
                              {" "}
                              <span
                                onClick={this.addAssignShow}
                                className="ptb-10 fs-12"
                              >
                                Add Assignment{" "}
                              </span>
                            </DropdownItem>
                            <DropdownItem className="pointer">
                              {" "}
                              <span
                                onClick={this.addMediaShow}
                                className="ptb-10 fs-12"
                              >
                                Add Media{" "}
                              </span>
                            </DropdownItem>
                            <DropdownItem className="pointer">
                              {" "}
                              <span
                                onClick={this.addDocShow}
                                className="ptb-10 fs-12"
                              >
                                Add Document
                              </span>
                            </DropdownItem>
                            <DropdownItem className="pointer">
                              {" "}
                              <span
                                onClick={this.addLiveShow}
                                className="ptb-10 fs-12"
                              >
                                Add Live{" "}
                              </span>
                            </DropdownItem>
                          </DropdownMenu>
                        </React.Fragment>
                      )}
                    </Dropdown>
                  </div>
                </div>
                <div className="lrp-0">
                  {this.state.items.length > 0 ? (
                    <SortableList
                      items={this.state.items}
                      onSortEnd={this.onSortEnd}
                      useDragHandle={true}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : this.state.mycomponent != null ? (
          this.state.mycomponent
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default CCSectionBody;
