import React, { Component } from "react";
import { db } from "../firebase/firebase";
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});
class Topics extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    tag_options: [],
    subTopic: null,
    editName: true,
    sectionTitle: null,
    sectionName: null
  };
  componentDidMount() {
    this.setState({
      isEdit: this.props.isEdit,
      data: this.props.subdata
    });
    if (this.props.isEdit) {
      this.setState({ sectionName: this.props.subdata.subTopic });
      this.setState({ editName: false, sectionTitle: this.state.sectionName });
    }
  }
  editName = () => {
    this.setState({ editName: true });
  };
  saveName = () => {
    this.props.onData(this.state.sectionName, this.props.secId);
    this.setState({ editName: false, sectionTitle: this.state.sectionName });
  };
  render() {
    return (
      <React.Fragment>
        <div className="col-md-11 lrp-0 ">
          <div className="row lrm-0">
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
            <div className="col-md-3 lrp-0">
              <div className="row lrm-0">
                {this.props.type > 0 ? (
                  <React.Fragment>
                    <span className="float-right">
                      <i
                        class="fa fa-pencil clr-darkpurple"
                        aria-hidden="true"
                      />{" "}
                      Edit &nbsp;|&nbsp;&nbsp;
                    </span>
                    <span className="float-right">
                      <i
                        class="fa fa-clone clr-darkpurple"
                        aria-hidden="true"
                      />{" "}
                      Duplicate &nbsp;|&nbsp;&nbsp;
                    </span>
                  </React.Fragment>
                ) : (
                  ""
                )}
                <span
                  className="float-right pointer"
                  onClick={() =>
                    this.props.remove(
                      this.props.secId,
                      this.props.rowId,
                      this.props.secTitle
                    )
                  }
                >
                  <i class="fa fa-trash clr-darkpurple" aria-hidden="true" />{" "}
                  Delete
                </span>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Topics;
