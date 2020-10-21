import React, { Component } from "react";
class CheckBox extends Component {
  state = { checked: [] };
  render() {
    return (
      <label class="form-check-label" for={key}>
        <input
          type="checkbox"
          class="form-check-input"
          id={key}
          name={"option" + i}
          value={key}
          onClick={() =>
            this.handleToggle(i, this.state.current_question.options[key])
          }
          checked={
            this.state.radio_checked.length != undefined
              ? this.state.radio_checked.indexOf(i) != -1
              : true
          }
        />
        &nbsp;
        {"(" + String.fromCharCode("a".charCodeAt() + parseInt(i)) + ")"}
        &nbsp;&nbsp;
        {this.state.current_question.options[key]}{" "}
      </label>
    );
  }
}

export default CheckBox;
