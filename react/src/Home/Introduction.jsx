import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CpdActivitiesSIDEbar from './CpdActivitiesSIDEbar'

class Introduction extends React.Component {
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
            url: "/Introduction/#",
          },
          {
            name: "Criteria for Resourse Person",
            url: "/Introduction/#",
          },
          {
            name: "Application Form",
            url: "/Introduction/#",
          }
        ]
      },
     
    ]
    }
  }
  componentDidMount(){
    document.title = "Introduction";
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
              <h2 className="text-center" style={{ margin: '28px 0px 0px 1px' }}>Introduction to CPD</h2>
              <div className="row">
                <div className="col-md-12" col_padding style={{ padding: '2%' }}>
                  <div className="into-p">
                    <p>
                    Pakistan Engineering Council (PEC) under PEC Act and CPD Byelaws-2008, is earnestly working for the professional growth and skill enhancement of ever growing engineering community. Under CPD framework, the engineers (both PEs and REs) are required to learn innovative and soft skills to be more effective in playing productive role towards nation building. With these objectives, CPD framework of PEC sets parameters through number of developmental activities (short courses, trainings, workshops, research publications, professional memberships, Member of any Technical Committee, etc.) for the ultimate benefits of engineers in their career development and at the same time renewal of PEC registration as well as for elevation from Registered Engineer (RE) to Professional Engineer (PE) and then International Professional Engineer (Int PE)
                    PEC is therefore working through various means and options taking advantage of latest IT and communication tools to facilitate the engineers. Under New Vision of CPD, specialized job-oriented and global certification courses are being introduced to enhance employability and on-job performance. For wider coverage and remote outreach; webinars, online courses and video-conferencing facilities have been integrated. 
                    </p>
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
  };
}
export default Introduction;