import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import CpdActivitiesSIDEbar from './CpdActivitiesSIDEbar'

class Calculator_cpd extends React.Component {
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
        url: "Ecp",
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
  componentDidMount(){
    document.title = "Calculator of CPD points";
}
  render() {
    return (
      <React.Fragment>
        <section  className="backco_white" style={{ fontFamily: 'Arial' }}>
          <Header />
          <div className="row col_margin">
            <div className="col-md-3 col_padding" style={{ padding: '2%' }}>
              <CpdActivitiesSIDEbar data={this.state.data} />
            </div>
            <div className="col-md-7 col_padding intr_mr">
              <h2 className="text-center" style={{ margin: '28px 0px 0px 1px' }}>Calculator of CPD points</h2>
              <div className="row">
                <div className="col-md-12" col_padding style={{ padding: '2%', paddingTop: "0px" }}>
                  <div className style={{ marginBottom: 'unset' }}><b>
                    <p></p>
                  </b> </div>
                  <div className="into-p">
                    <p>
                      It is a long established fact that a reader will be distracted by the readable content of a page.  </p>
                  </div>
                  <i className="far fa-file-pdf fa-1x co_black bold"></i>&nbsp;
                <b className="pdf_text">  Calculator of CPD points</b>&nbsp;&nbsp;
                <Link to="/downloads/Calculator of CPD Points.xls" className="btn btn-success bold font_sans fz_14" 
                    target="_blank" download>Download</Link>
                </div>
              </div>
            </div>
            <div className="col-md-1">
            </div>
          </div>
          <Footer />
        </section>
      </React.Fragment>
    );
  }

}
export default Calculator_cpd;