import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import CpdActivitiesSIDEbar from "./CpdActivitiesSIDEbar";

class Peb_calender20 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: "Introduction",
          url: "/ProfessionalEngnrBodies#introduction"
        },
        {
          name: "Crieteria for Registration",
          url: "/ProfessionalEngnrBodies#crieteria",
          type: "a"
        },
        {
          name: "Procedure for Registration",
          url: "/ProfessionalEngnrBodies#procedure",
          type: "a"
        },
        {
          name: "List of PEBs",
          url: "/PEB"
        },
        {
          name: "PEB Dashboard",
          url: "PEBDashboard",
          type: "button",
          child: [
            {
              name: "Apply for Renewal",
              url: "#"
            },
            {
              name: "CPD Calendar",
              url: "/PEBs_calendar_2020"
            },
            {
              name: "CPD Returns",
              url: "#"
            },
            {
              name: "Contact Us",
              url: "#"
            }
          ]
        }
      ]
    };
  }
  render() {
    return (
      <React.Fragment>
        <section className="backco_white" style={{ fontFamily: "Arial" }}>
          <Header />
          <div className="row col_margin">
            <div className="col-md-3 col_padding" style={{ padding: "2%" }}>
              <CpdActivitiesSIDEbar data={this.state.data} />
            </div>
            <div
              className="col-md-7 col_padding intr_mr"
              id="introduction"
            >
             <h2 className="text-center" style={{ margin: '28px 0px 0px 1px' }}>PEBs calendar 2020</h2>
             <br/>  <br/> 
             <div className="row">
                 <div className="col-md-6">
                 <i className="far fa-file-pdf fa-1x co_black bold mr-2"></i>
                <b className="pdf_text">BZU Multan</b>
                <Link to="/document/BZU_Multan.pdf" className="btn btn-success bold font_sans float-right fz_14"
                 target="_blank" download>Download</Link>
                 <br/><br/>
                <i className="far fa-file-pdf fa-1x co_black bold mr-2"></i>
                <b className="pdf_text">CAE Risalpur</b>
                <Link to="/document/CAE Risalpur.pdf" className="btn btn-success bold font_sans float-right fz_14"
                 target="_blank" download>Download</Link>
                 <br/><br/>
                <i className="far fa-file-pdf fa-1x co_black bold mr-2"></i>
                <b className="pdf_text">Dawood Univ Khi</b>
                <Link to="/document/Dawood Univ Khi.pdf" className="btn btn-success bold font_sans float-right fz_14"
                 target="_blank" download>Download</Link>
                 <br/><br/>
                <i className="far fa-file-pdf fa-1x co_black bold mr-2"></i>
                <b className="pdf_text">IBA Sukkur</b>
                <Link to="/document/IBA Sukkur.pdf" className="btn btn-success bold font_sans float-right fz_14"
                 target="_blank" download>Download</Link>
                 <br/><br/>
                <i className="far fa-file-pdf fa-1x co_black bold mr-2"></i>
                <b className="pdf_text">Leads Lahore</b>
                <Link to="/document/Leads Lahore.pdf" className="btn btn-success bold font_sans float-right fz_14"
                 target="_blank" download>Download</Link>
                 <br/><br/>
                <i className="far fa-file-pdf fa-1x co_black bold mr-2"></i>
                <b className="pdf_text">LUMHS Jamshoro</b>
                <Link to="/document/LUMHS Jamshoro.pdf" className="btn btn-success bold font_sans float-right fz_14"
                 target="_blank" download>Download</Link>
                 <br/><br/>
                <i className="far fa-file-pdf fa-1x co_black bold mr-2"></i>
                <b className="pdf_text">MUET Khairpur</b>
                <Link to="/document/MUET Khairpur.pdf" className="btn btn-success bold font_sans float-right fz_14"
                 target="_blank" download>Download</Link>
                 <br/><br/>
                 </div>
                 <div className="col-md-6">
                 <i className="far fa-file-pdf fa-1x co_black bold mr-2"></i>
                <b className="pdf_text">NIE Islamabad</b>
                <Link to="/document/NIE Islamabad.pdf" className="btn btn-success bold font_sans float-right fz_14"
                 target="_blank" download>Download</Link>
                 <br/><br/>
                <i className="far fa-file-pdf fa-1x co_black bold mr-2"></i>
                <b className="pdf_text">PAEC Islamabad</b>
                <Link to="/document/PAEC Islamabad.PDF" className="btn btn-success bold font_sans float-right fz_14"
                 target="_blank" download>Download</Link>
                 <br/><br/>
                <i className="far fa-file-pdf fa-1x co_black bold mr-2"></i>
                <b className="pdf_text">QUEST Nawabshah</b>
                <Link to="/document/QUEST Nawabshah.pdf" className="btn btn-success bold font_sans float-right fz_14"
                 target="_blank" download>Download</Link>
                 <br/><br/>
                <i className="far fa-file-pdf fa-1x co_black bold mr-2"></i>
                <b className="pdf_text">Swedish Wah</b>
                <Link to="/document/Swedish Wah.pdf" className="btn btn-success bold font_sans float-right fz_14"
                 target="_blank" download>Download</Link>
                 <br/><br/>
                <i className="far fa-file-pdf fa-1x co_black bold mr-2"></i>
                <b className="pdf_text">UCET Sargodha</b>
                <Link to="/document/UCET Sargodha.pdf" className="btn btn-success bold font_sans float-right fz_14"
                 target="_blank" download>Download</Link>
                 <br/><br/>
                <i className="far fa-file-pdf fa-1x co_black bold mr-2"></i>
                <b className="pdf_text">UET Taxila</b>
                <Link to="/document/UET Taxila.pdf" className="btn btn-success bold font_sans float-right fz_14"
                 target="_blank" download>Download</Link>
                 <br/><br/>
                <i className="far fa-file-pdf fa-1x co_black bold mr-2"></i>
                <b className="pdf_text">UoL Lahore</b>
                <Link to="/document/UoL Lahore.pdf" className="btn btn-success bold font_sans float-right fz_14"
                 target="_blank" download>Download</Link>
                 <br/><br/>

                 </div>

             </div>
    
                
              
            </div>
            <div className="col-md-1"></div>
          </div>

          <Footer />
        </section>
      </React.Fragment>
    );
  }
}

export default Peb_calender20;
