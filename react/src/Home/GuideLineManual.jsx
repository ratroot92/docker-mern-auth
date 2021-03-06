import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import CpdActivitiesSIDEbar from './CpdActivitiesSIDEbar'

class GuideLineMaual extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
            name: "Home",
            url: "/"
        },
          {
          name: "Introduction to CPD ",
          url: "/Introduction"
        },
        {
          name: "CPD Byelaws",
          url: "/byelaws"
        },
        {
          name: "Engineering Professional Development Committee (EPDC)",
          url: "epdc",
          type:"button",
          "child":[
            {
              name: "Introduction",
              url: "/epdc/intro",
            },
            {
              name: "Organogram",
              url: "/Organogram",
            },
            {
              name: "EPDC Composition for Term 2018-21",
              url: "/EPDCCompostion",
            }
          ]

        },
        {
          name: "CPD Guideline Manual",
          url: "/GuideLineMauals",
       }
       ,
       {
        name: " PEC Approved Resource Person",
        url: "psrp",
        type:"button",
        "child":[
          {
            name: "List of Resourse Person",
            url: "#",
          },
          {
            name: "Criteria for Resourse Person",
            url: "#",
          },
          {
            name: "Application Form",
            url: "#",
          }
        ]
      },
     
    ]
    }
  }
  componentDidMount(){
    document.title = "GuideLine Manual";
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
              <h2 className="text-center" style={{ margin: '28px 0px 0px 1px' }}>CPD Guideline Manual</h2>
              <div className="row">
                <div className="col-md-12" col_padding style={{ padding: '2%', paddingTop: "0px" }}>
                  <div className style={{ marginBottom: 'unset' }}><b>
                    <p></p>
                  </b> </div>
                  <div className="into-p">
                    <p>
                      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here' by accident, sometimes on purpose (injected humour and the like).
                     </p>
                  </div>
                  <i className="far fa-file-pdf fa-1x co_black bold"></i>&nbsp;
                <b className="pdf_text"> CPD_Guideline_Manual</b>&nbsp;&nbsp;
                <Link to="assets/document/pdf/CPD_Guideline_Manual.pdf" className="btn btn-success bold font_sans fz_14" 
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
export default GuideLineMaual;