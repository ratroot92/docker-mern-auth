import React from 'react';
import Chat from "./Chat";
// import "../assets/css/main.css";
import Header from './Header';
import Footer from './Footer';

class LiveWebinar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day:"",
      hour:"",
      minute:"",
      secound:""

    }
  }
  componentWillMount(){
   
  }
  componentDidMount(){
    document.title = "Live Webinar";
    var countDownDate = new Date("Jan 1, 2020 00:00:00").getTime();
      setInterval(() => {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.setState({
            day:days,
            hour:hours,
            minute:minutes,
            secound:seconds
          })
      }, 1000);

}
  render() {
    return (
      <React.Fragment>
        <section  className="backco_white" style={{ fontFamily: 'Arial' }}>
          <Header />
          <div className="row col_margin">
            <div className="col-md-1" style={{ padding: '2%' }}>
              {/* <CpdActivitiesSIDEbar data={this.state.data} />/ */}
            </div>
            <div className="col-md-11 col_padding intr_mr">
              <div className="row col_margin">
                <div className="col-md-5">
                <h3 className="bold" style={{ margin: '5vh 0px 0px 1px',paddingLeft:"2%" }}>Spiking stored carbon loss in Amazon</h3>
             </div>
             <div className="col-md-2">
                 <h5 className="live_webinar_text">Live Webinar</h5>
                </div>
             </div>
             
              <div className="row col_margin">
                <div className="col-md-7 col_padding"  style={{ padding: '2%' }}>
                 <div>
                 <iframe
                  src="//iframe.dacast.com/b/147780/c/519617" 
                  width="100%"
                  height="500"
                  frameborder="0"
                  scrolling="no"
                  allow="autoplay"
                  allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"
                ></iframe>
                </div>
               </div>
               <div className="col-md-4 col_padding">
                 <Chat/>
               </div>
             </div>
             </div>
          </div>
          {/* <div className="container">
            <div className="row">
            <div className="col-auto" ></div>
            <div className="col-md-8">
          <div className="row col_margin live_web_border mtb_2v">
           <div className="col-md-2 col_padding text_file_box" >
                      <div className="text-center">
                      <h5 className="co_white mb_unset">Andrew Ng </h5>
                      <p className="co_white fz_14 mb_unset mr-2">Upload a file </p>
                   </div>
                </div>
                 <div className="col-md-6 col_padding flex_center">
                    <p className="mb_unset padding_10">
                      simply dummy text of the printing and typesetting industry, Lorem Ipsum has been the industry.
                    </p>
                </div>
                <div className="col-md-2 col_padding">
                  <div className=" text-center ptb_4v">
                  <img  src={require("../assets/image/designer_icon/course content.png")} 
                  className="height_5v" alt="Course Content" />
                  <p className="mb_unset fz_12">Course Content</p>
                </div>
                </div>
                <div className="col-md-1 col_padding">
                <div className=" text-center ptb_4v">
                <img  src={require("../assets/image/designer_icon/Downlaod.png")} 
                  className="height_5v" alt="Download" />
                  <p className="mb_unset fz_12">Download</p>
                </div>
                </div>
                </div>
                </div>
            <div className="col-auto" ></div>
            </div>
          </div>
          <div className="container">
            <div className="row">
            <div className="col-auto" ></div>
            <div className="col-md-8">
            <div className="row col_margin live_web_border mtb_2v">
                  <div className="col-md-2 col_padding text_file_box" >
                      <div className="text-center">
                      <h5 className="co_white mb_unset">Andrew Ng </h5>
                      <p className="co_white fz_14 mb_unset mr-2">Upload a file </p>
                   </div>
                </div>
                 <div className="col-md-6 col_padding flex_center">
                    <p className="mb_unset padding_10">
                      simply dummy text of the printing and typesetting industry, Lorem Ipsum has been the industry.
                    </p>
                </div>
                <div className="col-md-2 col_padding">
                  <div className=" text-center ptb_4v">
                  <img  src={require("../assets/image/designer_icon/course content.png")} 
                  className="height_5v" alt="Course Content" />
                  <p className="mb_unset fz_12">Course Content</p>
                </div>
                </div>
                <div className="col-md-1 col_padding">
                <div className=" text-center ptb_4v">
                <img  src={require("../assets/image/designer_icon/Downlaod.png")} 
                  className="height_5v" alt="Download" />
                  <p className="mb_unset fz_12">Download</p>
                </div>
                </div>
                </div>
               </div>
            <div className="col-auto" ></div>
            </div>
          </div>
              */}

          <Footer />
        </section>
      </React.Fragment>
    )
  };
}
export default LiveWebinar;