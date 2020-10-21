import React, { Component } from "react";
import Navigation from "./Navigation";
import firebase, { db } from "../firebase/firebase";
import Loader from "./loader";
import Processing from "./Processing";
import WebNotif from "./WebNotif";
import Twocheckout from "2checkout-node";
import { Redirect } from "react-router-dom";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Cards from "react-credit-cards";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from "./utils";
import "react-credit-cards/es/styles-compiled.css";

import cookie from "react-cookies";
import axios from "axios";
// import Checkout from "./Checkout.jsx";\
var obj = new WebNotif();

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});
// var checkout_obj = new Checkout();
class Cart extends Component {
  state = {
    cartData: [],
    totalItems: "",
    showLoader: true,
    totalPrice: 0,
    generalCoupon: {},
    generalDiscount: null,
    city: "",
    redirect: false,
    address1: "",
    showLoaderP: false,
    state: "",
    country: "",
    zipCode: "",
    email: "",
    phone: "",
    sellerId: "901402686",
    publishableKey: "7B665758-7770-4173-84FB-17DDF1C98C24",
    coupon: {},
    cartTab: "",
    checkoutTab: "hide",
    cartTabColor: "bb_red",
    chechkoutTabColor: "bb_grey",
    couponDiscount: {},
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    generalCoupon: "",
    generalCouponType: null,
    formData: null,
    lineItems: []
  };
  componentDidMount() {
    // cookie.save("mycart", {}, { path: "/" });
    var directCheckout =
      this.props.location.state != undefined
        ? this.props.location.state.directCheckout
        : false;
    if (directCheckout) {
      if (this.props.userId == null) {
        obj.createNotification("warning", "Login to check out");
        this.setState({ loginRequest: true });

        return;
      }
      this.setState({ loginRequest: false });
      this.setState({
        cartTab: "hide",
        checkoutTab: "",
        cartTabColor: "bb_grey",
        chechkoutTabColor: "bb_red"
      });
    }
    if (cookie.load("mycart") !== undefined) {
      var myCart = cookie.load("mycart");
      var totalItems = Object.keys(myCart).length;
      var totalPrice = 0;
      var lineItems = [];
      this.setState({ totalItems });
      if (totalItems == 0) {
        this.setState({ showLoader: false });
      }
      Object.keys(myCart).map(key => {
        var PP = myCart[key]["selectedPricingKey"];
        db.ref("courses/" + key)
          .once("value")
          .then(snapshot => {
            if (snapshot.val() !== null) {
              const courseData = snapshot.val();
              const coursePricingData = courseData.pricing;
              const discountedPrice =
                coursePricingData[PP].price -
                (coursePricingData[PP].price * coursePricingData[PP].discount) /
                  100;

              totalPrice = totalPrice + discountedPrice;

              // Adding Extra Fields to the Course -- START
              courseData["selectedPricingKey"] = PP;
              courseData["originalPrice"] = coursePricingData[PP].price;
              courseData["totalChargablePrice"] = discountedPrice;
              courseData["courseId"] = key;
              courseData["promotionApplied"] = false;
              // Adding Extra Fields to the Course -- END

              if (coursePricingData[PP].type == 2) {
                if (
                  coursePricingData[PP].month != null &&
                  coursePricingData[PP].month != undefined
                ) {
                  lineItems.push({
                    price:
                      coursePricingData[PP].price -
                      (coursePricingData[PP].price *
                        coursePricingData[PP].discount) /
                        100,
                    quantity: "1",
                    tangible: "N",
                    name: snapshot.val().Title,
                    type: "product",
                    description: snapshot.val().Description,
                    recurrence: coursePricingData[PP].month + " Month",
                    duration: "1 Year"
                  });
                }
              } else {
                lineItems.push({
                  price:
                    coursePricingData[PP].price -
                    (coursePricingData[PP].price *
                      coursePricingData[PP].discount) /
                      100,
                  quantity: "1",
                  //   recurrence: "1 Month",
                  //   startupFee: null,
                  //   //productId: "123",
                  tangible: "N",
                  name: snapshot.val().Title,
                  type: "product",
                  description: snapshot.val().Description
                });
              }
              var cartData = [...this.state.cartData, courseData];
              this.setState({ cartData });
              this.setState({ totalPrice });
              this.setState({ lineItems });
              this.setState({ showLoader: false });
            } else {
              this.setState({ showLoader: false, totalItems: 0 });
              cookie.save("mycart", {}, { path: "/" });
            }
          });
      });
    } else {
      this.state.cartData.length = 0;
      this.setState({ showLoader: false });
    }
  }

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
      var ytu = target.value.split("/");

      this.setState({ expMonth: ytu[0], expYear: ytu[1] });
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }
    this.setState({ [target.name]: target.value });
  };

  RemoveData = (id, index) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            var total_price = 0;
            var cartData = [...this.state.cartData];
            cartData.splice(index, 1);
            this.setState({ cartData });
            var myCart = cookie.load("mycart");
            delete myCart[id];

            cookie.save("mycart", myCart, { path: "/" });
            Object.keys(cartData).map(key => {
              const selectedPricingKey = this.state.cartData[key]
                .selectedPricingKey;

              total_price =
                total_price +
                (cartData[key].pricing[selectedPricingKey].price -
                  (cartData[key].pricing[selectedPricingKey].price *
                    cartData[key].pricing[selectedPricingKey].discount) /
                    100);
            });

            this.setState((prevState, props) => {
              return {
                totalPrice: total_price,
                cartRemove: true,
                totalItems: prevState.totalItems - 1
              };
            });
            obj.createNotification("success", "Item removed from cart");
          }
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  };

  testHandleSubmit = event => {
    var userId = this.props.userId;

    event.preventDefault();
    var userId = this.props.userId;
    for (var i = 0; i < this.state.cartData.length; i++) {
      var self = this;
      db.ref("userProducts/" + userId + "/" + this.state.cartData[i].courseId)
        .set(this.state.cartData[i])
        .then(c => {
          const logsCart = [];
          const logsPushKey = db.ref("/paymentLogs").push();

          for (var i = 0; i < this.state.cartData.length; i++) {
            logsCart.push({
              courseTitle: this.state.cartData[i].Title,
              courseId: this.state.cartData[i].courseId,
              type: this.state.cartData[i].type
            });
          }

          const datePurchased = firebase.database.ServerValue.TIMESTAMP;
          logsPushKey.set({
            username: this.props.userAuth.displayName,
            userId: userId,
            price: this.state.totalPrice,
            coursesPurchased: logsCart,
            datePurchased: datePurchased
          });

          setTimeout(function() {
            cookie.save("mycart", {}, { path: "/" });

            self.setState({ showLoaderP: false });

            self.setState({ redirect: true });
          }, 1200);
        });
    }
  };
  handleSubmit = event => {
    event.preventDefault();
    this.setState({ showLoaderP: true });
    var self = this;
    var cartData = this.state.cartData;
    var userId = this.props.userId;

    var payWithCard = data => {
      var params = {
        merchantOrderId: "123",
        token: data.response.token.token,
        currency: "USD",

        lineItems: this.state.lineItems,
        billingAddr: {
          name: this.state.name,
          addrLine1: this.state.address1,
          city: this.state.city,
          state: this.state.state,
          zipCode: this.state.zipCode,
          country: this.state.country,
          email: this.state.email,
          phoneNumber: this.state.phone
        }
      };
      axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
      axios
        .post(
          "https://us-central1-medexpert-d7560.cloudfunctions.net/checkout",
          params
        )
        .then(function(response) {
          if (response.data.success.responseCode === "APPROVED") {
            obj.createNotification(
              "success",
              response.data.success.responseMsg
            );

            // Sending UserProducts -- START  (Needs to be optimized into single push)
            for (var i = 0; i < cartData.length; i++) {
              db.ref(`roles/${userId}/role/MC/${cartData[i].courseId}`).set(
                true
              ); // Updating MyCourses
              db.ref("userProducts/" + userId + "/" + cartData[i].courseId).set(
                cartData[i]
              );
            }
            // Sending UserProducts -- END

            // Sending Logs -- START
            const logsCart = [];
            const logsPushKey = db.ref("/paymentLogs").push();

            for (var i = 0; i < cartData.length; i++) {
              logsCart.push({
                courseTitle: cartData[i].Title,
                courseId: cartData[i].courseId,
                type: cartData[i].type
              });
            }

            const datePurchased = firebase.database.ServerValue.TIMESTAMP;
            logsPushKey.set({
              username: self.props.userAuth.displayName,
              userId: userId,
              price: self.state.totalPrice,
              coursesPurchased: logsCart,
              datePurchased: datePurchased
            });
            // Sending Logs -- STOP

            cookie.save("mycart", {}, { path: "/" });
            obj.createNotification("success", "Redirecting to dashboard");

            setTimeout(function() {
              //do what you need here
              //          console.log(node);
              self.setState({ showLoaderP: false });

              self.setState({ redirect: true }); //enter cart deletion cpde here
            }, 1200);
          } else {
            console.log(error);
            obj.createNotification("error", error.message);
            self.setState({ showLoaderP: false });
          }
        })
        .catch(function(error) {
          console.log(error);
          obj.createNotification("error", error.message);
          self.setState({ showLoaderP: false });
        });
    };

    var error = error => {
      console.log(error);
    };

    window.TCO.loadPubKey("sandbox", () => {
      window.TCO.requestToken(payWithCard, error, "tcoCCForm");
    });
  };

  tabActive = activeOption => {
    if (activeOption == 1) {
      this.setState({
        cartTab: "",
        checkoutTab: "hide",
        cartTabColor: "bb_red",
        chechkoutTabColor: "bb_grey"
      });
    } else {
      if (this.props.userId == null) {
        obj.createNotification("warning", "Login to check out");
        this.setState({ loginRequest: true });

        return;
      }
      this.setState({ loginRequest: false });

      this.setState({
        cartTab: "hide",
        checkoutTab: "",
        cartTabColor: "bb_grey",
        chechkoutTabColor: "bb_red"
      });
    }
  };
  calTotalPrice = () => {
    var totalPrice = 0;
    var lineItems = [];

    Object.keys(this.state.cartData).map(key => {
      if (
        this.state.couponDiscount[this.state.cartData[key].courseId] !=
        undefined
      ) {
        totalPrice =
          totalPrice +
          (this.state.cartData[key].totalChargablePrice -
            this.state.couponDiscount[this.state.cartData[key].courseId]);
      } else {
        if (this.state.generalDiscount != null) {
          if (this.state.generalCouponType == 1) {
            totalPrice =
              totalPrice +
              (this.state.cartData[key].totalChargablePrice > 0
                ? this.state.cartData[key].totalChargablePrice -
                  this.state.generalDiscount
                : this.state.cartData[key].totalChargablePrice);
          } else {
            totalPrice =
              totalPrice +
              (this.state.cartData[key].totalChargablePrice -
                (this.state.cartData[key].totalChargablePrice *
                  this.state.generalDiscount) /
                  100);
          }
        } else {
          totalPrice =
            totalPrice + this.state.cartData[key].totalChargablePrice;
        }
      }
      lineItems.push({
        price: this.state.cartData[key].totalChargablePrice,
        quantity: "1",
        //   recurrence: "1 Month",
        //   startupFee: null,
        //   //productId: "123",
        tangible: "N",
        name: this.state.cartData[key].Title,
        type: "product",
        description: this.state.cartData[key].Description
      });

      this.setState({ totalPrice });
    });
    this.setState({ lineItems });
  };

  validateCoupon = (courseId, price, key) => {
    if (this.state.coupon[key] != undefined) {
      db.ref("coupon")
        .orderByChild("code")
        .equalTo(this.state.coupon[key])
        .once("value")
        .then(snapshot => {
          var self = this;
          if (snapshot.val() != null) {
            snapshot.forEach(function(snap) {
              var startDate = new Date(snap.val().startDate).getTime();
              var endDate = new Date(snap.val().endDate).getTime();
              var currentDate = firebase.database.ServerValue.TIMESTAMP;

              if (startDate <= currentDate && endDate >= currentDate) {
                if (snap.val().course == courseId) {
                  self.state.cartData[key]["promotionApplied"] = true;
                  var couponDiscount = { ...self.state.couponDiscount };
                  if (snap.val().discountType == 1) {
                    couponDiscount[courseId] = snap.val().discount;
                  } else {
                    couponDiscount[courseId] =
                      (price * snap.val().discount) / 100;
                  }
                  self.setState({ couponDiscount });
                  self.calTotalPrice();
                } else {
                  obj.createNotification("error", "Coupon is invalid");
                }
              } else {
                obj.createNotification("error", "Coupon is invalid");
              }
            });
          } else {
            obj.createNotification("error", "Coupon is invalid");
          }
        });
    } else {
      obj.createNotification("error", "Coupon is invalid");
    }
  };

  validateGeneralCoupon = () => {
    if (
      this.state.generalCoupon.length > 0 &&
      this.state.generalCoupon != undefined
    ) {
      db.ref("coupon")
        .orderByChild("code")
        .equalTo(this.state.generalCoupon)
        .once("value")
        .then(snapshot => {
          var self = this;
          snapshot.forEach(function(snap) {
            if (snap.val() != null && snap.val().type == 4) {
              self.setState({
                generalDiscount: snap.val().discount,
                generalCouponType: snap.val().discountType
              });
              self.calTotalPrice();
            }
          });
        });
    } else {
      obj.createNotification("error", "Coupon is invalid");
    }
  };
  couponChange = (data, key) => {
    var coupon = { ...this.state.coupon };
    coupon[key] = data;
    this.setState({ coupon });
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;

    return (
      <React.Fragment>
        {this.state.redirect ? <Redirect to="/" /> : ""}
        <WebNotif />
        <Navigation
          loginRequest={this.state.loginRequest}
          cartAdd={this.state.cartAdd}
          cartRemove={this.state.cartRemove}
        />
        <section>
          <div className="course_slider top-fix">
            <div className="container">
              <h2 className=" course-title-banner">Shopping Cart</h2>
            </div>
          </div>
          <div className="bg-grey ptb-5p">
            <div className="container">
              <div className="card p-75">
                <div className="card-body">
                  <div className="row d-flex justify-content-center">
                    <div
                      className="col-md-2 text-center pointer"
                      onClick={() => this.tabActive(1)}
                    >
                      <p className="mb-0_5">Cart</p>
                      <div className={this.state.cartTabColor} />
                    </div>
                    <div
                      className={
                        this.state.cartData.length == 0
                          ? "col-md-2 text-center disabale-pointer-event"
                          : " col-md-2 text-center enbale-pointer-event pointer"
                      }
                      onClick={() => this.tabActive(2)}
                    >
                      <p className="mb-0_5">Checkout</p>
                      <div className={this.state.chechkoutTabColor} />
                    </div>
                  </div>
                  <br />
                  <div className={"row " + this.state.cartTab}>
                    <div className="col-md-9">
                      <p className="text-lightgrey fs-16">
                        {this.state.totalItems} Items in cart
                      </p>
                      <hr className="hr-black" />
                      {this.state.cartData.length == 0
                        ? "There is no item in the cart"
                        : Object.keys(this.state.cartData).map((key, index) => {
                            const selectedPricingKey = this.state.cartData[key]
                              .selectedPricingKey;
                            return (
                              <div className="card mtb-10 " key={key}>
                                <div className="col-md-12 lrp-0">
                                  <div className="row lrm-0">
                                    <div className="col-md-3 lrp-0">
                                      <img
                                        src={
                                          this.state.cartData[key].media.Image
                                        }
                                        alt="Product image"
                                        style={{
                                          height: "185px",
                                          width: "inherit",
                                          objectFit: "cover"
                                        }}
                                        className="lrtbb-5"
                                      />
                                    </div>
                                    <div className="col-md-7 p-30 text-black">
                                      <h5>{this.state.cartData[key].Title}</h5>
                                      <p className="fs-12 text-lightgrey">
                                        {this.state.cartData[key].Description}
                                      </p>
                                      <div className="input-group md-form form-sm form-2 pl-0">
                                        <input
                                          className="form-control red-border fs-12"
                                          type="text"
                                          value={this.state.coupon[key]}
                                          placeholder="coupon"
                                          onChange={event =>
                                            this.couponChange(
                                              event.target.value,
                                              key
                                            )
                                          }
                                        />
                                        <div className="input-group-append">
                                          <button
                                            className="input-group-text red fs-12 "
                                            onClick={() =>
                                              this.validateCoupon(
                                                this.state.cartData[key]
                                                  .courseId,
                                                this.state.cartData[key]
                                                  .pricing[selectedPricingKey]
                                                  .price,
                                                key
                                              )
                                            }
                                          >
                                            Apply
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-2 lrp-0">
                                      <div
                                        className=""
                                        style={{
                                          position: "absolute",
                                          top: "30px",
                                          right: "30px"
                                        }}
                                      >
                                        <span
                                          className="pointer"
                                          onClick={() =>
                                            this.RemoveData(
                                              this.state.cartData[key].courseId,
                                              key
                                            )
                                          }
                                        >
                                          Remove &nbsp;
                                          <i className="fa fa-trash" />
                                        </span>
                                      </div>
                                      <div
                                        className="col-md-12 lrp-0"
                                        style={{
                                          position: "absolute",
                                          bottom: "20px",
                                          right: "30px"
                                        }}
                                      >
                                        <div className="text-right">
                                          <span className="text_grey text-small original-price">
                                            {" "}
                                            {this.state.cartData == null ||
                                            this.state.cartData[key].pricing[
                                              selectedPricingKey
                                            ].discount == 0
                                              ? ""
                                              : this.state.cartData[key]
                                                  .pricing[selectedPricingKey]
                                                  .currency +
                                                parseFloat(
                                                  this.state.cartData[key]
                                                    .pricing[selectedPricingKey]
                                                    .price
                                                ).toFixed(2)}
                                          </span>
                                        </div>

                                        <div className="text-right">
                                          <h4 className="text-lightred">
                                            {this.state.cartData == null
                                              ? "0.0"
                                              : this.state.cartData[key]
                                                  .pricing[selectedPricingKey]
                                                  .currency +
                                                parseFloat(
                                                  this.state.cartData[key]
                                                    .totalChargablePrice -
                                                    (this.state.couponDiscount[
                                                      this.state.cartData[key]
                                                        .courseId
                                                    ] == undefined
                                                      ? 0.0
                                                      : parseFloat(
                                                          this.state
                                                            .couponDiscount[
                                                            this.state.cartData[
                                                              key
                                                            ].courseId
                                                          ]
                                                        ))
                                                ).toFixed(2)}
                                          </h4>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                    </div>

                    <div className="col-md-3">
                      <p className="fs-16 text-lightgrey">Total</p>
                      <hr className="hr-black" />
                      <div>
                        <h4>{this.state.totalPrice}</h4>
                      </div>
                      <div className="input-group md-form form-sm form-2 mtb-10">
                        <input
                          className="form-control red-border fs-12"
                          type="text"
                          value={this.state.generalCoupon}
                          placeholder="coupon"
                          onChange={event =>
                            this.setState(
                              byPropKey("generalCoupon", event.target.value)
                            )
                          }
                        />
                        <div className="input-group-append">
                          <button
                            className="input-group-text red fs-12 "
                            onClick={this.validateGeneralCoupon}
                          >
                            Apply
                          </button>
                        </div>
                      </div>

                      <button
                        className="btn btn-red white btn-width-250"
                        // onClick={this.finalProductsList}
                        onClick={() => this.tabActive(2)}
                        disabled={
                          this.state.cartData.length == 0 ? true : false
                        }
                      >
                        Proceed to checkout
                      </button>
                    </div>
                  </div>
                  <div className={"row " + this.state.checkoutTab}>
                    <div className="col-md-7">
                      <p className="text-lightgrey fs-16">
                        {this.state.totalItems} Items in cart
                      </p>
                      <hr className="hr-black" />
                      {this.state.cartData.length == 0
                        ? "There is no item in the cart"
                        : Object.keys(this.state.cartData).map((key, index) => {
                            const selectedPricingKey = this.state.cartData[key]
                              .selectedPricingKey;
                            return (
                              <React.Fragment key={key}>
                                <div className="card">
                                  <div className="col-md-12 lrp-0">
                                    <div className="row lrm-0">
                                      <div className="col-md-4 lrp-0">
                                        <img
                                          src={
                                            this.state.cartData[key].media.Image
                                          }
                                          alt="Product image"
                                          className="lrtbb-5"
                                          style={{
                                            height: "185px",
                                            width: "inherit",
                                            objectFit: "cover"
                                          }}
                                        />
                                      </div>
                                      <div className="col-md-8 p-20 text-black">
                                        <h5>
                                          {this.state.cartData[key].Title}
                                        </h5>
                                        <p className="fs-12 text-lightgrey">
                                          {this.state.cartData[key].Description}
                                        </p>
                                        <div
                                          style={{
                                            position: "absolute",
                                            bottom: "10px"
                                          }}
                                        >
                                          <div className="row lrm-0">
                                            <div className=" text-right">
                                              <h4 className="text-lightred">
                                                {this.state.cartData == null
                                                  ? "0.0"
                                                  : this.state.cartData[key]
                                                      .pricing[
                                                      selectedPricingKey
                                                    ].currency +
                                                    parseFloat(
                                                      this.state.cartData[key]
                                                        .pricing[
                                                        selectedPricingKey
                                                      ].price -
                                                        (this.state.cartData[
                                                          key
                                                        ].pricing[
                                                          selectedPricingKey
                                                        ].price *
                                                          this.state.cartData[
                                                            key
                                                          ].pricing[
                                                            selectedPricingKey
                                                          ].discount) /
                                                          100
                                                    ).toFixed(2)}
                                              </h4>
                                            </div>
                                            &nbsp; &nbsp; &nbsp;
                                            <div
                                              className="lrp-15"
                                              style={{ padding: "5px" }}
                                            >
                                              <span
                                                className="text_grey original-price"
                                                style={{
                                                  fontSize: "14px"
                                                }}
                                              >
                                                {" "}
                                                {this.state.cartData == null ||
                                                this.state.cartData[key]
                                                  .pricing[selectedPricingKey]
                                                  .discount == 0
                                                  ? ""
                                                  : this.state.cartData[key]
                                                      .pricing[
                                                      selectedPricingKey
                                                    ].currency +
                                                    parseFloat(
                                                      this.state.cartData[key]
                                                        .pricing[
                                                        selectedPricingKey
                                                      ].price
                                                    ).toFixed(2)}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <br />
                              </React.Fragment>
                            );
                          })}
                    </div>

                    <div className="col-md-5 mt-15">
                      <br />
                      <div className="card p-20">
                        <h5>Enter Credit/Debit Card</h5>
                        <hr />

                        <Cards
                          number={number}
                          name={name}
                          expiry={expiry}
                          cvc={cvc}
                          focused={focused}
                          callback={this.handleCallback}
                        />
                        <br />
                        <form
                          id="tcoCCForm"
                          onSubmit={event => this.handleSubmit(event)}
                        >
                          <input
                            id="sellerId"
                            type="hidden"
                            value={this.state.sellerId}
                          />
                          <input
                            id="publishableKey"
                            type="hidden"
                            value={this.state.publishableKey}
                          />{" "}
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <input
                                  type="tel"
                                  id="ccNo"
                                  name="number"
                                  className="form-control fs-12"
                                  placeholder="Card Number"
                                  pattern="[\d| ]{16,22}"
                                  required
                                  onChange={this.handleInputChange}
                                  onFocus={this.handleInputFocus}
                                />
                              </div>
                            </div>
                          </div>
                          <input
                            hidden
                            type="text"
                            size="2"
                            id="expMonth"
                            name="expMonth"
                            value={this.state.expMonth}
                            placeholder="MM"
                            className="form-control fs-12"
                            required
                            onChange={event =>
                              this.setState(
                                byPropKey("expMonth", event.target.value)
                              )
                            }
                          />
                          <input
                            hidden
                            type="text"
                            size="4"
                            className="form-control fs-12"
                            id="expYear"
                            name="expYear"
                            value={this.state.expYear}
                            placeholder="YYYY"
                            required
                            onChange={event =>
                              this.setState(
                                byPropKey("expYear", event.target.value)
                              )
                            }
                          />
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="name"
                                  className="form-control fs-12"
                                  placeholder="Name"
                                  required
                                  onChange={this.handleInputChange}
                                  onFocus={this.handleInputFocus}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <input
                                  type="tel"
                                  name="expiry"
                                  className="form-control fs-12 "
                                  placeholder="Valid Thru (MM/YY)"
                                  pattern="\d\d/\d\d"
                                  required
                                  onChange={this.handleInputChange}
                                  onFocus={this.handleInputFocus}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <input
                                  id="cvv"
                                  type="tel"
                                  name="cvc"
                                  className="form-control fs-12"
                                  placeholder="CVC"
                                  pattern="\d{3,4}"
                                  required
                                  onChange={this.handleInputChange}
                                  onFocus={this.handleInputFocus}
                                />
                              </div>
                            </div>
                          </div>
                          <input type="hidden" name="issuer" value={issuer} />
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control fs-12"
                                  placeholder=" Address "
                                  name="address1"
                                  required
                                  onChange={this.handleInputChange}
                                  onFocus={this.handleInputFocus}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control fs-12"
                                  placeholder="City"
                                  name="city"
                                  required
                                  onChange={this.handleInputChange}
                                  onFocus={this.handleInputFocus}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control fs-12"
                                  placeholder="State"
                                  name="state"
                                  required
                                  onChange={this.handleInputChange}
                                  onFocus={this.handleInputFocus}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <input
                                  type="number"
                                  className="form-control fs-12"
                                  placeholder="Zip Code"
                                  name="zipCode"
                                  required
                                  onChange={this.handleInputChange}
                                  onFocus={this.handleInputFocus}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control fs-12"
                                  placeholder="Country"
                                  name="country"
                                  required
                                  onChange={this.handleInputChange}
                                  onFocus={this.handleInputFocus}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <input
                                  type="email"
                                  className="form-control fs-12"
                                  placeholder="Email"
                                  name="email"
                                  required
                                  onChange={this.handleInputChange}
                                  onFocus={this.handleInputFocus}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <input
                                  type="number"
                                  className="form-control fs-12"
                                  placeholder="Phone"
                                  name="phone"
                                  required
                                  onChange={this.handleInputChange}
                                  onFocus={this.handleInputFocus}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="form-actions">
                            <button
                              type="submit"
                              className="btn btn-primary btn-block"
                            >
                              PAY
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Loader showLoader={this.state.showLoader} />
        <Processing showLoader={this.state.showLoaderP} />
      </React.Fragment>
    );
  }
}

export default Cart;
