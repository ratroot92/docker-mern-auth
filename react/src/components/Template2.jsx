import React, { Component } from "react";
import { db } from "../firebase/firebase";
import WebNotif from "./WebNotif";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});
var obj = new WebNotif();

class Template2 extends Component {
  state = {
    heading: "",
    section: "",
    explanation: "",
    editing: false,

    newKey: ""
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // db.ref(this.props.dblink)
    //   .orderByChild("type")
    //   .equalTo(2)
    //   .once("value")
    //   .then(snapshot => {
    //     this.setState({ section: snapshot.val() });
    //     this.setState({ showLoader: false });
    //   });
  }
  validateForm = data => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].value == null || data[i].value == "") {
        obj.createNotification("error", data[i].slug + " is required");
        return false;
        break;
      }
    }
    return true;
  };
  // addSection = () => {
  //   if (
  //     this.validateForm([
  //       { value: this.state.heading, slug: "Heading" },
  //       { value: this.state.explanation, slug: "Explanation" }
  //     ])
  //   ) {
  //     this.setState({ editing: false });

  //     if (this.state.newKey.length == 0) {
  //       var tempKey = db.ref(this.props.dblink).push().key;
  //       this.setState({ newKey: tempKey }, () => {
  //         db.ref(this.props.dblink + this.state.newKey)
  //           .set({
  //             title: this.state.heading,
  //             data: { detail: this.state.explanation },
  //             type: 2
  //           })
  //           .then(e => {
  //             var section = { ...this.state.section };
  //             section[this.state.newKey] = {
  //               title: this.state.heading,
  //               data: { detail: this.state.explanation },
  //               type: 2
  //             };
  //             this.setState({
  //               section: section,
  //               heading: "",
  //               explanation: "",
  //               newKey: ""
  //             });
  //             var obj = new WebNotif();
  //             obj.createNotification("success", "Section Added");
  //           });
  //       });
  //     } else {
  //       db.ref(this.props.dblink + this.state.newKey)
  //         .set({
  //           title: this.state.heading,
  //           data: { detail: this.state.explanation },
  //           type: 2
  //         })
  //         .then(e => {
  //           var section = { ...this.state.section };
  //           section[this.state.newKey] = {
  //             title: this.state.heading,
  //             data: { detail: this.state.explanation },
  //             type: 2
  //           };
  //           this.setState({
  //             section: section,
  //             heading: "",
  //             explanation: "",
  //             newKey: ""
  //           });
  //           var obj = new WebNotif();
  //           obj.createNotification("success", "Section Updated");
  //         });
  //     }
  //   }
  // };
  // deleteSection = key => {
  //   confirmAlert({
  //     title: "Confirm to submit",
  //     message: "Are you sure to do this.",
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: () => {
  //           db.ref(this.props.dblink + key).set(null);
  //           var section = { ...this.state.section };
  //           delete section[key];
  //           this.setState({ section });
  //           var obj = new WebNotif();
  //           obj.createNotification("success", "Section Deleted");
  //         }
  //       },
  //       {
  //         label: "No",
  //         onClick: () => {}
  //       }
  //     ]
  //   });
  // };

  // editSection = key => {
  //   this.setState({ editing: true });

  //   Object.keys(this.state.section[key].data).map(key1 => {
  //     this.setState({ explanation: this.state.section[key].data[key1] });
  //   });
  //   this.setState(
  //     { newKey: key, heading: this.state.section[key].title },
  //     () => {}
  //   );
  // };
  render() {
    return (
      <React.Fragment>
        <WebNotif />
        <section>
          <div className="row">
            <div className="col-sm-12">
              {this.state.section == null
                ? ""
                : Object.keys(this.state.section).map(key => (
                    <div className="accordion-group">
                      <div className="accordion-heading admin_faq">
                        <div className="row">
                          <div className="col-md-10">
                            <a
                              className="accordion-toggle faq no_border"
                              data-toggle="collapse"
                              data-parent="toggle"
                              href={"#" + key}
                            >
                              <i className="fa fa-align-justify" />
                              &nbsp; &nbsp; {this.state.section[key].title}
                            </a>
                          </div>
                          <div className="col-md-2 pt-7">
                            <i
                              className="fa fa-pencil-square-o clr-darkpurple pointer"
                              onClick={() => this.editSection(key)}
                            />
                            &nbsp; &nbsp; &nbsp; &nbsp;
                            <i
                              className="fa fa-trash clr-darkpurple pointer "
                              onClick={() => this.deleteSection(key)}
                            />
                            &nbsp; &nbsp;
                          </div>
                        </div>
                      </div>
                      <div
                        id={key}
                        className="accordion-body faq-body collapse in"
                      >
                        <div className="accordion-inner">
                          {this.state.section[key].data == null
                            ? ""
                            : Object.keys(this.state.section[key].data).map(
                                key1 => this.state.section[key].data[key1]
                              )}
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </section>
        <section>
          <div className="row">
            <div className="col-sm-12">
              <div className="card br-7 p-10">
                <div className="row lrm-0">
                  <div className="col-md-12 p-0">
                    <input
                      type="text"
                      className="form-control no_border fs-14 faq_add_question"
                      placeholder="Heading *"
                      value={this.state.heading}
                      onChange={event =>
                        this.setState(byPropKey("heading", event.target.value))
                      }
                    />
                  </div>
                </div>
                <hr className="mt-0_5" />
                <div className="col-md-12">
                  <textarea
                    className="form-control no_border fs-14"
                    rows="2"
                    placeholder="Explanation *"
                    value={this.state.explanation}
                    onChange={event =>
                      this.setState(
                        byPropKey("explanation", event.target.value)
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <br />
        <div className="row">
          <button
            className="btn btn-green white fs-14 width-100p"
            onClick={this.addSection}
          >
            {this.state.editing ? "Save" : "Add Section"}{" "}
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Template2;
