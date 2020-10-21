import React from "react";
import Chat from "./Chat";
// import "../assets/css/main.css";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import urlapi from "../config/urlapi";
import Timer from "react-compound-timer";
import WebNotif from "../components/WebNotif";
var obj = new WebNotif();
class userLogss extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: "",
      hour: "",
      minute: "",
      secound: "",
      displaynone: "none",
      displayblock: "block",
      validateuser: [],
      clasCounter: 10,
      startDate: "",
      endDate: ""
    };
  }
  componentDidMount() {
    document.title = "Live Webinar";

    axios.get(urlapi + "/msg/addpecNumber")
    .then(res => {
      // console.log("talha",res.data);
      var a=res.data;
      // console.log(a);
       a.map((key,list)=>{
        //  console.log("map",list,"sds",key.engid);
        axios.post(urlapi+'/admin/engineerInformation',{
          engineerId:key.engid,
      })
      .then(resengineerInformation => {   
      //  console.log("res",resengineerInformation.data[0].pecNo,"engineerId",resengineerInformation.data[0].engineerId)
       axios.post(urlapi+'/msg/addtimer',{
        engid:resengineerInformation.data[0].engineerId,
        descpline:resengineerInformation.data[0].discipline,
        email:resengineerInformation.data[0].email,
        address:resengineerInformation.data[0].address
       })
       .then(resupdatetimer => {
        //  console.log("resupdatetimer",resupdatetimer)
      })
       .catch(error => {console.log("erro")})
     }) .catch(error => {console.log("erro")}) })
   })
    .catch(err => {console.log("erro") });




    setTimeout(() => {
      var d = new Date().toLocaleTimeString();
      axios
        .post(urlapi + "/msg/addtimer", {
          engid: localStorage.getItem("engId"),
          timer_end: d,
          name: localStorage.getItem("engName")
        })
        .then(res => {
          clearTimeout();
        })
        .catch(err => {
          console.log("erro");
        });
    }, 5000);
    setInterval(() => {
      var d = new Date().toLocaleTimeString();
      axios
        .post(urlapi + "/msg/addtimer", {
          engid: localStorage.getItem("engId"),
          timer_end: d
          // idsend:2,
        })
        .then(res => {})
        .catch(err => {
          console.log("erro");
        });
      // clearTimeout();
    }, 8000);

    var countDownDate = new Date("Feb 17, 2020 05:00:00").getTime();
    setInterval(() => {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.setState({
        day: days,
        hour: hours,
        minute: minutes,
        secound: seconds
      });
      if (distance < 0) {
        this.setState({
          day: "Expire",
          hour: "Expire",
          minute: "Expire",
          secound: "Expire",
          displaynone: "block",
          displayblock: "none",
          clasCounter: 8
        });
        clearInterval();
      }
    }, 1000);
    if (
      localStorage.getItem("engId") == null ||
      localStorage.getItem("engId") == ""
    ) {
      obj.createNotification("error", "Please sign in before Access this page");
      this.props.history.push("/login");
    } else {
      axios
        .post(urlapi + "/admin/engContain", {
          engid: localStorage.getItem("engId")
        })
        .then(res => {
          //  console.log("talha", res.data);
          if (res.data.length == 0) {
            obj.createNotification(
              "error",
              "We apologize, the number of seats for this webinar already full"
            );
            this.props.history.push("/");
          } else {
            axios
              .post(urlapi + "/admin/engineerInformation", {
                engineerId: localStorage.getItem("engId")
              })
              .then(resi => {
                //  console.log("resi",resi.data[0]);
                localStorage.setItem("engName", resi.data[0].name);
              })
              .catch(erro => {
                console.log("erro");
              });
          }
        })
        .catch(erro => {
          console.log("erro");
        });
    }
  }
  click1 = event => {
    this.setState({ displaynone: "block" });
    this.setState({ displayblock: "none" });
    event.preventDefault();
    this.props.history.push("/Login");
  };

  render() {
    return (
      <React.Fragment>
        <section className="backco_white" style={{ fontFamily: "Arial" }}>
          <Header />
          {/* <Timer formatValue={(value) => `${(value < 10 ? `0${value}` : value)} units `}>
          <Timer.Hours formatValue={value => `${value} hours. `} />
          <Timer.Minutes formatValue={value => `${value} minutes. `} />
          <Timer.Seconds formatValue={value => `${value} s. `} />
          </Timer> */}
          <div className="row col_margin">
            <div className="col-md-1" style={{ padding: "2%" }}>
              {/* <CpdActivitiesSIDEbar data={this.state.data} />/ */}
            </div>
            <div className="col-md-11 col_padding intr_mr">
              <div className="row col_margin">
                <div className="col-md-10">
                  <h3
                    className="bold"
                    style={{ margin: "5vh 0px 0px 1px", paddingLeft: "2%" }}
                  >
                    Free Live Webinar (0.5 CPD Points) <br />
                    "Self Motivation: A Tool to Gain Peak Performance for
                    Engineers"
                  </h3>
                </div>
                <div className="col-md-2">
                  {/* <h5 className="live_webinar_text"></h5> */}
                </div>
              </div>
              <div className="row col_margin">
                <div
                  className={
                    this.state.clasCounter == 10
                      ? "col-md-10 col_padding"
                      : "col-md-7 col_padding"
                  }
                  style={{ padding: "2%" }}
                >
                  <div
                    className=""
                    style={{
                      backgroundColor: "#2C3449",
                      borderRadius: "8px",
                      display: this.state.displayblock
                    }}
                  >
                    <div className="row">
                      <div className="col-md-2"></div>
                      <div className="col-md-8 col_padding text-center counter_desk">
                        <div className="row col_padding">
                          <div className="col-md-3 col_padding">
                            <span
                              className="counter_centerUserlogs"
                              id="countdays"
                            >
                              {this.state.day}
                            </span>
                            <br /> <br />
                            <h6 className="Counter_days">Days</h6>
                          </div>
                          <div className="col-md-3 col_padding">
                            <span
                              className="counter_centerUserlogs"
                              id="counthours"
                            >
                              {this.state.hour}
                            </span>
                            <br /> <br />
                            <h6 className="Counter_days">Hours</h6>
                          </div>
                          <div className="col-md-3 col_padding">
                            <span
                              className="counter_centerUserlogs"
                              id="countmints"
                            >
                              {this.state.minute}
                            </span>
                            <br /> <br />
                            <h6 className="Counter_days">Minutes</h6>
                          </div>
                          <div className="col-md-3 col_padding">
                            <span
                              className="counter_centerUserlogs"
                              id="countsec"
                            >
                              {this.state.secound}
                            </span>
                            <br /> <br />
                            <h6 className="Counter_days">Seconds</h6>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2"></div>
                    </div>
                  </div>
                  {/* <iframe
                    style={{ display: this.state.displaynone }}
                    src="//iframe.dacast.com/b/145046/c/516109"
                    width="100%"
                    height="500"
                    frameborder="0"
                    scrolling="no"
                    allow="autoplay"
                    allowFullScreen="true"
                    webkitallowfullscreen="true"
                    mozallowfullscreen="true"
                  ></iframe> */}

                  <iframe
                    src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FDrAliSajidOfficial%2Fvideos%2F171842570910195%2F&width=500&show_text=false&height=281&appId"
                    width={'100%'}
                    height={500}
                    style={{ border: "none", overflow: "hidden" }}
                    scrolling="no"
                    frameBorder={0}
                    allowTransparency="true"
                    allow="encrypted-media"
                    allowFullScreen="true"
                  />
                </div>
                <div
                  className="col-md-4 col_padding"
                  style={{ display: this.state.displaynone }}
                >
                  <Chat />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </section>
      </React.Fragment>
    );
  }
}
export default userLogss;
