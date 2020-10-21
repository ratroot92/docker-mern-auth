import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import CpdActivitiesSIDEbar from "./CpdActivitiesSIDEbar";

class PEB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
            name: "Introduction",
            url: "/ProfessionalEngnrBodies#introduction",
         },
        {
            name: "Crieteria for Registration",
            url: "/ProfessionalEngnrBodies#crieteria",
            type:"a"
        },
        {
            name: "Procedure for Registration",
            url: "/ProfessionalEngnrBodies#procedure",
            type:"a"
        },
        {
            name: "List of PEBs",
            url: "/PEB"
        }, 
        {
            name: "PEB Dashboard",
            url: "PEBDashboard",
            type:"button",
            "child":[
              {
                name: "Apply for Renewal",
                url: "#",
              },
              {
                name: "CPD Calendar",
                url: "/PEBs_calendar_2020",
              },
              {
                name: "CPD Returns",
                url: "#",
              },
              {
                name: "Contact Us",
                url: "#",
              }
            ]
          }
      ]
    }
  }
  componentDidMount() {
    document.title = "PEB";
  }
  render() {
    return (
      <React.Fragment>
         <section  className="backco_white" style={{ fontFamily: 'Arial' }}>
          <Header />
          <div className="row col_margin">
            <div className="col-md-3 col_padding" style={{ padding: "1%" }}>
              <CpdActivitiesSIDEbar data={this.state.data} />
            </div>
            <div className="col-md-8 col_padding intr_mr">
              <h3 className="pebHead_mar text-center">
              List of PEBs
              </h3>
              <div className="mtb_20">
                   <a
                    href="#pec"
                    className="btn btn_eae bold font_sans fz_13 mt_10 ml_10px mb_10"
                  >
                    PEC
                  </a>
                  <a
                    href="#federal"
                    className="btn btn_eae bold font_sans fz_13 mt_10 ml_10px mb_10"
                  >
                    Federal
                  </a>
                  <a
                    href="#punjab"
                    className="btn btn_eae bold font_sans fz_13 mt_10 ml_10px mb_10"
                    >
                    Punjab
                  </a>
                  <a
                    href="#kpk"
                    className="btn btn_eae bold font_sans fz_13 mt_10 ml_10px mb_10"
                  >
                    KPK
                  </a>
                   <a href="#sindh"
                    className="btn btn_eae bold font_sans fz_13 mt_10 ml_10px mb_10"
                  >
                    Sindh
                  </a>   
                  <a
                    href="#balochistan"
                    className="btn btn_eae bold font_sans fz_13 mt_10 ml_10px mb_10"
                   >
                    Balochistan
                  </a>
                  <a
                    href="#ajk"
                    className="btn btn_eae bold font_sans fz_13 mt_10 ml_10px mb_10"
                  >
                    AJ&K
                  </a>
               </div>
              <h5 className="backco_green co_white ml_12 peb_head mr_15  mt_10 mb_10" id="pec">Pakistan Engineering Council</h5>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Pakistan Engineering Council</h5> 
                  </div>
                 </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/CPD%20Short%20Course%202019%20Full%20Detail.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>

              <h5 className="backco_green co_white ml_12 peb_head mr_15  mt_10 mb_10" id="federal"> Fedral</h5>
              <div className="row peb_border mb_20">
                <div
                  className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Air University, Islamabad</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2020
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                    Coordinator Name: Engr. Dr. Sarah Saeed
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         sarahsaeed@mail.au.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                        <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                        051-9262557-9
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                         0333-9206575
                     </span>
                      <span className="fz_13 font_sans bold">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                        www.au.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/Air%20Univ.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div
                  className="col-md-12">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Bahria University, Islamabad</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval  December 2018
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Engr. Muhammad Yaseen Elect.Engg. Deptt
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         myaseen_88@yahoo.com
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-9260002 Ext: 659
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0313-5921339
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                       www.bci.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div
                  className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Capital Development Authority (CDA), Islamabad</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval  31-12-2017
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Mehmood Ahmed Qamar Programme Coordinator
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         Makeown5@gmail.com
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-9253021
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0313-4111023
                     </span>
                     
                    </div>
                  </div>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div
                  className="col-md-12">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">COMSATS Institute of Information Technology, Islamabad</h5>
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2016
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name:  Engr. Ahsan Malik
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         ahsan_malik@comsats.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-9247000 Ext:251  
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0313-5878767
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.ciit.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div
                  className="col-md-12">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Centre for Emerging Sciences, Engineering and Technology (CESET) Islamabad</h5> <br/>
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2017
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Prof. Syed Lehazullah Kakahel
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         info@ceset.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                     
                       </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0315-5476094
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.ceset.pk
                      </span>
                    </div>
                  </div>
                </div>
              </div>
               <div className="row peb_border mb_20">
                <div
                  className="col-md-12">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Centre of Advanced Study in Engineering (UET Taxila), Islamabad</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2016
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Mr Zishan Saleem
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         zishan@case.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-8432273 Ext 306
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                      
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.case.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div
                  className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">	National Institute of Vacuum Science and Technology (NINVAST)</h5><br/> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2016
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Engr Abdur Rehman
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         info@ninvast.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-9038226
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.ninvast.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/ninvast.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div
                  className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Directorate of Training (PAEC)</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval  31-12-2017
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Engr. Muhammad Noor
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0333-9360491
                     </span>
                  </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/PAEC%20Isb.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div
                  className="col-md-12">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Federal Urdu University of Arts, Science & Technology, Islamabad</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2017
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Dr Hanif Ullah (Assistant Professor) Dean Faulty of Electrical Engineering
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
              \        <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-9252860
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.fuuastisb.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* <h5 className="backco_green co_white ml_12 peb_head mr_15  mt_10 mb_10"  id="kpk"> KPK</h5> */}
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Hamdard Institute of Engineering & Technology (HIET), Islamabad</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2019
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Engr. Hasan Raza
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         Hasan.raza118@gmail.com
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                        
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0345-5935596
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.hamdard.edu.pk/islamabad
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/Hamdard%20Isb.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div
                  className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Institute of Space Technology,(IST) Islamabad.</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2019
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Prof. Dr. Zafar M. Khan, Director
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         marshad.mit@gmail.com
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-9075594
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0345-0518641
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.ist.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/IST%20Isb%20Revised.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div
                  className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">International Islamic University, Islamabad</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2020
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Engr Dr. Naveed Ishtiaq Chaudhary Assistant Professor DEE/ FET/IUUI
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         naveed.ishtiaq@iiu.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-9019504
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0346-5379751
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.iiu.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/IIUI-CPD%20Calander%20for%202019.xlsx"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              {/* <h5 className="backco_green co_white ml_12 peb_head mr_15  mt_10 mb_10" id="sindh"> Sindh</h5> */}
              <div className="row peb_border mb_20">
                <div
                  className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Capital University of Science & Technology, Islamabad (Old Name MAJU)</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2019
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Dr. Imtiaz Ahmad Taj
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         info@cust.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-4486700
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0321-9561364
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.jinnah.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
               
              </div>
              <div className="row peb_border mb_20">
                <div
                  className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">NUST Institute of Leadership & Education, Islamabad</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2019
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Mr. Waleed Noor Malik
                  PEC Coordinator
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         mgr2pdc@ric.nust.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-9085-6687 (Ext: 6263)
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0347-5052665
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.nust.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/NUST%20Islamabad%20PEB-11.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
            
             {/* <h5 className="backco_green co_white ml_12 peb_head mr_15  mt_10 mb_10" id="balochistan"> Balochistan</h5> */}
             <div className="row peb_border mb_20">
                <div
                  className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">National University of Computer & Emerging Sciences, Islamabad</h5> <br/>
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2019
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Dr. Muhammad Saeed
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         muhammad.saeed@nu.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                      
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0333-7800730
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.nu.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/FAST-NUCES%20Islamabad.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
            
              {/* <h5 className="backco_green co_white ml_12 peb_head mr_15  mt_10 mb_10" id="ajk">AJ&K </h5> */}
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">ISRA University, Islamabad Campus</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval 31 December 2020
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: : Engr. Dr. Sajjad Ahmed Ghauri
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         dr.sajjadghauri@gmail.com
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                       
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0345-5297769
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.Isra.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/ISRA%20ISB_CPD%2019-20.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
            
              <div className="row peb_border mb_20">
                <div className="col-md-12">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Riphah International University, Islamabad</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2019
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Engr. Muhammad Farrukh Qureshi
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         muhammad.farrukh@riphah.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-8446000-8 Ext.343
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0313-5800500
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.riphah.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
              
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Foundation University Institute of Engineering & Management Sciences (Foundation University), Defense Avenue Phase-I, DHA Islamabad</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval 31 December 2017
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Engr. Dr. Wakeel Khan
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         wakeel_10@yahoo.com
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-5788378
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0347-3269230
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.fui.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/FUIEMS.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
           <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">National Institute of Electronics (NIE) Ministry of Science & Technology NIE Plot-17, Sector H-9, Islamabad</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2019
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Mr. Abdul Hadi Senior Research Officer
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         hadi@nie.gov.pk, engr.hadi@gmail.com
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-9265015
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0321-8050123
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.nie.gov.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/CPD%20Workshop%20Calendar%202019.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
            <h5 className="backco_green co_white ml_12 peb_head mr_15  mt_10 mb_10" id="punjab"> Punjab</h5>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Army Public College of Management Sciences, Rawalpindi</h5> <br/>
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval November 2019
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Engr. Zar khitab
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         zarkhitab@yahoo.com
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-8444555
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0300-9353186
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.apcoms.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/CPD%20calender%202019%20Modified.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Bahauddin Zakariya University, Multan</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2018
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Dr Muhammad Imran Malik
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         mranmalik@bzu.com
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         061-9239277
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0300-9630353
                       </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.bzu.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/BZUMLT.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">COMSATS University Islamabad, (Lahore Campus)</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2018
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Mian Ahmed Yaser Asst. Professor
                  Electrical Engg Department
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         yaserahmed@ciitlahore.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0333-4705224
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.ciitlahore.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/COMSATS%20Lahore.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-12">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">COMSATS Institute of Information Technology,Wah</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2018
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Engr Dr M. Naeem Electrical Engg Deptt
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         muhammadnaeem@gmail.com
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         0519272614-5
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        03335151663
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.ciitwah.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
              
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">College of Electrical & Mechanical Engineering (NUST), Rawalpindi</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2018
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Asst. Prof. Dr. Sajid Ullah Butt
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         sajidullahbutt@ceme.nust.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                     
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0321-5113006
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.ceme.nust.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/E&ME.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">	Foundation University Institute of Engineering & Management Sciences (Foundation University), Defense Avenue Phase-I, DHA Islamabad </h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval 31 December 2017
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Engr. Dr. Wakeel Khan
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         wakeel_10@yahoo.com
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-5788378
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0347-3269230
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.fui.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/FUIEMS.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Fatima Jinnah Women University, Rawalpindi</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2018
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Dr. Sumaira Sultan Minhas
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         sumaira.minhas@gmail.com
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-9271167
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.fjwu.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
               
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Government College University Lahore </h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval 2016
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Engr Tasweer Ahmad
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.guc.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
               
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Government College University, Faisalabad </h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval 2015
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Engr. Muhammad Afzal Sipra
                  Associate Professor
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         muradsipra@yahoo.com
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         041-9201565
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0302-4303122
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.gcuf.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/GCU%20Faisalabad.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">	Hydel Training Centre Mangla, Jehlum </h5> 
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                 
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                      
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                       
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                     
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                    
                      </span>
                    </div>
                  </div>
                </div>
               
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-12">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Institute of Chemical Engineering, punjab university, Lahore </h5> <br/>
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2018
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Prof. Dr. Aamir Ijaz (Director)
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         director.icet@pu.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         042-99230462, 99231261, 042-99231159
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                      
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.pu.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
               
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Lahore College for Women University, Lahore </h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval 2016
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Engr Sajjad Rabbani
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         anwar@mailcity.com
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                        
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0321-4497511
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.Icwu.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
               
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Military College of Signals (NUST), Rawalpindi</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2018
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Dr Saeed Murtaza
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         smurtaza-mcs@nust.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                       
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0333-5142654
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.mcs.nust.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/MCS%20RWP.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">National University of Computer & Emerging Sciences, Lahore</h5> <br/>
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2018
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Dr. Saima Zafar Professor
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         saima.zafar@nu.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         042-111-128-128 Ext. 235
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                      
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.nu.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/NUCES%20Lahore.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
               <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">National Textile University, Faisalabad</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval 2018
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Dr. Syed Talha Ali Hamdani
                  Executive CPD
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         hamdani.talha@ntu.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         041-9230081-82 Ext 171
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0333-6650735
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.ntu.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/NTU%20CPD%20Calendar%20for%20Year%202019%20Revised.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">NFC Institute of Engineering & Fertilizer Research, Faisalabad </h5> <br/>
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2019
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Engr. Dr. Rizwan Nasir
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         rizwan.nasir@iefr.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         041-9220355-57
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0321-6659283
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.iefr.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/NFC%20Faisalabad%20updated.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">NFC Institute of Engineering and Technological Training (BZU) , Multan</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2018
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Dr. Muhammad Kamran Liaquat Bhatti
                  (Head, Electrical Engineering Department)
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                        
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         061-9220012-16
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                       
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.nfciet.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="http://pec.org.pk/downloadables/cpd/"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Rachna College of Engineering and Technology (UET Lahore) , Gujranwala </h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2018
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Engr. M. Kashif Jamil
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         sarahsaeed@mail.au.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         055-6770-168-942
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                       
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.uet.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/Rachna%20College.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Swedish College of Engineering and Technology Wah Cantt </h5> <br/>
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2018
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Dr. Liaquat Ali Azhar Najmi (HOD/Assistant Professor)
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         liaquat.najmi@scetwah.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-4926090
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                      
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.sectwah.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/Swedish%20Wah.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">The University of Faisalabad, Faisalabad</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2018
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Mr. Awais Ahmad Cheema
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         awais.cheema@tuf.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         041-8750971-75
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0300-4624631
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.tuf.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/University%20of%20Faisalabad.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">The Institution of Engineers Pakistan, Faisalabad </h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval 2015
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Engr. Shahid Iqbal Gill
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         iepfsd@yahoo.com
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         041-8549444
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.iep.com.pk
                      </span>
                    </div>
                  </div>
                </div>
              
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">The University of Lahore, Lahore</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2018
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Prof. Dr Muhammad Zulfiqar Ali Khan
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         drzulfiqar@uol.edu.pk & rehan.masood@ce.uol.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         042-35963421
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        03238814368 & 0346-5756640
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.uol.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/UOL%20Lhr.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">The University of Central Punjab, Lahore </h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval 2016
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Prof. Fesal Tossy
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         humbulsuleman@yahoo.com
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                       
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0345-7866846
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.iefr.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
               
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">The Islamia University of Bahawalpur</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2018
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Dr. Shahab Ahmad Niazi
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         shahabniazi@iub.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                       
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0333-5338220
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.iub.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/UCET%20Bahawalpur.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">The Urban Sector Planning & Management Services Pvt Ltd. Lahore</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2018
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Dr. Kiran Farhan
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         sarahsaeed@mail.au.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                        
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        03468281313
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                
                      </span>
                    </div>
                  </div>
                </div>
               
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">University of Agriculture, Faisalabad </h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval November 2019
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Dr. Anjum Munir (Chairman / Associate Professor)
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         drguaf@gmail.com
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         041-9201743
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.uaf.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/UAF%20Revised%20CPD%20Calendar.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">University of Engineering and Technology,Taxila</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2019
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Dr. Naveed Ahmed
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         n.ahmad@uettaxila.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-9047644
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      Web.uettaxila.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/UET%20Taxila.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
               <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">University of Engineering and Technology ,Lahore (Faisalabad Campus)</h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval 2019
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Dr Nasir Ahmad
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         nasirahmed@uet.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0300-7969942
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.uet.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="https://www.pec.org.pk/Downloadables/cpd/cpd%20PEB%20calenders%202019/UET%20Lhr.%20Fsd.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
               <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">University of Management & Technology, Lahore
                  </h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2018
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                  Coordinator Name: Prof. Dr. Muhammad Usman Rashid
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                       
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                        
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.umt.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="http://pec.org.pk/downloadables/cpd/cpd%20activities%20calendar%202019/UMT%20Lahore.pdf"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              {/* <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Air University, </h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2019
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                   Coordinator Name: Engr. Dr. Sarah Saeed
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         sarahsaeed@mail.au.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0313
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.riphah.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="#"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Air University, </h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2019
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                   Coordinator Name: Engr. Dr. Sarah Saeed
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         sarahsaeed@mail.au.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0313
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.riphah.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="#"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Air University, </h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2019
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                   Coordinator Name: Engr. Dr. Sarah Saeed
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         sarahsaeed@mail.au.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0313
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.riphah.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="#"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Air University, </h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2019
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                   Coordinator Name: Engr. Dr. Sarah Saeed
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         sarahsaeed@mail.au.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0313
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.riphah.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="#"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Air University, </h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2019
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                   Coordinator Name: Engr. Dr. Sarah Saeed
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         sarahsaeed@mail.au.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0313
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.riphah.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="#"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Air University, </h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2019
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                   Coordinator Name: Engr. Dr. Sarah Saeed
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         sarahsaeed@mail.au.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0313
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.riphah.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="#"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Air University, </h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2019
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                   Coordinator Name: Engr. Dr. Sarah Saeed
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         sarahsaeed@mail.au.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0313
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.riphah.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="#"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Air University, </h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2019
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                   Coordinator Name: Engr. Dr. Sarah Saeed
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         sarahsaeed@mail.au.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0313
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.riphah.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="#"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Air University, </h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2019
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                   Coordinator Name: Engr. Dr. Sarah Saeed
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         sarahsaeed@mail.au.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0313
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.riphah.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="#"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Air University, </h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2019
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                   Coordinator Name: Engr. Dr. Sarah Saeed
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         sarahsaeed@mail.au.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0313
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.riphah.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="#"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Air University, </h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2019
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                   Coordinator Name: Engr. Dr. Sarah Saeed
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         sarahsaeed@mail.au.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0313
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.riphah.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="#"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Air University, </h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2019
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                   Coordinator Name: Engr. Dr. Sarah Saeed
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         sarahsaeed@mail.au.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0313
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.riphah.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="#"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Air University, </h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2019
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                   Coordinator Name: Engr. Dr. Sarah Saeed
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         sarahsaeed@mail.au.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0313
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.riphah.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="#"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
              <div className="row peb_border mb_20">
                <div className="col-md-10">
                  <div>
                  <h5 className="bold inline_flex peb_pb_10">Air University, </h5> 
                  <span className="fz_12 peb_btn_box ml_10px">
                    Reneval December 2019
                  </span>
                  </div>
                  <div className="pb_5px">
                  <span className="fz_13">
                   Coordinator Name: Engr. Dr. Sarah Saeed
                  </span>
                  </div>
                  <div className="">
                    <div className="flex_peb">
                    <span className="fz_13 font_sans bold">
                        <i className="fas fa-envelope co_green fz_13"></i>
                         &nbsp;
                         sarahsaeed@mail.au.edu.pk
                        </span>  
                      <span className="fz_13 font_sans bold ">
                            <i className="fa fa-phone  co_green fz_13 fa-rotate-90" aria-hidden="true"></i>
                         &nbsp;
                         051-
                      </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fas fa-mobile co_green fz_13"></i>
                        &nbsp;
                        0313
                     </span>
                      <span className="fz_13 font_sans bold ">
                        <i className="fab fa-chrome co_green fz_13"></i>
                      &nbsp;
                      www.riphah.edu.pk
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-2 text_center_peb col_padding peb_pt_10">
                    <img  src={require("../assets/image/download-file.png")} style={{width:"45px"}} alt="Image-downlaod"/>
                  <br />
                  <a
                    href="#"
                    className="btn btn_DAFDBD bold font_sans fz_13 mt_10"
                    target="_blank"
                    download
                   >
                    Download
                  </a>
                </div>
              </div>
             */}
            
            
            
            </div>
          </div>
          <br />
          <br />
          <Footer />
        </section>
      </React.Fragment>
    );
  }
}
export default PEB;
