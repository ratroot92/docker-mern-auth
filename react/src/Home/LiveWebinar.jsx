// import React from 'react';
// import Chat from "./Chat";
// // import "../assets/css/main.css";
// import Header from './Header';
// import Footer from './Footer';

// class LiveWebinar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       day:"",
//       hour:"",
//       minute:"",
//       secound:"",
//       display:"none",
//       display1:"block"
//     }
//   }

//   componentDidMount(){
//     document.title = "Live Webinar";
//     var countDownDate = new Date("Jan 1, 2020 12:00:00").getTime();
//       setInterval(() => {
//         var now = new Date().getTime();
//         var distance = countDownDate - now;
//         var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//         var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//         var seconds = Math.floor((distance % (1000 * 60)) / 1000);
//         this.setState({
//             day:days,
//             hour:hours,
//             minute:minutes,
//             secound:seconds
//           })
//       }, 1000);

//     // Update the count down every 1 second
//     var countdownfunction = setInterval(function() {
//       // Get todays date and time
//       var now = new Date().getTime();
//       // Find the distance between now an the count down date
//       var distance = countDownDate - now;
//       // Time calculations for days, hours, minutes and seconds
//       var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//       var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//       var seconds = Math.floor((distance % (1000 * 60)) / 1000);
//       // document.getElementById("countdays").innerHTML = days;
//       // document.getElementById("counthours").innerHTML =  hours;
//       // document.getElementById("countmints").innerHTML = minutes;
//       // document.getElementById("countsec").innerHTML =seconds;
//       // If the count down is over, write some text
//       if (distance < 0) {
//         clearInterval(countdownfunction);
//         document.getElementById("countdays").innerHTML = "Expire";
//         document.getElementById("counthours").innerHTML = "Expire";
//         document.getElementById("countmints").innerHTML = "Expire";
//         document.getElementById("countsec").innerHTML = "Expire";
//       }
//     }, 1000);

// }
// click1=()=>{
//   // debugger;
//     // event.preventDefault();
//     this.setState({display:"block"})
//     this.setState({display1:"none"})

// }

//   render() {
//     return (
//       <React.Fragment>
//         <section  className="backco_white" style={{ fontFamily: 'Arial' }}>
//           <Header />
//           <div className="row col_margin">
//             <div className="col-md-1" style={{ padding: '2%' }}>
//               {/* <CpdActivitiesSIDEbar data={this.state.data} />/ */}
//             </div>
//             <div className="col-md-11 col_padding intr_mr">
//               <div className="row col_margin">
//                 <div className="col-md-5">
//                 <h3 className="bold" style={{ margin: '5vh 0px 0px 1px',paddingLeft:"2%" }}>Spiking stored carbon loss in Amazon</h3>
//           </div>
//              <div className="col-md-2">
//              <h5 className="live_webinar_text">Live Webinar</h5>
//                  </div>
//              </div>

//                <div className="row col_margin">
//                 <div className="col-md-8 col_padding"  style={{ padding: '2%' }}>
//                   <div style={{display:this.state.display}}>
//                         <iframe src="//iframe.dacast.com/b/145046/c/516109" width="100%" height="400" frameborder="0" scrolling="no" allow="autoplay" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
//                   </div>
//                 <div className="" style={{backgroundColor:"#2C3449",borderRadius:"8px",display:this.state.display1}}>
//                 <div className="row">
//                 <div className="col-md-3"></div>
//                 <div className="col-md-6 col_padding text-center flex_center" style={{height:"70vh",width:"100%"}}>
//                   <div className="row col_padding">
//                     <div className="col-md-3 col_padding">
//                    <span className="counter_center" id="countdays">{this.state.day}</span>
//                     <br/>  <br/>
//                     <h6 className="Counter_days">Days</h6>
//                     </div>
//                     <div className="col-md-3 col_padding">
//                     <span className="counter_center"  id="counthours">{this.state.hour}</span>
//                     <br/>  <br/>
//                     <h6 className="Counter_days">Hours</h6>
//                     </div>
//                     <div className="col-md-3 col_padding">
//                     <span className="counter_center"  id="countmints">{this.state.minute}</span>
//                     <br/>  <br/>
//                     <h6 className="Counter_days">Minutes</h6>
//                     </div>
//                     <div className="col-md-3 col_padding">
//                    <span className="counter_center"  id="countsec">{this.state.secound}</span>
//                     <br/>  <br/>
//                     <h6 className="Counter_days">Seconds</h6>
//                     </div>
//                     <button type="button" className="btn btn-success bold fz_16 text-center btn_counter"
//                       onClick={this.click1} >
//                     Go Live!
//                   </button>
//                   </div>
//                 </div>
//                  <div className="col-md-3"></div>
//                   </div>
//                 </div>
//              </div>
//                <div className="col-md-3 col_padding">
//                  <Chat/>
//                </div>
//              </div>
//           </div>
//          </div>
//          <div className="container">
//             <div className="row">
//             <div className="col-auto" ></div>
//             <div className="col-md-8">
//             <div className="row col_margin mt_2v">
//                   <div className="col-12 file_upload_border ptb_4v flex_center flex_colum">
//                   <img  src={require("../assets/image/designer_icon/Upload-files-here.png")}
//                   className="height_9v" alt="Download" />
//                    <h5>Upload your file here</h5>
//                    <h6>Drag and drop file here to start upload </h6>
//                    <button className="btn admin_btn btn_upload_admin">Choose Files</button>
//                   </div>
//                 </div>
//                 <div className="row col_margin live_web_border mtb_2v">
//                   <div className="col-md-2 col_padding text_file_box" >
//                          {/* <img  src={require("../assets/image/photo-1528731708534-816fe59f90cb.jpg")} className="img_upload_webi" alt="upload Image" /> */}
//                       <div className="text-center">
//                       <h5 className="co_white mb_unset">Andrew Ng </h5>
//                       <p className="co_white fz_14 mb_unset mr-2">Upload a file </p>
//                    </div>
//                 </div>
//                  <div className="col-md-6 col_padding flex_center">
//                     <p className="mb_unset padding_10">
//                       simply dummy text of the printing and typesetting industry, Lorem Ipsum has been the industry.
//                     </p>
//                 </div>
//                 <div className="col-md-2 col_padding">
//                   <div className=" text-center ptb_4v">
//                    <img  src={require("../assets/image/designer_icon/course content.png")}
//                   className="height_5v" alt="Course Content" />
//                   <p className="mb_unset fz_12">Course Content</p>
//                 </div>
//                 </div>
//                 <div className="col-md-1 col_padding">
//                 <div className=" text-center ptb_4v">
//                 <img  src={require("../assets/image/designer_icon/Downlaod.png")}
//                   className="height_5v" alt="Download" />
//                   <p className="mb_unset fz_12">Download</p>
//                 </div>
//                 </div>
//                 </div>
//                <div className="row col_margin live_web_border mtb_2v">
//                   <div className="col-md-2 col_padding text_file_box" >
//                       <div className="text-center">
//                       <h5 className="co_white mb_unset">Andrew Ng </h5>
//                       <p className="co_white fz_14 mb_unset mr-2">Upload a file </p>
//                    </div>
//                 </div>
//                  <div className="col-md-6 col_padding flex_center">
//                     <p className="mb_unset padding_10">
//                       simply dummy text of the printing and typesetting industry, Lorem Ipsum has been the industry.
//                     </p>
//                 </div>
//                 <div className="col-md-2 col_padding">
//                   <div className=" text-center ptb_4v">
//                    <img  src={require("../assets/image/designer_icon/course content.png")}
//                   className="height_5v" alt="Course Content" />
//                   <p className="mb_unset fz_12">Course Content</p>
//                 </div>
//                 </div>
//                 <div className="col-md-1 col_padding">
//                 <div className=" text-center ptb_4v">
//                 <img  src={require("../assets/image/designer_icon/Delete.png")}
//                   className="height_5v" alt="Download" />
//                   <p className="mb_unset fz_12">Download</p>
//                 </div>
//                 </div>
//                 </div>

//               </div>

//             <div className="col-auto" ></div>
//             </div>
//           </div>

//           <Footer />
//         </section>
//       </React.Fragment>
//     )
//   };
// }
// export default LiveWebinar;

// import React, { Component } from "react";
// import Header from "./Header";
// import Footer from "./Footer";
// class Webinartest extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   render() {
//     return (
//       <React.Fragment>
//         <div className="backco_white">
//           <Header />

//           <div className="container">
//             <br />
//             <br />
//             <iframe
//               src="//iframe.dacast.com/b/143200/c/513867"
//               width="100%"
//               height="500"
//               frameborder="0"
//               scrolling="no"
//               allow="autoplay"
//               allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"
//             ></iframe>
//             <br />
//           </div>
//           <Footer />
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// export default Webinartest;

import React from "react";
import Chat from "./Chat";
// import "../assets/css/main.css";
import Header from "./Header";
import Footer from "./Footer";

class LiveWebinar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: "",
      hour: "",
      minute: "",
      secound: ""
    };
  }
  componentWillMount() {}
  componentDidMount() {
    document.title = "Live Webinar";
  }
  render() {
    return (
      <React.Fragment>
        <section className="backco_white" style={{ fontFamily: "Arial" }}>
          <Header />
          <div className="container">
            <div className="row col_margin">
              <div className="col-md-3"></div>
              <div className="col-md-6 col_padding">
                <Chat />
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>

          <Footer />
        </section>
      </React.Fragment>
    );
  }
}
export default LiveWebinar;
