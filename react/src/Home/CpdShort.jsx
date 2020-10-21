import React from 'react';
// import "../assets/css/main.css";
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import CpdActivitiesSIDEbar from './CpdActivitiesSIDEbar'

class CpdShoruCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       data: [{
      
        name: "CPD Short Courses and Training",
        url: "/CpdShortCourse"
      },
      {
        name: "Live Webinar",
        url: "/LiveWebinar"
      },
      {
        name: "Online Courses",
        url: "/onlineCourse"
      },
      {
        name: "Engineer's CPD Profile",
        url: "CpdProfile",
        type:"button",
        "child":[
          {
                name: " CPD Profile",
                url: "/CpdProfile",
              },
              {
                name: "Calculator of CPD Points",
                url: "/CalculatorofCPD",
              }
            ]
      },
     
      ]
    
    }
  }
  componentDidMount() {
    document.title ="CPD Short Courses and Training";
 }
  render() {
    return (
      <React.Fragment>
        <section  className="backco_white" style={{ fontFamily: 'Arial' }}>
          <Header />
          <div className="row col_margin">
            <div className="col-md-3 col_padding" style={{ padding: '2%' }}>
            <CpdActivitiesSIDEbar data={this.state.data}/>
            </div>
            <div className="col-md-7 col_padding intr_mr">
              <h2 className="text-center" style={{ margin: '28px 0px 0px 1px' }}>CPD Short Courses and Training</h2>
              <div className="row">
                <div className="col-md-12" col_padding style={{ padding: '2%' }}>
                <div className="into-p">
                    <p>
                    In order to provide quality training and skills to the engineers (both RE & PE), PEC regularly organizes short courses and trainings on emerging topics as well as technical and management aspects. PEC holds such activities throughout the year at its Headquarters, Regional/ Branch Offices and other cities to maximize outreach and facilitation for the engineers. These courses are conducted by PEC recognized and learned Resource Persons mainly from Industry and practitioners. The yearly calendar of PEC CPD activities may be viewed for further details and participation. 
                   </p>
                </div>
                <div className="into-p">
                <i className="far fa-file-pdf fa-1x co_black bold"></i>&nbsp;
                <b className="pdf_text">CPD Calendar January to June 2020</b>&nbsp;&nbsp;
                <a href="/document/pdf/CPDCalendarJanuarytoJune2020.pdf" className="btn btn-success bold font_sans fz_14" 
                  target="_blank" download>Download</a>
                  </div>
              </div>
              </div>
            </div>
            <div className="col-md-1">
            </div>
          </div>
          <Footer />
        </section>
      </React.Fragment>
    )
  }
}
export default CpdShoruCourse;