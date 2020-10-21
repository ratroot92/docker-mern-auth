import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import CpdActivitiesSIDEbar from './CpdActivitiesSIDEbar'

class Documents extends React.Component {
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
    document.title = "Forms";
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
            <h2 className="text-center" style={{ margin: '28px 0px 0px 1px' }}>Documents</h2>
            <div className="row">
               <div className="col-md-12" col_padding style={{ padding: '2%', paddingTop: "0px" }}>
              <div className="into-p">
                  <p>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here' by accident, sometimes on purpose (injected humour and the like).
                  </p>
                </div>
                <i className="far fa-file-pdf fa-1x co_black bold"></i>&nbsp;
                <b className="pdf_text">15th_EPE_Result_2</b>&nbsp;&nbsp;
                <Link to="assets/document/15th_EPE_Result_2.pdf" className="btn btn-success bold font_sans fz_14"
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
export default Documents;