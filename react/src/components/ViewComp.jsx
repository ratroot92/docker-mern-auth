import React, { Component } from "react";
import FileViewer from "react-file-viewer";

// const file =
//   "https://firebasestorage.googleapis.com/v0/b/medexpert-d7560.appspot.com/o/courses%2F-LfO2zbQkYaDnR1OGUsB%2FDocuments%2FWhatsApp%20Image%202019-05-16%20at%209.33.14%20AM.jpeg?alt=media&token=0edb0900-eb2a-4f87-8aee-952ee4b840df";
// const type = "jpeg";

class ViewComp extends Component {
  constructor(props) {
    super(props);
  }
  state = { URL: null, type: null, completed: false };
  componentDidMount() {
    this.setState({
      completed: false,

      URL: this.props.examData.URL,
      type: this.props.examData.ext,
      completed: true
    });
  }
  componentWillReceiveProps(nextProp) {
    this.setState({
      completed: false
    });
    this.setState({
      URL: nextProp.examData.URL,
      type: nextProp.examData.ext,
      completed: true
    });
  }
  render() {
    return (
      <React.Fragment>
        {this.state.completed ? (
          <FileViewer
            fileType={this.state.type}
            filePath={this.state.URL}
            // errorComponent={CustomErrorComponent}
            onError={this.onError}
          />
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }

  onError(e) {
    console.log(e, "error in file-viewer");
  }
}
export default ViewComp;
