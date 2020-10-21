import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import CpdActivitiesSIDEbar from './CpdActivitiesSIDEbar'

class ShortCoursesPPT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        name: "Short Courses Presentation by PEC",
        url: "/ShortCoursesPPT"
      },
      {
        name: "Forms",
        url: "Forms",
        type:"button",
        "child":[
          {
            name: "CPD Resourse Person",
            url: "/CPD_Resource_person",
          },
          {
            name: "EPE Forms ",
            url: "/EPEForms",
          },
          {
            name: "CPD Forms ",
            url: "/CPDForms",
          }
        ]
      },
      {
        name: "Documents",
        url: "/Documents"
      }
      ]
    }
  }
  componentDidMount(){
    document.title = "Short Courses & Training";
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
            <h2 className="text-center" style={{ margin: '28px 0px 0px 1px' }}>Short Courses Presentation by PEC</h2>
            <div className="row">
              <div className="col-md-12" col_padding style={{ padding: '2%' }}>
                <div className="into-p">
                  <ol>
                    <li className="padding_10">
                      Introduction to Project Management Engr Shahid Gill Presentation&nbsp;&nbsp;
                      <Link to="https://www.pec.org.pk/Downloadables/Introduction to Project Mangement Engr Shahid Gill.pdf" className="btn btn-success bold font_sans fz_14" 
                        target="_blank" download>Download</Link>
                    </li>
                    <li className="padding_10">
                      Contract Management under the FIDIC Red Book Training Presentation&nbsp;&nbsp;
                      <Link to="https://www.pec.org.pk/Downloadables/PEC FIDIC Training slides.final.pdf" className="btn btn-success bold font_sans fz_14" 
                        target="_blank" download>Download</Link>
                    </li>
                    <li className="padding_10">
                      Risk Allocation and Bankability in Construction Projects&nbsp;&nbsp;
                      <Link to="https://www.pec.org.pk/Downloadables/risk-allocation-and-bankability-in-construction-projects.pdf" className="btn btn-success bold font_sans fz_14" 
                        target="_blank" download>Download</Link>
                    </li>
                    <li className="padding_10">Going for Gold: Avail Scholarship Opportunities Around the world [Presentation by Prof Dr. BS Chowdhry]&nbsp;&nbsp;
                        <Link to="https://www.pec.org.pk/Downloadables/Professor BS Chowdhry/Going for Gold 25 Oct 2014.pptx" className="btn btn-success bold font_sans fz_14" 
                        target="_blank" download>Download</Link>
                    </li>
                    <li className="padding_10">Flood Disaster Management Concepts&nbsp;&nbsp;
                        <Link to="https://www.pec.org.pk/Downloadables/FLOOD DISASTER  MANAGEMENT  CONCEPTS/FLOOD DISASTER  MANAGEMENT  CONCEPTS.pdf" className="btn btn-success bold font_sans fz_14" 
                        target="_blank" download>Download</Link>
                    </li>
                    <li className="padding_10">Mobile Communication System&nbsp;&nbsp;
                     <Link to="https://www.pec.org.pk/downloads/cpd presentations/mobile_communications_pdfs.rar" className="btn btn-success bold font_sans fz_14" 
                        target="_blank" download>Download</Link>
                    </li>
                  </ol>
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
    );
  }
}
export default ShortCoursesPPT;