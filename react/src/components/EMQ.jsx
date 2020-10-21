import React, { Component } from "react";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});
class EMQ extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    options: null,
    data: null
  };
  componentDidMount() {
    this.setState({
      options: this.props.options
    });
    if (this.props.isEdit) {
      this.setState({
        options: this.props.options,
        Question: this.props.emqObj.question,
        answer: this.props.emqObj.answer,
        explanation: this.props.emqObj.explanation
          ? this.props.emqObj.explanation
          : ""
      });
    }
    if (this.props.data != undefined) {
      let answer =
        this.props.data.answer != undefined
          ? this.props.data.answer.split("option")[1]
          : "";

      this.setState({
        options: this.props.data.options,
        Question: this.props.data.question,
        answer: answer,
        explanation: this.props.data.explanation
          ? this.props.data.explanation
          : ""
      });
    }
  }
  componentWillReceiveProps(nprops) {
    if (nprops.data != undefined) {
      let answer =
        nprops.data.answer != undefined
          ? nprops.data.answer.split("option")[1]
          : "";
      this.setState({
        options: nprops.data.options,
        Question: nprops.data.question,
        answer: answer,
        explanation: this.props.data.explanation
          ? this.props.data.explanation
          : ""
      });
    }

    this.setState({ options: nprops.options });
  }
  setAnswer = event => {
    this.setState({ answer: event.target.value });
    this.props.emqData({
      id: this.props.id,
      answer: event.target.value
    });
  };
  setQuestion = event => {
    this.setState({ Question: event.target.value });
    this.props.emqData({
      id: this.props.id,
      question: event.target.value
    });
  };
  setExplanation = event => {
    this.setState({ explanation: event.target.value });
    this.props.emqData({
      id: this.props.id,
      explanation: event.target.value
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-6">
            <h5>Question &nbsp;{this.props.index}</h5>
          </div>
          <div className="col-md-6 pointer">
            <span onClick={() => this.props.removeEmq(this.props.id)}>
              <i className="fa fa-trash" />
            </span>
          </div>
        </div>

        <div className="form-group">
          <label>
            Question <span className="clr-red">*</span>
          </label>
          <textarea
            required
            className="form-control admin-form-control"
            rows="6"
            value={this.state.Question}
            placeholder="Enter question here"
            onChange={event => this.setQuestion(event)}
          />
        </div>
        <div className="form-group">
          <label>
            Answer <span className="clr-red">*</span>
          </label>
          <select
            className="form-control admin-form-control"
            id="exampleFormControlSelect1"
            value={this.state.answer}
            onChange={event => this.setAnswer(event)}
          >
            <option value="">Select Answer</option>
            {this.state.options != null
              ? Object.keys(this.state.options).map(key =>
                  this.state.options[key].text != "" ? (
                    <option value={this.state.options[key].index}>
                      {this.state.options[key].text}
                    </option>
                  ) : (
                    ""
                  )
                )
              : ""}
          </select>
        </div>
        <div className="form-group">
          <label>
            Explanation <span className="clr-red">*</span>
          </label>
          <textarea
            required
            className="form-control admin-form-control"
            rows="4"
            value={this.state.explanation}
            placeholder="Enter explanation here"
            onChange={event => this.setExplanation(event)}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default EMQ;
