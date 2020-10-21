import React from "react";
import Navigation from "./Navigation";

import "../assets/css/about.css";
const About = () => (
  <React.Fragment>
    <Navigation />
    <section>
      <div className="course_slider top-fix">
        <div className="container">
          <h2 className=" course-title-banner">About Us</h2>
        </div>
      </div>
      <div className="d-flex justify-content-center bg-white ptb-30 pt-50">
        <br></br> <img src={require("../assets/image/logo/logo.png")} height="100" />{" "}
        <br></br>
      </div>
      <div className="d-flex justify-content-center bg-white text-center">
        <br></br>
        <h5>
          Med-Exam Expert is an internationally recognized online study<br></br>{" "}
          platform for various examinations in the field of medicine
        </h5>
        <br></br>
      </div>
      <div className="d-flex justify-content-center bg-white">
        <div className="text-center container text-black pt-50 pb-50 lrp-80">
          Med-Exam Expert is an internationally recognized online study platform
          for various examinations in the field of medicine. We provide study
          opportunities to aspiring candidates across the globe. Our learning
          platform provides complete access to various courses, one-on-one
          interaction and feedback, and expert guidance from our highly skilled
          and trained team of doctors and course facilitators. Med-Exam Expert
          comprises of a team of highly skilled and trained practising doctors,
          who have cleared examinations and understand the challenges and
          complexities surrounding these examinations. The team’s rigorous and
          in-depth preparation shows their passion to impart detailed training
          and direction to ambitious doctors who wish to reach the same level of
          perfection.
        </div>
      </div>

      <div className="d-flex justify-content-center bg-white">
        {/* <img src={require("../assets/image/about-3.png")} /> */}
      </div>

      <div className=" bg-grey">
        <div className=" container">
          <div className="row lrm-0">
            <div className="col-md-6 bg-vision" />
            <div className="col-md-6 p-146 text-black">
              <h2>Vision</h2>
              <p>
                Our vision is to become the ultimate online learning platform
                for students and aspiring doctors worldwide. We want to provide
                on-the-go access to quality learning material, and be the
                epitome of online learning for all medical examinations that are
                recognised globally.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div className=" bg-white ">
        <div className=" container">
          <div className="row lrm-0 ">
            <div className="col-md-6 p-146 text-black">
              <h2>MISSION</h2>
              <p>
                Our mission is to provide quality learning material, and
                guidance from highly skilled, experience and trained doctors who
                can assist aspiring candidates to achieve the same level of
                perfection and success, sitting in the comfort of their own
                homes.
              </p>
            </div>
            <div className="col-md-6 bg-mission" />
          </div>
        </div>
      </div>
    </section>
    <section>
      <div className="bg-purple-gradient default-spacing">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <h3 className="white">
              <b>Our Instructors</b>
            </h3>
          </div>
          <br />
          <div className="row">
            <div className="col-md-3 text-center">
              {/* <img
                src={require("../assets/image/team.jpg")}
                className="rounded-circle"
                height="150"
                width="150"
                alt="team member"
              /> */}
              <p className="white">
                <b>Beenish Khan</b>
              </p>
              <p className="white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut{" "}
              </p>
            </div>
            <div className="col-md-3 text-center">
              {/* <img
                src={require("../assets/image/team.jpg")}
                className="rounded-circle"
                height="150"
                width="150"
                alt="team member"
              /> */}
              <p className="white">
                <b>Usama Zulfiqar</b>
              </p>
              <p className="white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut{" "}
              </p>
            </div>
            <div className="col-md-3 text-center">
              {/* <img
                src={require("../assets/image/team.jpg")}
                className="rounded-circle"
                height="150"
                width="150"
                alt="team member"
              /> */}
              <p className="white">
                <b>Muhammad Waseem Khan</b>
              </p>
              <p className="white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut{" "}
              </p>
            </div>
            <div className="col-md-3 text-center">
              {/* <img
                src={require("../assets/image/team.jpg")}
                className="rounded-circle"
                height="150"
                width="150"
                alt="team member"
              /> */}
              <p className="white">
                <b>Hassan Bin Zahid</b>
              </p>
              <p className="white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="bg-white">
      <div className=" container">
        <div className="row d-flex justify-content-center contact-us-heading">
          <div className=" col-md-8 homepage_contact_row  text-center">
            <div className="">
              <h1 className="clr-black">
                <b>Contact Us</b>
              </h1>
            </div>
            <br />
           
          </div>
        </div>
      </div>
    </section>
  </React.Fragment>
);
export default About;
