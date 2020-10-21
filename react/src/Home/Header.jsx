import React from 'react';
import { Link } from 'react-router-dom';
// import "../assets/css/main.css";
import $ from 'jquery';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display:"none"

    }
  }
  componentDidMount(){
    // $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
    //   if (!$(this).next().hasClass('show')) {
    //     $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
    //   }
    //   var $subMenu = $(this).next(".dropdown-menu");
    //   $subMenu.toggleClass('show');
    //   $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
    //     $('.dropdown-submenu .show').removeClass("show");
    //   });
    //   return false;
    // });
    // $('.dropdown-submenu a.dropdown-toggle').on('click', function(e) {
    //   if (!$(this).next().hasClass('show')) {
    //     $(this).parents('.dropdown-submenu').first().find('.show').removeClass("show");
    //   }
    //   var $subMenu = $(this).next(".dropdown-submenu");
    //   $subMenu.toggleClass('show');
    //   $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
    //     $('.dropdown-submenu .show').removeClass("show");
    //   });
    //   return false;
    // });

    // var selector = '.navbar-nav a';
    // $(selector).on('click', function(){
    //     $(selector).removeClass('active');
    //     //  $(this).addClass('active');
    // });
  
  
  
  }

block=()=>{
  this.setState({display:"block"})
}
none=()=>{
  this.setState({display:"none"})
}
render() {
  return (
    <React.Fragment>
      <div className="backco_white">
        <div className="row col_margin backco_white">
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 flex_center">
            <img src={require('../assets/image/pec_logo.jpg')} alt="LOGO" className="img_head" />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 flex_center">
            <h5 className="Conti_Prof pt_2v mb_uns ">Continuing Professional Development</h5>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 flex_center pt_2v pt_4_5v">
            <img src={require('../assets/image/PEC.png')} alt="LOGO" className="" style={{ width: "30%", height: "auto" }} />
          </div>
        </div>

        <div className="container containe_unset">
          <nav className="navbar navbar-expand-lg navbar-dark co_green col_padding"
            style={{
              height: '100px', fontSize: '25px',
              backgroundColor: 'white !important'
            }}>
            <Link className="navbar-brand Log_none" to="/" style={{ fontWeight: "bold", color: "green", fontSize: "3rem" }}>             </Link>
            <button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03"
              aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" style={{ height: "50px", width: "60px" }} />
            </button>
            <div className="collapse navbar-collapse nav_zind backco_white" id="navbarsExample03">
              <ul className="navbar-nav mr-auto backco_white">
                  <li className="nav-item active   padding_un mlr_10 font_sans fw_sans8">
                  <li className="nav-item dropdown headerline active">
                    <Link className="nav-link dropdown-toggle mb_uns  padding_un mlr_10 co_greeen_imp fz_16 pt_10I"
                     to="#" id="navbarDropdown">
                        ABOUT CPD
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link className="dropdown-item  co_green font_sans fw_sans8 fz_12" to="/">Home</Link>
                      <Link className="dropdown-item  co_green font_sans fw_sans8 fz_12" to="/Introduction">Introduction to CPD</Link>
                      {/* <Link className="dropdown-item  co_green font_sans fw_sans8 fz_12" to="/CPDrecognition">CPD Recognition of Foregin Institutions</Link> */}
                      <Link className="dropdown-item  co_green font_sans fw_sans8 fz_12" to="/byelaws">CPD Byelaws</Link>
                      {/* <Link className="dropdown-item  co_green font_sans fw_sans8 fz_12" to="GuideLineMauals">CPD GuideLine Manual</Link> */}
                     <li className="dropdown-submenu">
                     {/* onMouseEnter={this.block}  style={{display:this.state.display}}*/}
                        <Link className="dropdown-item co_green font_sans fw_sans8 fz_12 dropdown-toggle" to="#" id="navbarDropdown111" >
                       Engineering Professional Development Committee     (EPDC)
                        </Link>
                          <ul className="dropdown-menu custom-drop-sub" aria-labelledby="navbarDropdown111">
                            <li>
                              <Link className="dropdown-item co_green font_sans fw_sans8 fz_12" to="/epdc/intro">Introduction</Link>
                              <Link className="dropdown-item co_green font_sans fw_sans8 fz_12" to="/Organogram">Organogram</Link>
                              <Link className="dropdown-item co_green font_sans fw_sans8 fz_12" to="/EPDCCompostion">EPDC Composition for Term 2018-21</Link>
                              </li>
                            </ul>
                          </li>
                          <Link className="dropdown-item  co_green font_sans fw_sans8 fz_12" to="/GuideLineMauals">CPD Guideline Manual </Link>
                          <li className="dropdown-submenu">
                        <Link className="dropdown-item co_green font_sans fw_sans8 fz_12 dropdown-toggle" to="#">
                        PEC Approved Resource Person
                        </Link>
                          <ul className="  custom-drop-sub dropdown-menu">
                            <li>
                              <Link className="dropdown-item co_green font_sans fw_sans8 fz_12" to="#">List of Resourse Person</Link>
                              <Link className="dropdown-item co_green font_sans fw_sans8 fz_12" to="#">Criteria for Resourse Person </Link>
                              <Link className="dropdown-item co_green font_sans fw_sans8 fz_12" to="#">Application Form</Link>
                              </li>
                            </ul>
                          </li>
             
                     </div>
                  </li>
                </li>

                <li className="nav-item active   padding_un mlr_10 font_sans fw_sans8">
                  <li className="nav-item dropdown headerline active">
                    <Link className="nav-link dropdown-toggle mb_uns  padding_un mlr_10 co_greeen_imp fz_16 pt_10I"
                      to="#" id="navbarDropdown">
                      CPD BY PEC 
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      {/* <Link className="dropdown-item  co_green font_sans fw_sans8 fz_12" to="/ScheduleCPDActivities">CPD Activities</Link> */}
       
                      {/* <Link className="dropdown-item  co_green font_sans fw_sans8 fz_12" to="/WebinarSearch">Webinars</Link> */}
                      {/* <Link className="dropdown-item  co_green font_sans fw_sans8 fz_12" to="/userview">User View</Link> */}
                      
                      <Link className="dropdown-item  co_green font_sans fw_sans8 fz_12" to="/CpdShortCourse">Short Courses and Training</Link>
                      <Link className="dropdown-item  co_green font_sans fw_sans8 fz_12" to="/LiveWebinar">Live Webinar</Link>
                      <Link className="dropdown-item  co_green font_sans fw_sans8 fz_12" to="/onlineCourse">Online Courses</Link>
                      {/* <Link className="dropdown-item  co_green font_sans fw_sans8 fz_12" to="/CpdProfile">Engineer's CPD Profile</Link> */}
                      <li className="dropdown-submenu">
                        <Link className="dropdown-item co_green font_sans fw_sans8 fz_12 dropdown-toggle" to="#">
                        Engineer's CPD Profile
                        </Link>
                          <ul className="dropdown-menu custom-drop-sub">
                            <li>
                              <Link className="dropdown-item co_green font_sans fw_sans8 fz_12" to="/CpdProfile">
                              CPD Profile
                           </Link>
                              </li>
                             <li>
                              <Link className="dropdown-item co_green font_sans fw_sans8 fz_12" to="/CalculatorofCPD">
                                Calculator of CPD points</Link>
                              </li>
                            </ul>
                          </li>
                    </div>
                  </li>
                </li>
           
                 <li className="nav-item active   padding_un mlr_10 font_sans fw_sans8">
                  <li className="nav-item dropdown headerline active">
                    <Link className="nav-link dropdown-toggle mb_uns  padding_un mlr_10 co_greeen_imp fz_16 pt_10I"
                      to="#" id="navbarDropdown">
                      EPE
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link className="dropdown-item  co_green font_sans fw_sans8 fz_12" to="/EPECustom">Introduction to EPE</Link>
                      <a className="dropdown-item  co_green font_sans fw_sans8 fz_12" href="/EPECustom#EPEMechanism">EPE Mechanism</a>
                      <a className="dropdown-item  co_green font_sans fw_sans8 fz_12" href="/EPECustom#EligibilityCrieteriaforEngineeringPracticeExamination">Eligibility Criteria</a>
                      <a className="dropdown-item  co_green font_sans fw_sans8 fz_12" href="/EPECustom#GuidelinesforCandidatesAppearinginEPE">Guideline for Candidate Appearing in EPE</a>
                      <a className="dropdown-item  co_green font_sans fw_sans8 fz_12" href="/EPECustom#EPECurriculaandStudyMaterial">Curriculum of EPE</a>
                      <a className="dropdown-item  co_green font_sans fw_sans8 fz_12" href="/EPECustom#ApplicationFormsforEngineeringPracticeExamination">Application Form</a>
                      <a className="dropdown-item  co_green font_sans fw_sans8 fz_12" href="/EPECustom#PolicyGuidelinesforRedresselofEPECandidatesApealsComplaintsandGrievances">Policy Guideline for Redressel of EPE</a>
                    </div>
                  </li>
                </li>
                <li className="nav-item active   padding_un mlr_10 font_sans fw_sans8">
                  <li className="nav-item dropdown headerline active">
                    <Link className="nav-link dropdown-toggle mb_uns  padding_un mlr_10 co_greeen_imp fz_16 pt_10I"
                      to="#" id="navbarDropdown">
                      PEB
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      {/* <Link className="dropdown-item  co_green font_sans fw_sans8 fz_12" to="/PEB">CPD Activity of Calendar for PEB</Link>
                      <Link className="dropdown-item  co_green font_sans fw_sans8 fz_12" to="/ProfessionalEngnrBodies">Registration of Professional Engineering Bodies</Link>
                      <Link className="dropdown-item  co_green font_sans fw_sans8 fz_12" to="/Principle">Principles</Link>
                      <Link className="dropdown-item  co_green font_sans fw_sans8 fz_12" to="/Crieteria">Crieteria</Link>
                      <Link className="dropdown-item  co_green font_sans fw_sans8 fz_12" to="/GuidelinesCPDBodieswithPEC">Guidelines for Registration of CPD Bodies with PEC</Link>
                      <Link className="dropdown-item  co_green font_sans fw_sans8 fz_12" to="/FeeStructureforRegistration">Fee Structure for Registration</Link>
                   */}
                     {/* <Link className="dropdown-item  co_green font_sans fw_sans8 fz_12" to="/PEB">CPD Activity of Calendar for PEB</Link> */}
                     <Link className="dropdown-item  co_green font_sans fw_sans8 fz_12" to="/ProfessionalEngnrBodies">Introduction</Link>
                      <a className="dropdown-item  co_green font_sans fw_sans8 fz_12" href="/ProfessionalEngnrBodies#crieteria">Crieteria for Registration</a>
                      <a className="dropdown-item  co_green font_sans fw_sans8 fz_12" href="/ProfessionalEngnrBodies#procedure">Procedure for Registration</a>
                      <Link className="dropdown-item  co_green font_sans fw_sans8 fz_12" to="/PEB">List of PEBs</Link>
                      <li className="dropdown-submenu">
                        <Link className="dropdown-item co_green font_sans fw_sans8 fz_12 dropdown-toggle" to="#">
                         PEB's Dashboard
                        </Link>
                          <ul className="custom-drop-sub dropdown-menu">
                            <li>
                              <Link className="dropdown-item co_green font_sans fw_sans8 fz_12" to="#">Apply for Renewal</Link>
                              <Link className="dropdown-item co_green font_sans fw_sans8 fz_12" to="/PEBs_calendar_2020">CPD Calendar </Link>
                              <Link className="dropdown-item co_green font_sans fw_sans8 fz_12" to="#">CPD Returns</Link>
                              <Link className="dropdown-item co_green font_sans fw_sans8 fz_12" to="#">Contact Us</Link>
                              </li>
                            </ul>
                          </li>
                    </div>
                  </li>
                </li>
                <li className="nav-item active   padding_un mlr_10 font_sans fw_sans8">
                  <li className="nav-item dropdown headerline active">
                    <Link className="nav-link dropdown-toggle mb_uns  padding_un mlr_10 co_greeen_imp fz_16 pt_10I"
                      to="#" id="navbarDropdown">
                      DOWNLOADS
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link className="dropdown-item  co_green font_sans fw_sans8 fz_12" to="/ShortCoursesPPT">Short Courses Presentation by PEC</Link>
                      <li className="dropdown-submenu">
                        <Link className="dropdown-item co_green font_sans fw_sans8 fz_12 dropdown-toggle" to="/Forms">
                        Forms
                        </Link>
                          <ul className="custom-drop-sub dropdown-menu">
                            <li>
                              <Link className="dropdown-item co_green font_sans fw_sans8 fz_12" to="/CPD_Resource_person">CPD Resourse Person</Link>
                              <Link className="dropdown-item co_green font_sans fw_sans8 fz_12" to="/EPEForms">EPE Forms </Link>
                              <Link className="dropdown-item co_green font_sans fw_sans8 fz_12" to="/CPDForms">CPD Forms</Link>
                              </li>
                            </ul>
                          </li>
                      <Link className="dropdown-item  co_green font_sans fw_sans8 fz_12" to="/Documents">Documents</Link>
                    </div>
                  </li>
                </li>
                <li className="nav-item active   headerline padding_un mlr_10" style={{display:"none"}}>
                  <Link to="#" className="nav-link mb_uns padding_un mlr_10 co_greeen_imp fz_16 pt_10I font_sans fw_sans8">
                    NEWS
                  </Link>
                </li>
                <li className="nav-item active   headerline padding_un mlr_10">
                  <Link to="/ContactUS" className="nav-link mb_uns padding_un mlr_10 co_greeen_imp fz_16 pt_10I font_sans fw_sans8">
                    CONTACT
                  </Link>
                </li>
                <li className="nav-item active   headerline padding_un mlr_10">
                  <Link to="/Login" className="nav-link mb_uns padding_un mlr_10 co_greeen_imp fz_16 pt_10I font_sans fw_sans8">
                    LOGIN/REGISTER
                  </Link>
                </li>
                <li className="nav-item active   headerline padding_un mlr_10">
                  <Link to="/gallery" className="nav-link mb_uns padding_un mlr_10 co_greeen_imp fz_16 pt_10I font_sans fw_sans8">
                    GALLERY
                  </Link>
                </li>
                <li className="nav-item active  headerline padding_un mlr_10" style={{border:"0px"}}>
                  <a href="https://www.pec.org.pk/" className="nav-link mb_uns padding_un mlr_10 co_greeen_imp fz_16 font_sans pt_10I fw_sans8" target="_blank">
                    PEC HOME    <i className="fas fa-external-link-alt co_green"></i>
                  </a>
                </li>
                {/* <li className="nav-item active   Log_none  padding_un mlr_10">
                  <Link to="/Login" className="nav-link">
                    <p className="nav-link mb_uns padding_un mlr_10 co_greeen_imp fz_16 pt_10I font_sans fw_sans8">Login</p>
                  </Link>
                </li>
                <li className="nav-item active   Log_none  padding_un mlr_10">
                  <Link to="/Register" className="nav-link">
                    <p className="nav-link mb_uns padding_un mlr_10 co_greeen_imp fz_16 pt_10I font_sans fw_sans8">Register</p>
                  </Link>
                </li> */}





              </ul>
            </div>
          </nav>
        </div>
      </div>



    </React.Fragment>
    );
  }
}
export default Header;