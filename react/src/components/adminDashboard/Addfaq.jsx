import React, { Component } from "react";
import Loader from "../loader";
import { db } from "../../firebase/firebase";
import WebNotif from "../WebNotif";
import Unauthorized from "../Unauthorized";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});
class Addfaq extends Component {
  state = {
    faqs: [],
    test: "",
    question: "",
    answer: "",
    showLoader: true,
    newKey: "",
    courseKey: "",
    isEdit: false
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // if (
    //   !(this.props.permissions != undefined && this.props.permissions["read"])
    // ) {
    //   this.setState({ redirect: true });
    //   return;
    // } else {
    //   this.setState({ courseTitle: this.props.courseTitle });

    //   db.ref(this.props.keyProp + "faq")
    //     .once("value")
    //     .then(snapshot => {
    //       this.setState({ faqs: snapshot.val() });
    //       this.setState({ showLoader: false });
    //     });
    // }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ courseTitle: nextProps.courseTitle });
  }
  validateForm = data => {
    var obj = new WebNotif();
    for (let i = 0; i < data.length; i++) {
      if (data[i].value == null || data[i].value == "") {
        obj.createNotification("error", data[i].slug + " is required");
        return false;
        break;
      }
    }
    return true;
  };

  addFaq = () => {
    if (
      this.validateForm([
        { value: this.state.question, slug: "Question" },
        { value: this.state.answer, slug: "Answer" }
      ])
    ) {
      // if (this.state.newKey.length == 0) {
      //    var tempKey = db.ref(this.props.keyProp + `faq`).push().key;
      //   this.setState({ newKey: tempKey }, () => {
      //     db.ref(this.props.keyProp + `faq/` + this.state.newKey)
      //       .set({
      //         question: this.state.question,
      //         answer: this.state.answer
      //       })
      //       .then(e => {
              var faq ={ ...this.state.faqs };//talha this.state.faqs.push( { ...this.state.faqs })
             // this.setState({newKey:this.state.newKey+1});//talha
              faq[this.state.newKey] = {
                question: this.state.question,
                answer: this.state.answer
              };
              this.setState({
                faqs: faq,
                question: "",
                answer: "",
                newKey: ""
              });
      //         var obj = new WebNotif();
      //         obj.createNotification("success", "FAQ Added");
      //       });
      //   });
      // } else {
      //   db.ref(this.props.keyProp + `faq/` + this.state.newKey)
      //     .set({
      //       question: this.state.question,
      //       answer: this.state.answer
      //     })
      //     .then(e => {
      //       var faq = { ...this.state.faqs };
      //       faq[this.state.newKey] = {
      //         question: this.state.question,
      //         answer: this.state.answer
      //       };
      //       this.setState({
      //         faqs: faq,
      //         question: "",
      //         answer: "",
      //         newKey: "",
      //         isEdit: false
      //       });
      //       var obj = new WebNotif();
      //       obj.createNotification("success", "FAQ Updated");
      //     });
      // }
    }
  };
  deleteFaq = key => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            // db.ref(this.props.keyProp + `faq/` + key).set(null);
            // var faq = { ...this.state.faqs };
            // delete faq[key];
            // this.setState({ faqs: faq });
            var obj = new WebNotif();
            obj.createNotification("success", "FAQ Deleted");
          }
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  };

  editFaq = key => {
    this.setState(
      {
        newKey: key,
        question: this.state.faqs[key].question,
        answer: this.state.faqs[key].answer,
        isEdit: true
      },
      () => {}
    );
  };
  // publishCourse = () => {
  //   db.ref(this.props.keyProp + `isShown`)
  //     .set(true)
  //     .then(c => {
  //       alert("Course Publised");
  //     });
  // };
  cancelState = () => {
    this.setState({
      question: "",
      answer: "",
      newKey: "",
      isEdit: false
    });
  };
  render() {
    return (
      <React.Fragment>
        {this.state.redirect ? (
          <Unauthorized />
        ) : (
          <React.Fragment>
            <WebNotif />
            <section>
              <div className=" col-md-12">
                <div className="row">
                  <div className="col-md-7">
                    <h5 className="card-title regular_font">FAQs</h5>
                    {/* <div className="col lrp-0">
                      <span>
                        <b>Course title:</b>
                        {this.state.courseTitle != undefined
                          ? " (" + this.state.courseTitle + ")"
                          : ""}
                      </span>
                    </div> */}
                  </div>
                  <div className="col-md-5 lrp-0">
                    <button className="btn admin-btn-green fix_width_btn white admin-btn">
                      Save
                    </button>
                    &nbsp; &nbsp;
                    <button
                      className="btn fix_width_btn btn_color_border admin-btn"
                      onClick={this.publishCourse}
                    >
                     Add New FAQ
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-12">
                  {this.state.faqs == null
                    ? ""
                    : Object.keys(this.state.faqs).map(key => (
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
                                  &nbsp; &nbsp; {this.state.faqs[key].question}
                                </a>
                              </div>
                              <div className="col-md-2 pt-7">
                                {this.props.permissions["update"] ? (
                                  <i
                                    className="fas fa-edit co_admin pointer"

                                    onClick={() => this.editFaq(key)}
                                  />
                                ) : (
                                  <i className="fas fa-edit co_admin pointer disabled" />
                                )}
                                &nbsp; &nbsp; &nbsp; &nbsp;
                                {this.props.permissions["delete"] ? (
                                  <i className="fa fa-trash co_admin" aria-hidden="true"   onClick={() => this.deleteFaq(key)}    />
                                ) : (
                                  <i className="fa fa-trash clr-darkpurple disabled " />
                                )}
                                &nbsp; &nbsp;
                              </div>
                            </div>
                          </div>
                          <div id={key} className="collapse">
                            <div className="accordion-inner accordion-body faq-body in">
                              {this.state.faqs[key].answer}
                            </div>
                          </div>
                        </div>
                      ))} 
                </div>
              </div>
            </section>
            {this.props.permissions["add"] || this.state.isEdit ? (
              <section>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="card br-7 p-10">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="input-group">
                            <div className="input-group-prepend icon-adjustment">
                              <i className="fa fa-align-justify" />
                            </div>
                            <input
                              type="text"
                              className="form-control no_border fs-14 faq_add_question"
                              placeholder="Enter question here *"
                              value={this.state.question}
                              onChange={event =>
                                this.setState(
                                  byPropKey("question", event.target.value)
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <hr className="mt-0_5" />
                      <div className="col-md-12">
                        <textarea
                          className="form-control no_border fs-14"
                          rows="2"
                          placeholder="Enter answer here *"
                          value={this.state.answer}
                          onChange={event =>
                            this.setState(
                              byPropKey("answer", event.target.value)
                            )  }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-4">
                      <button
                        className="btn admin-btn-green fix_width_btn white fz_13 bold"
                        onClick={this.addFaq}
                      >
                        Submit
                      </button>
                    </div>
                    {this.state.isEdit == true ? (
                      <div className="col-md-4">
                        <button
                          className="btn btn-red fs-12 white"
                          onClick={this.cancelState}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </section>
            ) : (
              ""
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Addfaq;
