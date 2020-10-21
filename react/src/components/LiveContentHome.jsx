import React, { Component } from "react";
import WebNotif from "./WebNotif";
import DatePicker from "react-datepicker";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});
var obj = new WebNotif();

class LiveContentHome extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    sessionName: null,
    info: null,
    instructions: null,
    sessionURL: null,
    duration: null,
    startTime: null,
    endTime: null
  };
  componentDidMount() {
    if (this.props.isEdit) {
      var data = this.props.data.examDetails;

      this.setState({
        sessionName: data.title,
        info: data.info,
        instructions: data.instructions,
        sessionURL: data.sessionURL,
        duration: data.duration,
        startDate: new Date(data.startTime),
        endDate: new Date(data.endTime)
      });
    }
  }
  handleChangeStart = startDate => {
    this.setState({ startDate: startDate });
  };
  handleChangeEnd = endDate => {
    this.setState({ endDate: endDate });
  };
  saveSession = () => {
    // var data = {
    //   title: this.state.sessionName,
    //   info: this.state.info,
    //   instructions: this.state.instructions,
    //   sessionURL: this.state.sessionURL,
    //   duration: this.state.duration,
    //   startTime: new Date(this.state.startTime).toISOString(),
    //   endTime: new Date(this.state.endTime).toISOString()
    // };
    if (this.props.isEdit) {
      this.props.addContentData(
        {
          title: this.state.sessionName,
          info: this.state.info,
          instructions: this.state.instructions,
          sessionURL: this.state.sessionURL,
          duration: this.state.duration,
          startTime: new Date(this.state.startTime).toISOString(),
          endTime: new Date(this.state.endTime).toISOString(),

          type: 3 //Live video
        },
        {
          edit: true,
          secId: this.props.secId,
          rowId: this.props.rowId,
          items: this.state.items
        }
      );
    } else {
      this.props.addContentData(
        {
          title: this.state.sessionName,
          info: this.state.info,
          instructions: this.state.instructions,
          sessionURL: this.state.sessionURL,
          duration: this.state.duration,
          startTime: new Date(this.state.startTime).toISOString(),
          endTime: new Date(this.state.endTime).toISOString(),

          type: 3 //Live video
        },
        {
          secId: this.props.secId,
          rowId: this.props.rowId,
          items: this.state.items
        }
      );
    }
  };
  render() {
    return (
      <React.Fragment>
        <WebNotif />

        <div className="col-md-12">
          <div className=" col-md-12">
            <div className="row">
              <div className="col-md-7">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.sessionName}
                    placeholder="Enter Session Name Here*"
                    onChange={event =>
                      this.setState(
                        byPropKey("sessionName", event.target.value)
                      )
                    }
                  />
                </div>
              </div>

              <div className="col-md-5">
                {/* <button className="btn btn-white fix_width_btn  btn-transparent black admin-btn">
                  Bulk Upload
                </button>{" "} */}
                <button
                  className="btn btn-white fix_width_btn  btn-transparent black admin-btn"
                  onClick={this.saveSession}
                >
                  Save Session
                </button>{" "}
                &nbsp; &nbsp;
                <button
                  className="btn white  fix_width_btn  btn-red black admin-btn"
                  onClick={this.props.cancel}
                >
                  Cancel{" "}
                </button>{" "}
              </div>
            </div>
          </div>
          <hr className="hr-2" />
          <div className="col-md-12">
            <form className="form-row lrp-0">
              <div className="col-md-12">
                <div className="form-group">
                  <label>
                    <b>Detail</b>
                    {/* <span className="clr-red">*</span> */}
                  </label>

                  <textarea
                    type="text"
                    className="form-control"
                    value={this.state.info}
                    placeholder="Enter Session info"
                    onChange={event =>
                      this.setState(byPropKey("info", event.target.value))
                    }
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    <b>Instructions</b>
                    {/* <span className="clr-red">*</span> */}
                  </label>

                  <textarea
                    type="text"
                    className="form-control"
                    value={this.state.instructions}
                    placeholder="Enter Session instructions"
                    onChange={event =>
                      this.setState(
                        byPropKey("instructions", event.target.value)
                      )
                    }
                  />
                </div>
              </div>
              <div className="col-md-3 ">
                <div className="form-group">
                  <label>
                    <b>Session URL</b>
                    <span className="clr-red">*</span>
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Enter Session URL here"
                    value={this.state.sessionURL}
                    onChange={event =>
                      this.setState(byPropKey("sessionURL", event.target.value))
                    }
                  />
                </div>
              </div>

              <div className="col-md-3 ">
                <div className="form-group">
                  <label>
                    <b>Duration</b>(min)
                    <span className="clr-red">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    placeholder="Duration (min)"
                    value={this.state.duration}
                    onChange={event =>
                      this.setState(byPropKey("duration", event.target.value))
                    }
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <b>Start Date</b>
                  <span className="clr-red">*</span> <br />
                  <DatePicker
                    showTimeSelect
                    className="form-control"
                    selected={this.state.startDate}
                    dateFormat="Pp"
                    onChange={this.handleChangeStart}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <b>End Date</b>
                  <span className="clr-red">*</span> <br />
                  <DatePicker
                    className="form-control"
                    selected={this.state.endDate}
                    dateFormat="Pp"
                    onChange={this.handleChangeEnd}
                    showTimeSelect
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LiveContentHome;
