import React from "react";
import "../assets/css/talhacss/Description_webinar.css";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import urlapi from "../config/urlapi";
import WebNotif from "../components/WebNotif";
// import $ from 'jquery';

class Description_webinar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icondown: '<i class="fas fa-angle-down co_green"></i>',
      iconup: '<i class="fas fa-angle-up co_green"></i>',
      getEngId: localStorage.getItem("engId"),
      getEngInfo: [],

      disabled: ""
    };
  }
  componentDidMount() {
    document.title = "Live Webinar";
    window.scrollTo(0, 0);
  }
  btnshowtext = () => {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = `Read more ${this.state.icondown}`;
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = `Read less ${this.state.iconup}`;
      moreText.style.display = "inline";
    }
  };
  RegisteredForWebinar = event => {
    event.preventDefault();
    this.props.history.push("/Login");
  };
  Livewebinarurl = event => {
   event.preventDefault();
     this.props.history.push('/Self_Motivation:A_Tool_to_Gain_Peak_Performance_for_Engineers');
   
  //  axios.get(urlapi + "/admin/engLimit")
  // .then(res => {
  //   if (res.data.length >=1) {
  //     var obj = new WebNotif();
  //     obj.createNotification('error',"We apologize, the number of seats for this webinar already full")
  
  //   } else {
  //   var obj = new WebNotif();
  //   obj.createNotification('success',"this webinar already full")
  //   }
  // }).catch(erro => {console.log("erro") });


  };
  yesAttendWebinar = event => {
    event.preventDefault();
   //1get eng 2 eng email find 3 create email 4 limit
    axios.get(urlapi + "/admin/engLimit")
    .then(res => {
      if (res.data.length >=830) {
        // console.log("500>",res)
        axios.post(urlapi + "/admin/engContain", {
          engid:localStorage.getItem('engId'),
       })
        .then(res => {
          console.log("0>",res)
         if(res.data.length >0){
          this.setState({ disabled: "1" });
         }else{
          var obj = new WebNotif();
          obj.createNotification('error',"We apologize, the number of seats for this webinar already full")
         }
        })
          .catch(erro => {console.log("erro",erro)});

        console.log(res.data);
      } else {
        axios.post(urlapi + "/admin/engineerInformation", {
        engineerId: this.state.getEngId
      })
      .then(resi => {
        this.setState({ disabled: "1" });
        if(resi.data[0]==null || resi.data[0]==undefined){
          axios.post(urlapi + "/admin/signup", {
            engid:localStorage.getItem('engId'),
            cnic:localStorage.getItem('CNIC')
         })
          .then(resi => {console.log("User Create Successfully")})
          .catch(erro => {console.log("erro")});
        }else{
          this.setState({ getEngInfo: resi.data[0] });
          var a = resi.data[0];
          axios.post(urlapi + "/admin/engineeridcheck", {
              email: a.email
            })
            .then(res => {
              // console.log("fd",res.data)
                    if (res.data.length > 0) {
                      console.log("user exist");
                    } else {
                      axios.post(urlapi + "/admin/signup", {
                          engid: a.engineerId,
                          number:a.contactNumber,
                          email: a.email,
                          UserName: a.name,
                          cnic:a.cnic
                        })
                        .then(resi => {
                          console.log("User Create Successfully");
                        axios.post(urlapi+'/admin/engineerInformation',{
                        engineerId:localStorage.getItem("engId"),
                         })
                      .then((resi)=> {   
                      axios.post(urlapi+'/admin/emailSecound',{
                      toemail:resi.data[0].email,
                        // toemail:'mohammadtalha163@gmail.com',
                      })
                      .then((resi)=> {console.log("resi",resi.data)
                       }).catch((erro)=> {  console.log("erro") })
                       }).catch((erro)=> {  console.log("erro") })
                        }).catch(erro => { console.log("erro") });
                 }
              }).catch(erro => {console.log("erro") });
          }
        }) .catch(erro => {console.log("erro")});
    }
  }).catch(erro => {console.log("erro") });

  
};

  render() {
    return (
      <React.Fragment>
        <section className="backco_white" style={{ fontFamily: "Arial" }}>
          <Header />
          <header className="image_hight_area ">
            <div className="container h-100">
              <div className="row h-100 align-items-center">
                <div className="col-12 co_white inner_text_Header">
                  <h2 className="font-weight-light mb_5">
                    Free Live Webinar  <br/>
                  "Self Motivation: A Tool to Gain Peak Performance for Engineers" <br/>
                    (0.5 CPD Points)
                  </h2>
                  {/* <p className="lead">
                  A Tool to Gain  Peak Performance for Engineers” scheduled to be held on 18th February 2020  and plugin below mentioned information .
                  </p> */}
                  <br />
                  <div>
                    <i className="far fa-calendar i_clock_Des"></i>
                    <span className="csrd-text mb_unset span_fz">
                      February 18, 2020 ( Tuesday )
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <i className="fas fa-clock i_clock_Des"></i>
                    <span className="csrd-text mb_unset span_fz">
                      10.30 AM to 12.30 PM ( two hours including Q&A )
                    </span>
                  </div>
                  &nbsp;&nbsp;&nbsp;
                </div>
              </div>
            </div>
          </header>
          <div className="container">
            {/* <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-10 mtb_10 icon_text">
                <h3 className="mtb_20 bold mt_unset">What you'll learn ?</h3>
                <div className="row">
                  <div className="col-md-6">
                    <i class="fas fa-check lineheight_2"></i>
                    <span className="ml_3p span_fz">
                      What you 'll learn what You need to Learn?
                    </span>
                    <br />
                    <i class="fas fa-check lineheight_2"></i>
                    <span className="ml_3p span_fz">
                      What you 'll learn what You need to Learn?
                    </span>
                    <br />
                    <i class="fas fa-check lineheight_2"></i>
                    <span className="ml_3p span_fz">
                      What you 'll learn what You need to Learn?
                    </span>
                    <br />
                    <i class="fas fa-check lineheight_2"></i>
                    <span className="ml_3p span_fz">
                      What you 'll learn what You need to Learn?
                    </span>
                    <br />
                    <i class="fas fa-check lineheight_2"></i>
                    <span className="ml_3p span_fz">
                      What you 'll learn what You need to Learn?
                    </span>
                    <br />
                  </div>
                  <div className="col-md-6">
                    <i class="fas fa-check lineheight_2"></i>
                    <span className="ml_3p span_fz">
                      What you 'll learn what You need to Learn?
                    </span>
                    <br />
                    <i class="fas fa-check lineheight_2"></i>
                    <span className="ml_3p span_fz">
                      What you 'll learn what You need to Learn?
                    </span>
                    <br />
                    <i class="fas fa-check lineheight_2"></i>
                    <span className="ml_3p span_fz">
                      What you 'll learn what You need to Learn?
                    </span>
                    <br />
                    <i class="fas fa-check lineheight_2"></i>
                    <span className="ml_3p span_fz">
                      What you 'll learn what You need to Learn?
                    </span>
                    <br />
                    <i class="fas fa-check lineheight_2"></i>
                    <span className="ml_3p span_fz">
                      What you 'll learn what You need to Learn?
                    </span>
                    <br />
                  </div>
                </div>
              </div>
              <div className="col-md-1"></div>
            </div>
           */}
            <div className="mtb-25">
              <h3 className="mb-15 bold">Description:</h3>
              <p className="Des_text">
                <span className="bold"> Webinar</span> is about helping
                engineers to discover{" "}
                <span className="bold">
                  {" "}
                  new ways of learning to maximize their knowledge and skills{" "}
                </span>
                to become more effective in handling complex issues emerging
                challenges.
              </p>
              <p className="Des_text">
                The subject topic{" "}
                <span className="bold">
                  Self-motivation: a Tool to Gain Peak Performance for
                  Engineers”
                </span>{" "}
                where self-motivation—is an important skill to drives people to
                keep going even in the face of set-backs, to take up
                opportunities, and to show commitment to what they want to
                achieve. The topic would guide self-motivation techniques to
                Gain maximum performance during job as well as during the
                professional career.
              </p>
              <div>
                {/* <a id="showmemore" href="#">
                Show More
              </a>
              <div id="contentofsite">
                content content content content content content content content
                content content content content content content content content
                content content content content content content content content
                content content content content content content content content
                content content content content content content content content
                content content content content content content content content
                content content content content content content content content
                content content content content content content content content
                content content content content content content content content
                content content content content content content content content
                content content content content content content content content
                content content content content content content content content
                content content content content content content content content
                content content content content content content content content
                content content content content content content content content
                content content content content content content content content
                content content content content content content content content
                content content content content content content content content
                content content content content content content content content
                content content content content content content content
                contentcontent content content content content content content
                content content content content content content content content
                content content content content content content content content
                content content content content content content content content
                content content content content content content content content
                content content content content content content content content
              </div>
          */}
                {/* <p className="Des_text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus imperdiet, nulla et dictum interdum, nisi lorem
                egestas vitae scel
                <span id="dots">...</span>
                <span id="more">
                  erisque enim ligula venenatis dolor. Maecenas nisl est,
                  ultrices nec congue eget, auctor vitae massa. Fusce luctus
                  vestibulum augue ut aliquet. Nunc sagittis dictum nisi, sed
                  ullamcorper ipsum dignissim ac. In at libero sed nunc
                  venenatis imperdiet sed ornare turpis. Donec vitae dui eget
                  tellus gravida venenatis. Integer fringilla congue eros non
                  fermentum. Sed dapibus pulvinar nibh tempor porta.
                </span>
              </p>
              <button
                onClick={this.btnshowtext}
                id="myBtn"
                className="btnshowmore_less"
              >
                Read more{" "}
                <span
                  dangerouslySetInnerHTML={{ __html: this.state.icondown }}
                ></span>
              </button> */}
              </div>

              <h3 className="mb-15 bold">Instructor Profile</h3>
              <div className="row col_margin mtb-20 text_center_mob">
              <div className="col-md-1 col_padding">
                <img
                  src={require("../assets/image/cpd/ALI.jpg")}
                  className="img_hei"
                  alt="Course Content"
                />
              </div>
              <div className="col-md-10">
                {/* <p className="co_1F fz_18p bold mb_unset">Dr Ali Sajid</p>
                <p className="mb_unset"> Head of Dept, Standard</p> */}
                {/* <div className="fz_12">
                  <span className="co_1F">★</span> &nbsp;
                  <span className="">4.75 rating</span>
                  &nbsp;&nbsp; <span className="">★</span> &nbsp;
                  <span className="">15 Webinars</span>
                </div> */}
                <p className="Des_text">
                <span className="bold">Dr Ali Sajid</span> is a Professor of
                Management & Leadership, a Corporate Trainer, and Community
                Development Volunteer, with firm believe on achieving results
                through "Management of Change & Motivational Aspects," which
                enabled him to conceive, design & launch and successfully
                deliver outstanding results in Educational Management Arena of
                Pakistan. He has done BS Mechanical Engg from UET, Lahore & MS &
                PhD in Engineering Management from the George Washington
                University, USA. He also taught in US Universities for many
                years & also worked at Word Bank. He has also worked in Planning
                Commission of Pakistan as "Adviser to Govt of Pakistan on
                "Quality & Productivity".
              </p>
              </div>
            </div>
            <p className="Des_text">
                Since 1988, he had been into higher education & Corporate
                Training in various universities across the globe. He had unique
                honor to conceive & launch 3 most successful Management/
                Business Schools in Pakistan during last 23 years from the very
                beginning at NUST, CASE and UET Lahore.
              </p>
              <p className="Des_text">
                Dr Ali Sajid is an official trainer in many public and private
                sector organizations like NESPAK, State Bank, USAID etc. He had
                taught & trained 1000s of Managers in Project Management,
                Leadership, Soft & interpersonal Skills, Customer Services,
                Quality, HRM, SCM etc. He has been giving consultancy on Change
                Management, OD, Quality enhancement etc.
              </p>
              <br />
              <h3 className="mb-15 bold">Webinar FEE</h3>
              <p className="Des_text bold">Free as introductory</p>
           
             </div>
 
            {/* <div>
              <p className="Des_text mtb-15">
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised
                in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </div> */}

            {// console.log(this.state.getEngId),
            this.state.getEngId == null ? (
              <div className="row col_margin">
               <div className="col-md-3"></div>
                <div className="col-md-6">
                  <button
                    type="button"
                    class="btn btn-success bold text-center btn_counter_logs_btn text-capitalize"
                    onClick={this.RegisteredForWebinar}
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    Register for Webinar
                  </button>
                </div>
                <div className="col-md-3"></div>
              </div>
            ) : (
              <div className="row col_margin">
                       <h4 className="mb-15 bold co_green">
              In order to successfully register for webinar please press the button
              "Yes I want to attend this webinar"		
              </h4>
                <div className="col-md-6">
                  <button
                    type="button"
                    class="btn btn-success bold fz_16 text-center btn_counter_logs_btn text-capitalize"
                    onClick={this.yesAttendWebinar}
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    yes i want to attend this webinar
                  </button>

                  <div
                    class="modal fade"
                    id="exampleModalCenter"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                  >
                    <div
                      class="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLongTitle">
                            Registered
                          </h5>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        {
                          this.state.disabled==""?(
                             <div class="modal-body">
                               {
                               setTimeout(() => {
                                 <p>   We apologize, the number of seats for this webinar already full</p>
                               },500),
                              <p>...</p>
                              }
                                  <br />            
                            </div> 
                          
                         )
                          :(
                            <div class="modal-body">
                            You successfuly registered for this webinar we will
                            send you follow up email one day before evnet
                            <br />
                          </div>
                          )
                        }
                       
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                          {/* <button type="button" class="btn btn-primary">Save changes</button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <button
                    disabled={!this.state.disabled}
                    type="button"
                    className="btn btn-success bold fz_16 text-center btn_counter_logs_btn text-capitalize"
                    onClick={this.Livewebinarurl}
                  >
                    Go To Live Webinar
                  </button>
                </div>
              </div>
            )}
          </div>
          <Footer />
        </section>
      </React.Fragment>
    );
  }
}
export default Description_webinar;
