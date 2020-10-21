import React, { Component } from "react";
class RoleOptions extends Component {
  componentDidMount() {}
  render() {
    return (
      <React.Fragment>
        {this.props.permiss == null ? (
          ""
        ) : (
          <table className="table table-bordered">
            <tbody>
              {Object.keys(this.props.permiss).map(key => (
                <tr key={key}>
                  <td>
                    <b>{key}</b>
                  </td>
                  {Object.keys(this.props.permiss[key]).map(subKey => (
                    <td>
                      {Object.keys(this.props.permiss[key][subKey]).length >
                      1 ? (
                        ""
                      ) : (
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={key + "-" + subKey}
                            onChange={() =>
                              this.props.handleToggle(key, subKey, "")
                            }
                            checked={this.props.permiss[key][subKey]}
                          />
                          <label
                            className="form-check-label"
                            for={key + "-" + subKey}
                          >
                            {subKey}
                          </label>
                        </div>
                      )}
                         {Object.keys(this.props.permiss[key][subKey]).length > 1
                        ? Object.keys(this.props.permiss[key][subKey]).map(
                            test => (
                              <React.Fragment>
                                <div className="form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={key + "-" + subKey + "-" + test}
                                    onChange={() =>
                                      this.props.handleToggle_deep(
                                        key,
                                        subKey,
                                        test
                                      )
                                    }
                                    checked={
                                      this.props.permiss[key][subKey][test]
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    for={key + "-" + subKey + "-" + test}
                                  >
                                    {subKey + " " + test}
                                  </label>
                                </div>
                              </React.Fragment>
                            )
                          )
                        : ""}
                    </td>
                  ))}
                  <br />
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </React.Fragment>
    );
  }
}
export default RoleOptions;
