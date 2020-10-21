import React, { Component } from "react";
import { db } from "../firebase/firebase";

class SidebarCourse extends Component {
  state = { content: null };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (this.props.content) {
      this.setState({ content: this.props.content });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.content) {
      this.setState({ content: nextProps.content });
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="p-15" style={{ borderBottom: "0.5px solid #8080804a" }}>
          <h5>Contents</h5>
        </div>

        {this.state.content
          ? Object.keys(this.state.content).map(key => (
              <React.Fragment>
                {" "}
                <div className="col p-15">
                  <h6 className="bm-0">{this.state.content[key].topicName}</h6>
                </div>
                {Object.keys(this.state.content[key]["topics"]).map(index => (
                  <React.Fragment>
                    <div
                      className="sidebar-pill pointer lrp-15"
                      onClick={
                        this.state.content[key]["topics"][index]["examDetails"][
                          "type"
                        ] == 0
                          ? () => this.props.selectContentPaper(key, index)
                          : () => this.props.selectSection(key, index)
                      }
                    >
                      {" "}
                      <span className=" pointer">
                        {" "}
                        <img
                          className="cc-icon"
                          src={
                            this.state.content[key]["topics"][index].examDetails
                              .contentType == "image"
                              ? require(`../assets/image/Media.png`)
                              : this.state.content[key]["topics"][index]
                                  .examDetails.contentType == "application"
                              ? require(`../assets/image/Document.png`)
                              : this.state.content[key]["topics"][index]
                                  .examDetails.type == 0
                              ? require(`../assets/image/Quiz.png`)
                              : this.state.content[key]["topics"][index]
                                  .examDetails.contentType == "video"
                              ? require(`../assets/image/Live.png`)
                              : this.state.content[key]["topics"][index]
                                  .examDetails.type == 3
                              ? require(`../assets/image/LiveVid.png`)
                              : null
                          }
                          alt="team member"
                          height="20"
                        />
                        &nbsp;&nbsp;
                        {
                          this.state.content[key]["topics"][index].examDetails
                            .title
                        }
                      </span>
                    </div>
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))
          : null}
      </React.Fragment>
    );
  }
}

export default SidebarCourse;
