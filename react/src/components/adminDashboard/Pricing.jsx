import React, { Component } from "react";
// import { db } from "../firebase/firebase";
import Select from "react-select";
import WebNotif from "../WebNotif";
import Loader from "../loader";
import Unauthorized from "../Unauthorized";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});
class Pricing extends Component {
  state = {
    pricing_info: [],
    // planName: "",
    planType: 1,
    planName: "",
    showLoader: false,
    planDescription: "",
    planPrice: 0,
    planDiscount: 0,
    basePlan: null,
    editKey: null,
    options: [
      { value: 1, label: "Free" },
      { value: 2, label: "Subscription" },
      { value: 3, label: "One Time Purchase" },
      { value: 4, label: "Payment Plan" }
    ],
    monthOptions: [
      { value: 1, label: "1 Month" },
      { value: 2, label: "2 Months" },
      { value: 3, label: "3 Months" },
      { value: 4, label: "4 Months" },
      { value: 5, label: "5 Months" },
      { value: 6, label: "6 Months" },
      { value: 7, label: "7 Months" },
      { value: 8, label: "8 Months" },
      { value: 9, label: "9 Months" },
      { value: 10, label: "10 Months" },
      { value: 11, label: "11 Months" },
      { value: 12, label: "12 Months" }
    ],
    months: [
      { value: 1, label: "1 Month" },
      { value: 2, label: "2 Months" },
      { value: 3, label: "3 Months" },
      { value: 4, label: "4 Months" },
      { value: 5, label: "5 Months" },
      { value: 6, label: "6 Months" },
      { value: 7, label: "7 Months" },
      { value: 8, label: "8 Months" },
      { value: 9, label: "9 Months" },
      { value: 10, label: "10 Months" },
      { value: 11, label: "11 Months" },
      { value: 12, label: "12 Months" }
    ],
    coptions: [{ value: 1, label: "$" }],
    selectedOption: { value: 1, label: "Free" },
    monthSelectedOption: { value: null, label: "Choose Month" },
    cselectedOption: { value: 1, label: "$" }
  };
  constructor(props) {
    super(props);
  }
  // handleChange = selectedOption => {
  //   this.setState({ selectedOption });
  // };
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ courseTitle: nextProps.courseTitle });
  // }
  // monthHandleChange = monthSelectedOption => {
  //   this.setState({ monthSelectedOption });
  // };
  // chandleChange = cselectedOption => {
  //   this.setState({ cselectedOption });
  // };
  // //this.props.keyProp
  // componentDidMount() {
  //   if (
  //     !(this.props.permissions != undefined && this.props.permissions["read"])
  //   ) {
  //     this.setState({ redirect: true });
  //     return;
  //   } else {
  //     this.setState({ courseTitle: this.props.courseTitle });

  //     db.ref("courses/" + this.props.keyProp + "/pricing")
  //       .orderByChild("isShown")
  //       .equalTo(true)
  //       .once("value")
  //       .then(snapshot => {
  //         if (snapshot.val() !== null) {
  //           let pricing_info = snapshot.val();
  //           delete pricing_info["basePlan"];
  //           this.setState({
  //             basePlan: snapshot.child("basePlan").val(),
  //             pricing_info: pricing_info
  //           });
  //           var monthOptions = this.state.months;

  //           monthOptions = monthOptions.filter(monthOption => {
  //             return !Boolean(
  //               Object.values(pricing_info).find(plan => {
  //                 return monthOption.value === plan.month;
  //               })
  //             );
  //           });
  //           this.setState({ monthOptions });
  //           this.setState({ showLoader: false });
  //         } else {
  //           this.setState({
  //             basePlan: null,
  //             pricing_info: {}
  //           });
  //           this.setState({ showLoader: false });
  //         }
  //       });
  //   }
  // }
  // addNewPrice = () => {
  //   this.setState({
  //     planDescription: "",
  //     // planName: "",
  //     planDiscount: 0,
  //     planPrice: 0,
  //     selectedOption: { value: 1, label: "Free" },
  //     monthSelectedOption: { value: 1, label: "1 Month" },
  //     cselectedOption: { value: 1, label: "$" }
  //   });
  // };
  // validateForm = data => {
  //   var obj = new WebNotif();
  //   for (let i = 0; i < data.length; i++) {
  //     if (data[i].value == null || data[i].value == "") {
  //       obj.createNotification("error", data[i].slug + " is required");
  //       return false;
  //       break;
  //     }
  //   }
  //   return true;
  // };
  // addPrice = flag => {
  //   let month = null;
  //   let addPricePlan = { ...this.state.pricing_info };
  //   let newBasePlan;

  //   if (this.state.selectedOption.value == 2) {
  //     month = this.state.monthSelectedOption.value;
  //   }
  //   var newKey = this.state.editKey
  //     ? this.state.editKey
  //     : db.ref("courses/" + this.props.keyProp + "/pricing/").push().key;

  //   db.ref("courses/" + this.props.keyProp + "/pricing/" + newKey)
  //     .set({
  //       name: this.state.planName,
  //       type: this.state.selectedOption.value,
  //       price: parseInt(this.state.planPrice),
  //       currency: this.state.cselectedOption.label,
  //       description: this.state.planDescription,
  //       discount: parseInt(this.state.planDiscount),
  //       isShown: true,
  //       month: month
  //     })
  //     .then(c => {
  //       addPricePlan[newKey] = {
  //         name: this.state.planName,
  //         type: this.state.selectedOption.value,
  //         price: parseInt(this.state.planPrice),
  //         currency: this.state.cselectedOption.label,
  //         description: this.state.planDescription,
  //         discount: parseInt(this.state.planDiscount),
  //         isShown: true,
  //         month: month
  //       };
  //       this.setState({ pricing_info: addPricePlan, editKey: null });
  //       var monthOptions = this.state.months;

  //       monthOptions = monthOptions.filter(monthOption => {
  //         return !Boolean(
  //           Object.values(addPricePlan).find(plan => {
  //             return monthOption.value === plan.month;
  //           })
  //         );
  //       });
  //       this.setState({ monthOptions });
  //       if (Object.keys(addPricePlan).length === 1) {
  //         newBasePlan = addPricePlan[newKey];
  //         newBasePlan["pricingKey"] = newKey;
  //         this.setState({ basePlan: newBasePlan }, () => {
  //           db.ref("courses/" + this.props.keyProp + "/pricing/basePlan").set(
  //             newBasePlan
  //           );
  //         });
  //       } else if (newKey === this.state.basePlan.pricingKey) {
  //         Object.keys(addPricePlan).map(pricingKey => {
  //           if (newBasePlan) {
  //             newBasePlan =
  //               newBasePlan.price > addPricePlan[pricingKey].price
  //                 ? addPricePlan[pricingKey]
  //                 : newBasePlan;
  //           } else {
  //             newBasePlan = addPricePlan[pricingKey];
  //           }
  //           newBasePlan["pricingKey"] = pricingKey;
  //           this.setState({ basePlan: newBasePlan }, () => {
  //             db.ref("courses/" + this.props.keyProp + "/pricing/basePlan").set(
  //               newBasePlan
  //             );
  //           });
  //         });
  //       } else {
  //         Object.keys(addPricePlan).map(pricingKey => {
  //           if (addPricePlan[pricingKey].price <= this.state.basePlan.price) {
  //             newBasePlan = addPricePlan[pricingKey];
  //             newBasePlan["pricingKey"] = pricingKey;
  //           }
  //         });
  //         if (newBasePlan) {
  //           this.setState({ basePlan: newBasePlan }, () => {
  //             db.ref("courses/" + this.props.keyProp + "/pricing/basePlan").set(
  //               newBasePlan
  //             );
  //           });
  //         }
  //       }

  //       var obj = new WebNotif();
  //       if (flag == parseInt(1)) {
  //         obj.createNotification("success", "Price Plan Updated");
  //         this.addNewPrice();
  //       } else {
  //         obj.createNotification("success", "Price Plan Added");
  //       }
  //     });
  // };
  // editPrice = key => {
  //   var info = this.state.pricing_info[key];
  //   var pricing_info = this.state.pricing_info;
  //   var plan =
  //     info.type == 1
  //       ? { value: 1, label: "Free" }
  //       : info.type == 2
  //       ? { value: 2, label: "Subscription" }
  //       : info.type == 3
  //       ? { value: 3, label: "One Time Purchase" }
  //       : { value: 4, label: "Payment Plan" };
  //   var month = {
  //     value: info.month,
  //     label: info.month == 1 ? 1 + " Month" : info.month + " Months"
  //   };
  //   this.setState(
  //     {
  //       planDescription: info.description,
  //       planName: info.name,
  //       planDiscount: parseInt(info.discount),
  //       planPrice: parseInt(info.price),
  //       selectedOption: plan,
  //       monthSelectedOption: month,
  //       cselectedOption: { value: 1, label: "$" }
  //     },
  //     () => {
  //       var monthOptions = this.state.months;

  //       monthOptions = monthOptions.filter(monthOption => {
  //         return !Boolean(
  //           Object.values(pricing_info).find(plan => {
  //             return monthOption.value === plan.month;
  //           })
  //         );
  //       });
  //       this.setState({ monthOptions });
  //     }
  //   );
  //   this.setState({ editKey: key }, () => {});
  // };

  // deletePricePlan = (key, value) => {
  //   confirmAlert({
  //     title: "Confirm to submit",
  //     message: "Are you sure to do this.",
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: () => {
  //           let price_info = { ...this.state.pricing_info };
  //           let newBasePlan;
  //           delete price_info[key];
  //           if (key == this.state.basePlan.pricingKey) {
  //             Object.keys(price_info).map(pricingKey => {
  //               if (newBasePlan) {
  //                 newBasePlan =
  //                   newBasePlan.price > price_info[pricingKey].price
  //                     ? price_info[pricingKey]
  //                     : newBasePlan;
  //               } else {
  //                 newBasePlan = price_info[pricingKey];
  //               }
  //               newBasePlan["pricingKey"] = pricingKey;
  //               this.setState({ basePlan: newBasePlan });
  //               db.ref(
  //                 "courses/" + this.props.keyProp + "/pricing/basePlan"
  //               ).set(newBasePlan);
  //             });
  //           }
  //           this.setState({ pricing_info: price_info });
  //           var monthOptions = this.state.months;

  //           monthOptions = monthOptions.filter(monthOption => {
  //             return !Boolean(
  //               Object.values(price_info).find(plan => {
  //                 return monthOption.value === plan.month;
  //               })
  //             );
  //           });
  //           this.setState({ monthOptions });
  //           db.ref("courses/" + this.props.keyProp + "/pricing/" + key).set(
  //             null
  //           );
  //           var obj = new WebNotif();
  //           obj.createNotification("success", "Price Plan Deleted ");
  //         }
  //       },
  //       {
  //         label: "No",
  //         onClick: () => {}
  //       }
  //     ]
  //   });
  // };
  render() {
    return (
      <React.Fragment>
        {this.state.redirect ? (
          <Unauthorized />
        ) : (
          <React.Fragment>
            <WebNotif />
            <div className="admin-card-pricing card">
              <div className="card-body">
                <div className=" col-md-12">
                  <div className="row">
                    <div className="col-md-9">
                      <h5 className="card-title regular_font">
                        Add Pricing Plan
                      </h5>
                      <div className="col lrp-0">
                        <span>
                          <b>Course title:</b>
                          {this.state.courseTitle != undefined
                            ? " (" + this.state.courseTitle + ")"
                            : ""}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-3 lrp-0">
                      {/* <button
                    className="btn admin-btn-green fix_width_btn white admin-btn"
                    onClick={this.saveForm}
                  >
                    Publish Course
                  </button>{" "} */}
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row d-flex content-justify-center">
                  <div className="col-md-3 text-center">
                    <img src={require("../../assets/image/free.png")} width="80px" />
                    <p className="mb-0_2">
                      <b>Free</b>
                    </p>
                    <p>No Payment</p>
                  </div>
                  <div className="col-md-3 text-center">
                    <img
                      src={require("../../assets/image/subscription.png")}
                      width="80px"
                    />
                    <p className="mb-0_2">
                      <b>Subscription</b>
                    </p>
                    <p>Monthly or Annual Billing</p>
                  </div>
                  <div className="col-md-3 text-center">
                    <img
                      src={require("../../assets/image/one time payment.png")}
                      width="80px"
                    />
                    <p className="mb-0_2">
                      <b>One Time Purchase</b>
                    </p>
                    <p>A Single Payment</p>
                  </div>
                  <div className="col-md-3 text-center">
                    <img
                      src={require("../../assets/image/payment plan.png")}
                      width="80px"
                    />
                    <p className="mb-0_2">
                      <b>Payment Plan</b>
                    </p>
                    <p>A Fixed Number of Payments</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="admin-card-pricing card">
              <div className="card-body">
                <div className=" col-md-12">
                  <div className="row">
                    <div className="col-md-8">
                      <h5 className="card-title regular_font">
                        Price Plan Detail
                      </h5>
                    </div>
                    <div className="col-md-4 lrp-0">
                      {/* <button
                    className="btn admin-btn-green fix_width_btn white admin-btn"
                    onClick={this.saveForm}
                  >
                    Publish Course
                  </button>{" "} */}
                    </div>
                  </div>
                </div>
                <hr className="mt-0" />
                <div className="d-flex justify-content-center">
                  <div className="col-md-8">
                    <div className="form-group">
                      <label>
                        Type <span className="clr-red">*</span>
                      </label>
                      <Select
                        // value={this.state.selectedOption}
                        // onChange={this.handleChange}
                        // options={this.state.options}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Plan Name <span className="clr-red">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control admin-form-control"
                        placeholder="Plan Name"
                        // value={this.state.planName}
                        // onChange={event =>
                        //   this.setState(
                        //     byPropKey("planName", event.target.value)
                        //   )}
                      />
                    </div>
                    <div
                      className={
                        this.state.selectedOption.value == 2
                          ? "form-group"
                          : "hide"
                      }
                    >
                      <label>
                        Month<span className="clr-red">*</span>
                      </label>
                      <Select
                        value={this.state.monthSelectedOption}
                        onChange={this.monthHandleChange}
                        options={this.state.monthOptions}
                      />
                    </div>
                    <div
                      className={
                        this.state.selectedOption.value !== 1 ? "" : "hide"
                      }
                    >
                      <label>
                        Price<span className="clr-red">*</span>
                      </label>
                      <div
                        className={
                          this.state.selectedOption.value !== 1
                            ? "input-group mb-3"
                            : "hide"
                        }
                      >
                        <div className="input-group-prepend">
                          <Select
                            // value={this.state.cselectedOption}
                            // onChange={this.chandleChange}
                            // options={this.state.coptions}
                          />
                        </div>

                        <input
                          type="number"
                          min="0"
                          className="form-control"
                          placeholder="Price"
                          // value={this.state.planPrice}
                           aria-label="Text input with dropdown button"
                          // onChange={event =>
                          //   this.setState(
                          //     byPropKey("planPrice", event.target.value)
                          //   )
                          // }
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label> Discount</label>
                      <input
                        type="number"
                        min="0"
                        className="form-control admin-form-control"
                        placeholder="Discount"
                        // value={this.state.planDiscount}
                        // onChange={event =>
                        //   this.setState(
                        //     byPropKey("planDiscount", event.target.value)
                        //   ) }
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        className="form-control admin-form-control"
                        rows="4"
                        value={this.state.planDescription}
                        placeholder="Detailed Description"
                        onChange={event =>
                          this.setState(
                            byPropKey("planDescription", event.target.value)
                          )
                        }
                      />
                    </div>
                    <button
                      className="btn btn-green white fix_width_btn_lg fs-12 "
                      // onClick={() => this.addPrice(0)}
                    >
                      Save
                    </button>
                    &nbsp; &nbsp; &nbsp;
                    <button
                      className="btn btn-green white fix_width_btn_lg fs-12 "
                      // onClick={() => this.addPrice(1)}
                    >
                      Save and Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="admin-card-pricing card">
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Plan Type</th>
                      <th scope="col">Plan Name</th>
                      <th scope="col">Discount</th>
                      <th scope="col">Price</th>
                      <th scope="col">Months</th>
                      <th />
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.pricing_info == null
                      ? ""
                      : Object.keys(this.state.pricing_info).map(
                          (key, index) => (
                            <tr key={key}>
                              <td scope="row">{index + 1}</td>
                              <td>
                                {this.state.pricing_info[key].type == 1
                                  ? "Free"
                                  : this.state.pricing_info[key].type == 2
                                  ? "Subscription"
                                  : this.state.pricing_info[key].type == 3
                                  ? "One Time Payment"
                                  : "Payment Plan"}
                              </td>
                              <td>
                                {this.state.pricing_info[key].name != null
                                  ? this.state.pricing_info[key].name
                                  : "-"}
                              </td>
                              <td>
                                {this.state.pricing_info[key].discount != null
                                  ? this.state.pricing_info[key].discount
                                  : "-"}
                              </td>
                              <td>
                                {this.state.pricing_info[key].price != null
                                  ? this.state.pricing_info[key].price
                                  : "-"}
                              </td>
                              <td>
                                {this.state.pricing_info[key].month != null
                                  ? this.state.pricing_info[key].month
                                  : "-"}
                              </td>

                              <td>
                                {this.props.permissions["update"] ? (
                                  <i
                                    className="fa fa-pencil-square-o clr-darkpurple pointer"
                                    aria-hidden="true"
                                    onClick={() => this.editPrice(key)}
                                  />
                                ) : (
                                  <i className="fa fa-pencil-square-o clr-darkpurple pointer disabled" />
                                )}
                              </td>
                              <td>
                                {this.props.permissions["delete"] ? (
                                  <i
                                    className="fa fa-trash clr-darkpurple pointer"
                                    aria-hidden="true"
                                    onClick={() =>
                                      this.deletePricePlan(
                                        key,
                                        this.state.pricing_info[key].isShown
                                      )
                                    }
                                  />
                                ) : (
                                  <i className="fa fa-trash clr-darkpurple pointer disabled" />
                                )}
                              </td>
                            </tr>
                          )
                        )}
                  </tbody>
                </table>
              </div>
            </div>
            <Loader showLoader={this.state.showLoader} />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Pricing;
