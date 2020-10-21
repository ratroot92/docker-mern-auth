import React, { Component } from "react";
import { db } from "../firebase/firebase";
import CreatableSelect from "react-select/lib/Creatable";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});
class DragableDiv extends Component {
  constructor(props) {
    super(props);
  }
  state = { tag_options: [], subTopic: null, selectedOption: [] };
  componentDidMount() {
    if (this.props.topics != undefined) {
      this.setState({ tag_options: this.props.topics });
    }

    if (this.props.isEdit) {
    }
    if (this.props.data != undefined) {
      if (this.props.data.examDetails.title.indexOf("/") == -1) {
        var new_option = {
          value: this.props.data.examDetails.title,
          label: this.props.data.examDetails.title
        };
        var selectedOption = [...this.state.selectedOption];
        selectedOption.push(new_option);
        this.setState({ selectedOption });
      } else {
        var sp = this.props.data.examDetails.title.split("/");
        var new_option = {
          value: sp[0] + "~" + sp[1],
          label: sp[1]
        };
        var selectedOption = [...this.state.selectedOption];
        selectedOption.push(new_option);
        this.setState({ selectedOption });
      }
    }
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    if (selectedOption.value.indexOf("~") == -1) {
      this.props.onData(
        null,
        selectedOption.value,
        this.props.secId,
        this.props.rowId,
        this.props.secTitle
      );
    } else {
      var split = selectedOption.value.split("~");
      this.props.onData(
        split[0],
        split[1],
        this.props.secId,
        this.props.rowId,
        this.props.secTitle
      );
    }
    this.props.handleSelectedTopic(selectedOption.value.replace("~", "/"), {
      secId: this.props.secId,
      rowId: this.props.rowId,
      secTitle: this.props.secTitle
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="col-md-11 lrp-0 ">
          <div className="row lrm-0">
            <div className="col-md-7 lrp-0">
              <div className="col-md-8">
                {/* <select
                  class="form-control admin-form-control"
                  id="exampleFormControlSelect1"
                  onChange={event =>
                    this.props.onData(
                      event.target.value,
                      this.props.secId,
                      this.props.rowId,
                      this.props.secTitle
                    )
                  }
                >
                  <option selected>Sub Topics</option>
                  {this.state.tag_options == null
                    ? ""
                    : Object.keys(this.state.tag_options).map((key, index) => (
                        <option
                          value={this.state.tag_options[key].value}
                          selected={
                            this.props.data != undefined
                              ? this.props.data.examDetails.title ==
                                this.state.tag_options[key].value
                              : false
                          }
                        >
                          {this.state.tag_options[key].value}
                        </option>
                      ))}
                </select> */}
                {this.state.tag_options.length > 0 ? (
                  <CreatableSelect
                    value={this.state.selectedOption}
                    onChange={this.handleChange}
                    options={this.state.tag_options}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-md-5 lrp-0">
              <div className="row lrm-0">
                {this.props.type > 0 ? (
                  <React.Fragment>
                    <span className="float-right">
                      <i
                        className="fa fa-pencil clr-darkpurple"
                        aria-hidden="true"
                      />{" "}
                      Edit &nbsp;|&nbsp;&nbsp;
                    </span>
                    <span className="float-right">
                      <i
                        className="fa fa-clone clr-darkpurple"
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
                  <i
                    className="fa fa-trash clr-darkpurple"
                    aria-hidden="true"
                  />{" "}
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
export default DragableDiv;
