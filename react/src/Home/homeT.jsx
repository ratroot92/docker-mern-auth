import React, { Component } from "react";
import "../assets/css/main.css";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import urlapi from "../config/urlapi";
import $ from "jquery";
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      Email: "",
      Name: "",
      Subject: "",
      Message: "",
      idchange: "none"
    };
  }
  contactus = event => {
    event.preventDefault();
    //    console.log(this.state);
    // let data={
    //     UserName: this.state.email,
    //     UserPassword: this.state.password,
    // };
    // axios.get(urlapi+'/admin/list')
    // .then((response)=> {
    //   console.log(response.data.data);
    // })
    // .catch((error) => {
    //     console.log(error);
    // });
  };
  componentDidMount() {
    // $('di').hover(function () {
    //   $('#none').toggle('slide')
    // })
    document.title = "CPD";
  }

  statechange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  join = event => {
    event.preventDefault();
    this.props.history.push("/Register");
  };
  hover = () => {
    document.getElementById("mymarquee").stop();
  };
  outhover = () => {
    document.getElementById("mymarquee").start();
  };
  idnone = () => {
    this.setState({ idchange: "block" });
  };
  idagainnone = () => {
    this.setState({ idchange: "none" });
  };
  render() {
    return (
      <React.Fragment>
        <section  className="backco_white" style={{ fontFamily: 'Arial' }}>
          <Header />
          <div className="row mr_unset col_margin none_other">
            <div className="col-md-10 mr_unset pr_7">
              <div
                id="carouselExampleInterval"
                className="carousel slide"
                data-ride="carousel"
                style={{ width: "100%" }}
              >
                <div className="carousel-inner">
                  <div className="carousel-item active" data-interval={ 1000}>
                    <header className="masthead  bg_col1">
                      <div className="container h-100">
                        <div className="row h-100 align-items-center">
                          <div className="col-12 co_white inner_master">
                            <h1 className="font-weight-light pb_10">
                              ABOUT CPD
                            </h1>
                            <p className="lead">
                            Pakistan Engineering Council (PEC) under PEC Act and CPD Byelaws-2008, is earnestly working for the professional growth and skill enhancement of ever growing engineering community. Under CPD framework, the engineers (both PEs and REs) are required to learn innovative and soft skills to be more effective in playing productive role towards nation building
                            </p>
                            <br />
                            <button
                              type="button"
                              className=" btn btn-success font_sans bold btn_carousel  fz_14 fw_sans8"
                              onClick={() => this.props.history.push("/Introduction")}
                              
                            >
                              READ MORE
                            </button>
                          
                          </div>
                        </div>
                      </div>
                    </header>
                  </div>
                  <div className="carousel-item" data-interval={ 5000}>
                    <header className="masthead  bg_col2">
                      <div className="container h-100">
                        <div className="row h-100 align-items-center">
                          <div className="col-12 co_white inner_master">
                            <h1 className="font-weight-light pb_10">Live Webinar</h1>
                            <p className="lead">
                            As part of CPD activities being offered by PEC, Webinars are also organized  to provide an opportunity to engineers from anywhere in the world to attend short lectures and trainings on specialized and emerging topics to cater innovative needs of the engineering profession.
                            </p>
                            <br />
                            <button
                              type="button"
                              className="btn btn-success font_sans bold btn_carousel fz_14 fw_sans8"
                              onClick={() => this.props.history.push("/LiveWebinar")}
                              
                            >
                              READ MORE
                            </button>
                          
                          </div>
                        </div>
                      </div>
                    </header>
                  </div>
                  <div className="carousel-item" data-interval={ 5000}>
                    <header className="masthead  bg_col3">
                      <div className="container h-100">
                        <div className="row h-100 align-items-center">
                          <div className="col-12 co_white inner_master">
                            <h1 className="font-weight-light pb_10">
                            Short Course and Training
                            </h1>
                            <p className="lead">
                            In order to provide quality training and skills to the engineers (both RE & PE), PEC regularly organizes short courses and trainings on emerging topics as well as technical and management aspects.
                            </p>
                            <br />
                            <button
                              type="button"
                              className="btn btn-success font_sans bold btn_carousel fz_14 fw_sans8"
                              onClick={() => this.props.history.push("/CpdShortCourse")}
                              
                            >
                              READ MORE
                            </button>
                          
                          </div>
                        </div>
                      </div>
                    </header>
                  </div>
                  <div className="carousel-item" data-interval={ 5000}>
                    <header className="masthead  bg_col4">
                      <div className="container h-100">
                        <div className="row h-100 align-items-center">
                          <div className="col-12 co_white inner_master">
                            <h1 className="font-weight-light pb_10">
                            Engineer's CPD Profile
                            </h1>
                            <p className="lead">
                            The CPD programs include additional qualifications, professional skills, relevant management and communication skills acquired through additional training and experience
                            </p>
                            <br />
                            <button
                              type="button"
                              className="btn btn-success font_sans bold btn_carousel fz_14 fw_sans8"
                              onClick={() => this.props.history.push("/CpdProfile")}
                              
                            >
                              READ MORE
                            </button>
                          
                          </div>
                        </div>
                      </div>
                    </header>
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleInterval"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleInterval"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Next</span>
                </a>
              </div>
              <br />
            </div>

            <div className="col-md-2 marque_bord col_padding">
              <h5 className="text-center pt_20 bold">News and Updates</h5>
              <marquee
                behavior="scroll"
                id="mymarquee"
                direction="up"
                onMouseOver={this.hover}
                onMouseOut={this.outhover}
                style={{ height: "60vh" }}
              >
                <div className="flex-container1 plr_flexcontainer">
                 
                  <div className="fz_12 co_black text-center">
                    <p>
                      Lorem ipsum dolor sit amet conti ipsum sit amet conti
                      ipsum
                    </p>
                  </div>
               
                  <div className="">
                    <img className="card-img-top card2"
                    src={require("../assets/image/photo-1528731708534-816fe59f90cb.jpg")}
                    alt="" 
                  />
                  </div>
                  <hr className="hr_mar" />
                </div>
                <div className="flex-container1 plr_flexcontainer">
                  <div className="fz_12 co_black text-center">
                    <p>
                      Lorem ipsum dolor sit amet conti ipsum sit amet conti
                      ipsum
                    </p>
                  </div>
                  <div className="">
                  <img className="card-img-top card2"
                    src={require("../assets/image/photo-1528731708534-816fe59f90cb.jpg")}
                    alt="" 
                  />
                  </div>
                  <hr className="hr_mar" />
               
                </div>
                <div className="flex-container1 plr_flexcontainer">
                  <div className="fz_12 co_black text-center">
                    <p>
                      Lorem ipsum dolor sit amet conti ipsum sit amet conti
                      ipsum
                    </p>
                  </div>
                   <div className="">
                  <img className="card-img-top card2"
                    src={require("../assets/image/photo-1528731708534-816fe59f90cb.jpg")}
                    alt="" 
                  />
                  </div>
                  <hr className="hr_mar" />
                </div>
              </marquee>
            </div>
          </div>
          <div className="row mr_unset col_margin display_ipad">
            <div className="col-md-9 mr_unset pr_7">
              <div
                id="carouselExampleInterval"
                className="carousel slide"
                data-ride="carousel"
                style={{ width: "100%" }}
              >
                <div className="carousel-inner">
                  <div className="carousel-item active" data-interval={ 5000}>
                    <header className="masthead  bg_col1">
                      <div className="container h-100">
                        <div className="row h-100 align-items-center">
                          <div className="col-12 co_white inner_master">
                            <h1 className="font-weight-light pb_10">
                              ABOUT CPE
                            </h1>
                            <p className="lead">
                            Pakistan Engineering Council (PEC) under PEC Act and CPD Byelaws-2008, is earnestly working for the professional growth and skill enhancement of ever growing engineering community. Under CPD framework, the engineers (both PEs and REs) are required to learn innovative and soft skills to be more effective in playing productive role towards nation building
                           </p>
                            <br />
                            <button
                              type="button"
                              className=" btn btn-success font_sans bold btn_carousel  fz_14 fw_sans8"
                              onClick={() => this.props.history.push("/Introduction")}
                              
                            >
                              READ MORE
                            </button>
                          
                          </div>
                        </div>
                      </div>
                    </header>
                  </div>
                  <div className="carousel-item" data-interval={ 5000}>
                    <header className="masthead  bg_col2">
                      <div className="container h-100">
                        <div className="row h-100 align-items-center">
                          <div className="col-12 co_white inner_master">
                            <h1 className="font-weight-light pb_10">Live Webinars</h1>
                            <p className="lead">
                            As part of CPD activities being offered by PEC, Webinars are also organized  to provide an opportunity to engineers from anywhere in the world to attend short lectures and trainings on specialized and emerging topics to cater innovative needs of the engineering profession.
                           </p>
                            <br />
                            <button
                              type="button"
                              className="btn btn-success font_sans bold btn_carousel fz_14 fw_sans8"
                              onClick={() => this.props.history.push("/LiveWebinar")}
                              
                            >
                              READ MORE
                            </button>
                          
                          </div>
                        </div>
                      </div>
                    </header>
                  </div>
                  <div className="carousel-item" data-interval={ 5000}>
                    <header className="masthead  bg_col3">
                      <div className="container h-100">
                        <div className="row h-100 align-items-center">
                          <div className="col-12 co_white inner_master">
                            <h1 className="font-weight-light pb_10">
                              CPD Short Courses
                            </h1>
                            <p className="lead">
                            In order to provide quality training and skills to the engineers (both RE & PE), PEC regularly organizes short courses and trainings on emerging topics as well as technical and management aspects.
                             </p>
                            <br />
                            <button
                              type="button"
                              className="btn btn-success font_sans bold btn_carousel fz_14 fw_sans8"
                              onClick={() => this.props.history.push("/CpdShortCourse")}
                              
                            >
                              READ MORE
                            </button>
                          
                          </div>
                        </div>
                      </div>
                    </header>
                  </div>
                  <div className="carousel-item" data-interval={ 5000}>
                    <header className="masthead  bg_col4">
                      <div className="container h-100">
                        <div className="row h-100 align-items-center">
                          <div className="col-12 co_white inner_master">
                            <h1 className="font-weight-light pb_10">
                              CPD Profile
                            </h1>
                            <p className="lead">
                            The CPD programs include additional qualifications, professional skills, relevant management and communication skills acquired through additional training and experience
                             </p>
                            <br />
                            <button
                              type="button"
                              className="btn btn-success font_sans bold btn_carousel fz_14 fw_sans8"
                              onClick={() => this.props.history.push("/CpdProfile")}
                              
                            >
                              READ MORE
                            </button>
                          
                          </div>
                        </div>
                      </div>
                    </header>
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleInterval"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleInterval"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Next</span>
                </a>
              </div>
              <br />
            </div>
            <div className="col-md-3 marque_bord col_padding">
              <h5 className="text-center pt_20 bold">News and Updates</h5>
              <marquee
                behavior="scroll"
                id="mymarquee"
                direction="up"
                onMouseOver={this.hover}
                onMouseOut={this.outhover}
                className="mymarqueeid"
              >
                <div className="flex-container1 plr_flexcontainer">
                <div className="fz_12 co_black text-center">
                    <p>
                      Lorem ipsum dolor sit amet conti ipsum sit amet conti
                      ipsum
                    </p>
                  </div>
                  <div className="">
                  <img className="card-img-top card2"
                    src={require("../assets/image/photo-1528731708534-816fe59f90cb.jpg")}
                    alt="" 
                  />
                  </div>
                  <hr className="hr_mar" />
                </div>
                <div className="flex-container1 plr_flexcontainer">
                   <div className="fz_12 co_black text-center">
                    <p>
                      Lorem ipsum dolor sit amet conti ipsum sit amet conti
                      ipsum
                    </p>
                  </div>
                  <div className="">
                  <img className="card-img-top card2"
                    src={require("../assets/image/photo-1528731708534-816fe59f90cb.jpg")}
                    alt="" 
                  />
                  </div>
                  <hr className="hr_mar" />
                </div>
                <div className="flex-container1 plr_flexcontainer">
                  <div className="fz_12 co_black text-center">
                    <p>
                      Lorem ipsum dolor sit amet conti ipsum sit amet conti
                      ipsum
                    </p>
                  </div>
                  <div className="">
                  <img className="card-img-top card2"
                    src={require("../assets/image/photo-1528731708534-816fe59f90cb.jpg")}
                    alt="" 
                  />
                  </div>
                  <hr className="hr_mar" />
                </div>
              </marquee>
            </div>
          </div>
          <div>
            <h1 className="text-center mr_3 bold">CPD Activities</h1>
            <div className="row col_margin d-flex justify-content-center">
              <div className="col-auto col_padding"></div>
              <div className="col-md-5 col_padding text-center box mr_24 bg_col1">
                <h5 className="bold">Short Courses and Training</h5>
                <p className="fz_14 hei_5v">
              For technical ammendments and soft skill
                </p>
                <button
                  type="button"
                  className="btn btn-success font_sans bold fz_12 cpd_Act_btn"
                  onClick={() => this.props.history.push("/CpdShortCourse")}
                > 
                  VIEW DETAILS
                </button>
              </div>
              <br />
              <div className="col-md-5 col_padding text-center box mr_24 bg_col2">
                <h5 className="bold">Live Webinars</h5>
                <p className="fz_14 hei_5v">
                To learn innovative techniques and globel trends
                </p>
                <button
                  type="button"
                  className="btn btn-success font_sans bold fz_12 cpd_Act_btn"
                  onClick={() => this.props.history.push("/LiveWebinar")}
                >
                  VIEW DETAILS
                </button>
              </div>
              <div className="col-auto col_padding"></div>
            </div>
            <br />
            <div className="row col_margin d-flex justify-content-center ">
              <div className="col-auto col_padding"></div>
              <div className="col-md-5 col_padding text-center box mr_24 bg_col3">
                <h5 className="bold">Online Courses</h5>
                <p className="fz_14 hei_5v">
                 CPD courses for wider coverage and outreach
                </p>
                <button
                  type="button"
                  className="btn btn-success font_sans bold fz_12 cpd_Act_btn"
                  onClick={() => this.props.history.push("/onlineCourse")}
                >
                  VIEW DETAILS
                </button>
              </div>
              <br />
              <div className="col-md-5 col_padding text-center box mr_24 bg_col4">
                <h5 className="bold">Engineer's CPD Profile</h5>
                <p className="fz_14 hei_5v">
                 To check and update CPD record and engineers
                </p>
                <button
                  type="button"
                  className="btn btn-success font_sans bold fz_12 cpd_Act_btn"
                  onClick={() => this.props.history.push("/CpdProfile")}
                >
                  VIEW DETAILS
                </button>
              </div>
              <div className="col-auto col_padding"></div>
            </div>
          </div>
          <br />
          <br />
    <div className="row col_margin">
            <div className="col-md-12 text-center pd_80 bg_stick">
              <h2 className="co_white bold">
                PEC working towards capacity building and skill enhancement of engineers 
              </h2>
             
            </div>
          </div>
          <h1 className="text-center mr_3 bold" id="upcomingCourses">Upcoming Courses</h1>
          <div className="container none_other">
            <div className="row  d-flex justify-content-center">
              <div className="col-md-3 col-sm-6 col-xs-12 margin_2 card_w">
                <div className="card ">
                  <img
                    className="card-img-top card1"
                    src={require("../assets/image/cpd/course 2-01.png")}
                    style={{objectFit:'cover'}}   alt=""
                  />
                  <div className="card-body">
                    <p className="card-text fw_500">
                      some quick example text to build on the card.
                    </p>
                    <ul className="list-group list-group-flush">
                    <div>
                      <li className="list-group-item list_group_item_padding">
                        <div className="row col_margin">
                          <div className="col-9 plr_2 circle_handle">
                            <p>Resource Person</p>
                            <p
                            className="co_green ff_auto font-weight-bold"
                            style={{ textAlign: "left" }}
                          >
                            PKR 500
                          </p>
                          </div>
                          <div className="col-3 flex_row_reverse col_padding ">
                          <img
                              src={require("../assets/image/person.jpeg")}
                              alt="Avatar"
                              className="card_round_img"
                            />
                          </div>
                        </div>
                      </li>
                    </div>
                  </ul>
              
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-xs-12 margin_2 card_w">
                <div className="card ">
                <img
                    className="card-img-top card1"
                    src={require("../assets/image/cpd/course 2-01.png")}
                   style={{objectFit:'cover'}}     alt=""
                  />
                  <div className="card-body">
                    <p className="card-text fw_500">
                      some quick example text to build on the card.
                    </p>
                    <ul className="list-group list-group-flush">
                    <div>
                      <li className="list-group-item list_group_item_padding">
                        <div className="row col_margin">
                          <div className="col-9 plr_2 circle_handle">
                            <p>Resource Person</p>
                            <p
                            className="co_green ff_auto font-weight-bold"
                            style={{ textAlign: "left" }}
                          >
                            PKR 500
                          </p>
                          </div>
                          <div className="col-3 flex_row_reverse col_padding ">
                            <img
                              src={require("../assets/image/person.jpeg")}
                              alt="Avatar"
                              className="card_round_img"
                            />
                          </div>
                        </div>
                      </li>
                    </div>
                  </ul>
              
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-xs-12 margin_2 card_w">
                <div className="card ">
                <img
                    className="card-img-top card1"
                    src={require("../assets/image/cpd/course 2-01.png")}
style={{objectFit:'cover'}}                    alt=""
                  />
                  <div className="card-body">
                    <p className="card-text fw_500">
                      some quick example text to build on the card.
                    </p>
                    <ul className="list-group list-group-flush">
                    <div>
                      <li className="list-group-item list_group_item_padding">
                        <div className="row col_margin">
                          <div className="col-9 plr_2 circle_handle">
                            <p>Resource Person</p>
                            <p
                            className="co_green ff_auto font-weight-bold"
                            style={{ textAlign: "left" }}
                          >
                            PKR 500
                          </p>
                          </div>
                          <div className="col-3 flex_row_reverse col_padding ">
                            <img
                              src={require("../assets/image/person.jpeg")}
                              alt="Avatar"
                              className="card_round_img"
                            />
                          </div>
                        </div>
                      </li>
                    </div>
                  </ul>
              
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-xs-12 margin_2 card_w">
                <div className="card ">
                  <img
                    className="card-img-top card1"
                    src={require("../assets/image/cpd/course 2-01.png")}
style={{objectFit:'cover'}}                    alt=""
                  />
                  <div className="card-body">
                    <p className="card-text fw_500">
                      some quick example text to build on the card.
                    </p>
                    <ul className="list-group list-group-flush">
                    <div>
                      <li className="list-group-item list_group_item_padding">
                        <div className="row col_margin">
                          <div className="col-9 plr_2 circle_handle">
                            <p>Resource Person</p>
                            <p
                            className="co_green ff_auto font-weight-bold"
                            style={{ textAlign: "left" }}
                          >
                            PKR 500
                          </p>
                          </div>
                          <div className="col-3 flex_row_reverse col_padding ">
                            <img
                              src={require("../assets/image/person.jpeg")}
                              alt="Avatar"
                              className="card_round_img"
                            />
                          </div>
                        </div>
                      </li>
                    </div>
                  </ul>
              
                  </div>
                </div>
              </div>
             
              
            </div>
          </div>
          <div className="container display_none">
            <div className="row  d-flex justify-content-center">
              <div className="col-md-6 col-sm-6 col-xs-12 margin_2 card_w">
              <div className="card ">
              <img
                    className="card-img-top card1"
                    src={require("../assets/image/cpd/course 2-01.png")}
style={{objectFit:'cover'}}                    alt=""
                  />
                  <div className="card-body">
                    <p className="card-text fw_500">
                      some quick example text to build on the card.
                    </p>
                    <ul className="list-group list-group-flush">
                    <div>
                      <li className="list-group-item list_group_item_padding">
                        <div className="row col_margin">
                          <div className="col-9 plr_2 circle_handle">
                            <p>Resource Person</p>
                            <p
                            className="co_green ff_auto font-weight-bold"
                            style={{ textAlign: "left" }}
                          >
                            PKR 500
                          </p>
                          </div>
                          <div className="col-3 flex_row_reverse col_padding ">
                            <img
                              src={require("../assets/image/person.jpeg")}
                              alt="Avatar"
                              className="card_round_img"
                            />
                          </div>
                        </div>
                      </li>
                    </div>
                  </ul>
              
                  </div>
                </div>
             
              </div>
              <div className="col-md-6 col-sm-6 col-xs-12 margin_2 card_w">
              <div className="card ">
              <img
                    className="card-img-top card1"
                    src={require("../assets/image/cpd/course 2-01.png")}
style={{objectFit:'cover'}}                    alt=""
                  />
                  <div className="card-body">
                    <p className="card-text fw_500">
                      some quick example text to build on the card.
                    </p>
                    <ul className="list-group list-group-flush">
                    <div>
                      <li className="list-group-item list_group_item_padding">
                        <div className="row col_margin">
                          <div className="col-9 plr_2 circle_handle">
                            <p>Resource Person</p>
                            <p
                            className="co_green ff_auto font-weight-bold"
                            style={{ textAlign: "left" }}
                          >
                            PKR 500
                          </p>
                          </div>
                          <div className="col-3 flex_row_reverse col_padding ">
                            <img
                              src={require("../assets/image/person.jpeg")}
                              alt="Avatar"
                              className="card_round_img"
                            />
                          </div>
                        </div>
                      </li>
                    </div>
                  </ul>
              
                  </div>
                </div>
             
             </div>
              <div className="col-md-6 col-sm-6 col-xs-12 margin_2 card_w">
              <div className="card ">
                  <img
                    className="card-img-top card1"
                    src={require("../assets/image/cpd/course 2-01.png")}
style={{objectFit:'cover'}}                    alt=""
                  />
                  <div className="card-body">
                    <p className="card-text fw_500">
                      some quick example text to build on the card.
                    </p>
                    <ul className="list-group list-group-flush">
                    <div>
                      <li className="list-group-item list_group_item_padding">
                        <div className="row col_margin">
                          <div className="col-9 plr_2 circle_handle">
                            <p>Resource Person</p>
                            <p
                            className="co_green ff_auto font-weight-bold"
                            style={{ textAlign: "left" }}
                          >
                            PKR 500
                          </p>
                          </div>
                          <div className="col-3 flex_row_reverse col_padding ">
                            <img
                              src={require("../assets/image/person.jpeg")}
                              alt="Avatar"
                              className="card_round_img"
                            />
                          </div>
                        </div>
                      </li>
                    </div>
                  </ul>
              
                  </div>
                </div>
             </div>
              <div className="col-md-6 col-sm-6 col-xs-12 margin_2 card_w">
              <div className="card ">
                  <img
                    className="card-img-top card1"
                    src={require("../assets/image/cpd/course 2-01.png")}
style={{objectFit:'cover'}}                    alt=""
                  />
                  <div className="card-body">
                    <p className="card-text fw_500">
                      some quick example text to build on the card.
                    </p>
                    <ul className="list-group list-group-flush">
                    <div>
                      <li className="list-group-item list_group_item_padding">
                        <div className="row col_margin">
                          <div className="col-9 plr_2 circle_handle">
                            <p>Resource Person</p>
                            <p
                            className="co_green ff_auto font-weight-bold"
                            style={{ textAlign: "left" }}
                          >
                            PKR 500
                          </p>
                          </div>
                          <div className="col-3 flex_row_reverse col_padding ">
                            <img
                              src={require("../assets/image/person.jpeg")}
                              alt="Avatar"
                              className="card_round_img"
                            />
                          </div>
                        </div>
                      </li>
                    </div>
                  </ul>
              
                  </div>
                </div>
               </div>
            
            </div>
          </div>
          <br />
          <br />
          <div className="bg_col">
            <h1 className="text-center pd_3 co_white">News and Updates</h1>
            <div className="container">
              <div className="row col_margin d-flex justify-content-center">
                <div className="col-md-4 ">
                  <div className>
                    <img
                      className
                      style={{ width: "100%", height: "270px" }}
                      src={require("../assets/image/white.png")}
                      alt=""
                    />
                    <div className="card-body pl_0">
                      <h6 className="card-title co_white">
                        A Technology Driven Software
                      </h6>
                      <p className="card-text co_white fz_12">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <i className="fas fa-clock co_green float_l"></i>
                      <p className="co_white float_l fz_12 ml_10px">
                        April 1,2016
                      </p>
                      <br /> <br />
                    </div>
                  </div>
                </div>
                <div className="col-md-4 ">
                  <div className>
                    <img
                      className
                      style={{ width: "100%", height: "270px" }}
                      src={require("../assets/image/white.png")}
                      alt=""
                    />
                    <div className="card-body pl_0">
                      <h6 className="card-title co_white">
                        New Strategy Of Teaching
                      </h6>
                      <p className="card-text co_white fz_12">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <i className="fas fa-clock co_green float_l"></i>
                      <p className="co_white float_l fz_12 ml_10px">
                        April 1,2016
                      </p>
                      <br /> <br />
                    </div>
                  </div>
                </div>
                <div className="col-md-4 ">
                  <div className>
                    <img
                      className
                      style={{ width: "100%", height: "270px" }}
                      src={require("../assets/image/white.png")}
                      alt=""
                    />
                    <div className="card-body pl_0">
                      <h6 className="card-title co_white">
                        Introduction MicroProcessor
                      </h6>
                      <p className="card-text co_white fz_12">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <i className="fas fa-clock co_green float_l"></i>
                      <p className="co_white float_l fz_12 ml_10px">
                        April 1,2016
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>
          <div className="bg_col">
            <div className="container">
              <div
                className="row col_margin d-flex justify-content-center "
                style={{ padding: "50px 0px" }}
              >
                <div className="col-md-3  text-left co_white our_num margin_2">
                  <h2>We growing together</h2>
                  <p>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content
                  </p>
                </div>
                <div className="col-md-3 text-center margin_2">
                  <div className style={{ border: "1px solid #757A88" }}>
                    <i className="fas fa-trophy fa-3x co_green pt_100" />
                    <h1 className="co_white pt_5 pb_5 bold">290092</h1>
                    <div className="hl"></div>
                    <p className="co_white pt_20 bold">MEMBERS</p>
                  </div>
                </div>
                <br />
                <div className="col-md-3 text-center margin_2">
                  <div className style={{ border: "1px solid #757A88" }}>
                    <i className="fas fa-suitcase fa-3x co_green pt_100" />
                    <h1 className="co_white pt_5 pb_5 bold">378</h1>
                    <div className="hl"></div>
                    <p className="co_white pt_20 bold">COURSES</p>
                  </div>
                </div>
                <div className="col-md-3 text-center margin_2">
                  <div className style={{ border: "1px solid #757A88" }}>
                    <i className="fas fa-graduation-cap fa-3x co_green pt_100" />
                    <h1 className="co_white pt_5 pb_5 bold">27431</h1>
                    <div className="hl"></div>
                    <p className="co_white pt_20 bold text-uppercase">Participants</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: "#06580E" }}>
            <div className="container">
              <div className="row col_margin d-flex justify-content-center sub_new">
                <div className="col-md-6 co_white pt_7ip">
                  <h2>Subscribe to Our Newsletter</h2>
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control place_white"
                    style={{
                      backgroundColor: "transparent",
                      color: "white",
                      border: "1px solid"
                    }}
                    placeholder="Your Email *"
                  />
                  <br />
                </div>
                <div className="col-md-2 col_padding text-center">
                  <button
                    type="button"
                    className="btn btn-success co_green bold mb_5 font_sans fz_14 "
                    style={{
                      backgroundColor: "white",
                      width: "92%",
                      height: "40px"
                    }}
                  >
                    SUBSCRIBE
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <h1 className="text-center pd_3 bold">CPD Features and Working</h1>
            <div className="row col_margin d-flex justify-content-center ">
              <div className="col-md-3 text-center">
                <i className="fas fa-trophy fa-2x bc_green circle" />
                <h6 className="co_black pt_20 bold">Browse Our Course</h6>
                <p className="co_black fz_12">
                To see the list of courses
                </p>
              </div>
              <div className="col-md-3 text-center">
                <i className="fas fa-suitcase fa-2x bc_green circle" />
                <h6 className="co_black pt_20 bold">Choose the Plan</h6>
                <p className="co_black fz_12">
                 To enroll for the course/webinar
                </p>
              </div>
              <div className="col-md-3 text-center">
                <i className="fas fa-graduation-cap fa-2x bc_green circle " />
                <h6 className="co_black pt_20 bold">Enroll in the Course</h6>
                <p className="co_black fz_12">
                    To enroll upcoming course
                </p>
              </div>
              <div className="col-md-3 text-center">
                <i className="fas fa-trophy fa-2x bc_green circle" />
                <h6 className="co_black pt_20 bold">Boost your Skill Set</h6>
                <p className="co_black fz_12">
                To see a list of recored Webinars/courses
                </p>
              </div>
            </div>
            <br />
          </div>
          <div>
            <div style={{ backgroundColor: "#4F5667" }}>
              <div className="container">
                <div
                  className="row col_margin d-flex justify-content-center "
                  style={{ padding: "35px 0px" }}
                >
                  <div className="col-md-1 flex_center col_padding pt_3">
                    <i
                      className="fas fa-users fa-2x co_white"
                      style={{
                        padding: "10px",
                        border: "1px solid #757A88",
                        borderRadius: "50%"
                      }}
                    />
                  </div>
                  <div className="col-md-9">
                    <div className="co_white">
                      <h3 className="Pt_10 fz_2re icon_center">
                      290092 Engineers already joined, take the first step
                      </h3>
                    </div>
                  </div>
                  <div className="col-md-2 flex_center col_padding">
                    <button
                      type="button"
                      className="btn font_sans bold fz_14 bordersilver mt_10 join col_padding"
                      style={{
                        width: "100%",
                        border: "1px solid #828793",
                        height: "50px"
                      }}
                      onClick={this.join}
                    >
                      JOIN US
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="container">
            <div className="row col_margin d-flex justify-content-center ">
              <div className="col-md-4  text-left">
                <h3>Contact Us</h3>
                <div className="row Pt_10">
                  <div className="col-1">
                    <i className="fas fa-map-marker-alt co_green mt_10"></i>
                  </div>
                  <div className="col-10 pt_3">
                    <a target="_blank" href="https://www.google.com/maps/place/Pakistan+Engineering+Council/@33.7239847,73.0909047,17z/data=!3m1!4b1!4m5!3m4!1s0x38dfc07e98fce659:0xbf9fcfb8daab700b!8m2!3d33.7239803!4d73.0930934" 
                    className="fz_12 co_black">
                    Pakistan Engineering Council
                    Ataturk Avenue (East), G-5/2 Islamabad
                    </a>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-1">
                    <i className="fa fa-phone co_green fz_13 fa-rotate-90 mt-2" aria-hidden="true"></i>
                   </div>
                  <div className="col-10 pt_3">
                  <a target="_blank" href="tel:(+92-51) 111-111-732" className="fz_12 co_black">(+92-51) 111-111-732</a>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-1">
                    <i className="fas fa-envelope co_green mt-0_5"></i>
                  </div>
                  <div className="col-10 pt_3">
                  <a target="_blank" href="mailto:cpd@pec.org.pk" className="fz_12 co_black">cpd@pec.org.pk</a>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="Pt_10">
                  <input
                    type="text"
                    className="form-control mr_5 co_black"
                    name="Name"
                    style={{ width: "30%", float: "left",fontSize:"14px" }}
                    placeholder="Name *"
                    onChange={this.statechange}
                  />
                  <input
                    type="email"
                    className="form-control mr_5 co_black"
                    name="Email"
                    style={{ width: "30%", float: "left",fontSize:"14px" }}
                    placeholder="Email *"
                    onChange={this.statechange}
                  />
                  <input
                    type="text"
                    className="form-control co_black"
                    name="Subject"
                    style={{ width: "30%",fontSize:"14px" }}
                    placeholder="Subject"
                    onChange={this.statechange}
                  />
                  <textarea
                    className="form-control mt_10 co_black"
                    name="Message"
                    rows={5}
                    placeholder="Message *"
                    onChange={this.statechange}
                    style={{ fontSize: "14px" }}
                  />
                  <button
                    type="button"
                    className="btn btn-success bold font_sans mt_10 fz_14"
                    style={{ width: "250px", height: "40px" }}
                    onClick={this.contactus}
                  >
                    SUBMIT A MESSAGE
                  </button>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br /> <br />
          <Footer />
        </section>
      </React.Fragment>
    );
  }
}
export default Home;
