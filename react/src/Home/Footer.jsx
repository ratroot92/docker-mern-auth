import React from 'react';
// import "../assets/css/bootstrap.css";
// import "../assets/css/main.css";
import { Link } from 'react-router-dom';
function Header() {
  return (
    <React.Fragment>
      <footer className="footer">
        <div className="container bottom_border none_other">
          <div className="row">
            <div className=" col-md-3 col-sm-12 col-xs-12">
              <div className="row">
                <div className="col-2" style={{ marginTop: '85px' }}>
                  <img src={require("../assets/image/white.png")} alt="" className style={{ width: '40px', height: '70px' }} />
                </div>
                <div className="col-10" style={{ marginTop: '10px' }}>
                  <h1 className="headin5_amrc col_white_amrc pt2" style={{ marginBottom: '0px' }}>CPD</h1>
                  <p className="co_white">
                  Pakistan Engineering Council (PEC) under PEC Act and CPD Byelaws-2008, is earnestly working for the professional growth and skill enhancement of ever growing engineering community.     
                 </p>
                </div>
              </div>
            </div>
            <div className=" col-md-3 col-sm-12 col-xs-12">
              <h1 className="headin5_amrc col_white_amrc pt2">Navigation</h1>
              <hr className="hr_row" />
              <ul className="footer_ul_amrc">
                <li><Link to="/ContactUS">Contact Us</Link></li>
                <li><a href="/#upcomingCourses">Upcomming Courses</a></li>
                <li><Link to="/LiveWebinar">Live Webinars</Link></li>
                {/* <li><a href="#">News and Updates</a></li> */}
                <li><Link to="/gallery">Gallery</Link></li>
                <li><Link to="/CpdProfile">CPD Profile</Link></li>
              </ul>
            </div>
            <div className=" col-md-3 col-sm-12 col-xs-12">
              <h1 className="headin5_amrc col_white_amrc pt2">Contact</h1>
              <hr className="hr_row" />
              <div className="row Pt_10">
                  <div className="col-1">
                    <i className="fas fa-map-marker-alt co_white mt_10" ></i>
                  </div>
                  <div className="col-10 pt_3">
                    <a target="_blank" href="https://www.google.com/maps/place/Pakistan+Engineering+Council/@33.7239847,73.0909047,17z/data=!3m1!4b1!4m5!3m4!1s0x38dfc07e98fce659:0xbf9fcfb8daab700b!8m2!3d33.7239803!4d73.0930934" 
                    className="fz_12 co_white a_footer">
                    Pakistan Engineering Council
                    Ataturk Avenue (East), G-5/2 Islamabad
                    </a>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-1">
                    <i className="fa fa-phone  co_white fz_13 fa-rotate-90 mt-2" aria-hidden="true"></i>
                   </div>
                  <div className="col-10 pt_3 ">
                    <a target="_blank" href="tel:(+92-51) 111-111-732" className="fz_12 co_white a_footer">(+92-51) 111-111-732</a>
                 </div>
                </div>
                <div className="row ">
                  <div className="col-1">
                    <i className="fas fa-envelope co_white mt-0_5"></i>
                  </div>
                  <div className="col-10 pt_3">
                    <a target="_blank" href="mailto:cpd@pec.org.pk" className="fz_12 co_white a_footer">cpd@pec.org.pk</a>
                  </div>
                </div>
              </div>
            <div className=" col-md-3 col-sm-12 col-xs-12">
              <h1 className="headin5_amrc col_white_amrc pt2">Subscribe</h1>
              <hr className="hr_row" />
              <div className="form-group">
                <div className="">
                  <div className="form-group">
                    <input type="email" className="form-control place_white" style={{ backgroundColor: 'transparent', width: '90%', height: "45px", color: "white",border:"1px solid" }} placeholder="Your Email *" />
                  </div>
                </div>
                <div className="">
                  <div className="form-group">
                    <button type="button" className="btn btn-success bold font_sans fz_14" style={{ width: '90%', height: "45px",border:"1px solid #06580E" }}>SUBSCRIBE</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="container bottom_border display_ipad">
          <div className="row">
            <div className=" col-md-6 col-sm-12 col-xs-12">
              <div className="row">
                <div className="col-2" style={{ marginTop: '85px' }}>
                  <img src={require("../assets/image/white.png")} alt="" className style={{ width: '40px', height: '70px' }} />
                </div>
                <div className="col-10" style={{ marginTop: '10px' }}>
                  <h1 className="headin5_amrc col_white_amrc pt2" style={{ marginBottom: '0px' }}>CPD</h1>
                  <p className="co_white">
                  Pakistan Engineering Council (PEC) under PEC Act and CPD Byelaws-2008, is earnestly working for the professional growth and skill enhancement of ever growing engineering community.     
                 </p>
                </div>
              </div>

            </div>
            <div className=" col-md-7 col-sm-12 col-xs-12">
              <h1 className="headin5_amrc col_white_amrc pt2">Navigation</h1>
              <hr className="hr_row" />
              <ul className="footer_ul_amrc">
              <li><Link to="/ContactUS">Contact Us</Link></li>
                <li><a href="/#upcomingCourses">Upcomming Courses</a></li>
                <li><Link to="/LiveWebinar">Live Webinars</Link></li>
                {/* <li><a href="#">News and Updates</a></li> */}
                <li><Link to="/gallery">Gallery</Link></li>
                <li><Link to="/CpdProfile">CPD Profile</Link></li>
              </ul>
            </div>
            <div className=" col-md-7 col-sm-12 col-xs-12">
              <h1 className="headin5_amrc col_white_amrc pt2">Contact</h1>
              <hr className="hr_row" />
              <div className="row Pt_10">
                  <div className="col-1">
                    <i className="fas fa-map-marker-alt co_white mt_10" ></i>
                  </div>
                  <div className="col-10 pt_3">
                  <a target="_blank" href="https://www.google.com/maps/place/Pakistan+Engineering+Council/@33.7239847,73.0909047,17z/data=!3m1!4b1!4m5!3m4!1s0x38dfc07e98fce659:0xbf9fcfb8daab700b!8m2!3d33.7239803!4d73.0930934" 
                    className="fz_12 co_white a_footer">
                    Pakistan Engineering Council
                    Ataturk Avenue (East), G-5/2 Islamabad
                    </a>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-1">
                    <i className="fa fa-phone  co_white fz_13 fa-rotate-90 mt-2" aria-hidden="true"></i>
                   </div>
                  <div className="col-10 pt_3">
                  <a target="_blank" href="tel:(+92-51) 111-111-732" className="fz_12 co_white a_footer">(+92-51) 111-111-732</a>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-1">
                    <i className="fas fa-envelope co_white mt-0_5"></i>
                  </div>
                  <div className="col-10 pt_3">
                  <a target="_blank" href="mailto:cpd@pec.org.pk" className="fz_12 co_white a_footer">cpd@pec.org.pk</a>
                  </div>
                </div>
              </div>
            <div className=" col-md-6 col-sm-12 col-xs-12">
              <h1 className="col_white_amrc pt2">Subscribe</h1>
              <hr className="hr_row" />
              <div className="form-group">
                <div className="">
                  <div className="form-group">
                    <input type="email" className="form-control place_white" style={{ backgroundColor: 'transparent', width: '90%', height: "45px", color: "white",border:"1px solid" }} placeholder="Your Email *" />
                  </div>
                </div>
                <div className="">
                  <div className="form-group">
                    <button type="button" className="btn btn-success bold font_sans fz_14" style={{ width: '90%', height: "45px",border:"1px solid #06580E" }}>SUBSCRIBE</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </React.Fragment>
  );
}
export default Header;