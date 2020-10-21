import React, { Component } from "react";
import { db } from "../firebase/firebase";
import WebNotif from "./WebNotif";
import Loader from "./loader";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});
var obj = new WebNotif();

class Template1 extends Component {
  state = {
    heading: "",
    section: "",
    newKey: "",
    editing: false,
    showLoader: false,
    bulletPoint: [{ index: 0, text: "" }]
  };
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   db.ref(this.props.dblink)
  //     .orderByChild("type")
  //     .equalTo(1)
  //     .once("value")
  //     .then(snapshot => {
  //       this.setState({ section: snapshot.val() });
  //       this.setState({ showLoader: false });
  //     });
  // }
  // validateForm = data => {
  //   for (let i = 0; i < data.length; i++) {
  //     if (data[i].value == null || data[i].value == "") {
  //       obj.createNotification("error", data[i].slug + " is required");
  //       return false;
  //       break;
  //     }
  //   }
  //   return true;
  // };
  // addSection = () => {
  //   if (this.validateForm([{ value: this.state.heading, slug: "Heading" }])) {
  //     if (this.state.newKey.length == 0) {
  //       var tempKey = db.ref(this.props.dblink).push().key;
  //       this.setState({ newKey: tempKey }, () => {
  //         var my_json = {};
  //         for (var i = 0; i < this.state.bulletPoint.length - 1; i++) {
  //           my_json["af-" + i] = this.state.bulletPoint[i].text;
  //         }
  //         db.ref(this.props.dblink + this.state.newKey)
  //           .set({
  //             title: this.state.heading,
  //             data: my_json,
  //             type: 1
  //           })
  //           .then(e => {
  //             var section = { ...this.state.section };
  //             section[this.state.newKey] = {
  //               title: this.state.heading,
  //               data: my_json,
  //               type: 1
  //             };
  //             this.setState({
  //               section: section,
  //               heading: "",
  //               bulletPoint: [{ index: 0, text: "" }],
  //               newKey: ""
  //             });
  //             var obj = new WebNotif();
  //             obj.createNotification("success", "Section Added");
  //           });
  //       });
  //     } else {
  //       var my_json = {};
  //       for (var i = 0; i < this.state.bulletPoint.length - 1; i++) {
  //         my_json["af-" + i] = this.state.bulletPoint[i].text;
  //       }

  //       db.ref(this.props.dblink + this.state.newKey)
  //         .set({
  //           title: this.state.heading,
  //           data: my_json,
  //           type: 1
  //         })
  //         .then(e => {
  //           var section = { ...this.state.section };
  //           section[this.state.newKey] = {
  //             title: this.state.heading,
  //             data: my_json,
  //             type: 1
  //           };
  //           this.setState({
  //             section: section,
  //             heading: "",
  //             bulletPoint: [{ index: 0, text: "" }],
  //             newKey: ""
  //           });
  //           var obj = new WebNotif();
  //           obj.createNotification("success", "Section Updated");
  //         });
  //     }
  //     this.setState({ editing: false });
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

  // addBulletPoint = (data, index) => {
  //   var bulletPoint = [...this.state.bulletPoint];
  //   bulletPoint[index].text = data;
  //   var len = bulletPoint.length;
  //   if (len == index + 1) {
  //     bulletPoint.push({ index: len, text: "" });
  //   }
  //   this.setState({ bulletPoint });
  // };
  // editSection = key => {
  //   this.setState({ editing: true });

  //   var index = 0;
  //   var bulletPoint = [];
  //   Object.keys(this.state.section[key].data).map(key1 => {
  //     if (this.state.section[key].data[key1].length != "") {
  //       bulletPoint.push({
  //         index: index,
  //         text: this.state.section[key].data[key1]
  //       });
  //       index = index + 1;
  //     }
  //   });
  //   bulletPoint.push({
  //     index: index,
  //     text: ""
  //   });
  //   this.setState({ bulletPoint });

  //   this.setState(
  //     {
  //       newKey: key,
  //       heading: this.state.section[key].title
  //     },
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
                    <div className="accordion-group" key={key}>
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
                          <ul>
                            {this.state.section[key].data == null
                              ? ""
                              : Object.keys(this.state.section[key].data).map(
                                  key1 => (
                                    <li key={key1}>
                                      {this.state.section[key].data[key1]}
                                    </li>
                                  )
                                )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </section>
        <section>
          <div className="row">
            <div className="col-sm-12 mtb-10">
              <input
                type="text"
                className="form-control fs-14"
                placeholder="Heading *"
                value={this.state.heading}
                onChange={event =>
                  this.setState(byPropKey("heading", event.target.value))
                }
              />
            </div>
            {this.state.bulletPoint.length == 0
              ? ""
              : this.state.bulletPoint.map((key, idx) => {
                  return (
                    <div className="col-sm-12 mtb-10" key={key}>
                      <input
                        type="text"
                        className="form-control fs-14 m-20"
                        placeholder="Bullet point *"
                        value={this.state.bulletPoint[idx].text}
                        onChange={event =>
                          this.addBulletPoint(event.target.value, idx)
                        }
                      />
                    </div>
                  );
                })}
          </div>
        </section>
        <br />
        <div className="row">
          <button
            className="btn btn-green white fs-14 width-100p"
            onClick={this.addSection}
          >
            {this.state.editing ? "Save " : "Add Section"}{" "}
          </button>
        </div>
        <Loader showLoader={this.state.showLoader} />
      </React.Fragment>
    );
  }
}

export default Template1;
