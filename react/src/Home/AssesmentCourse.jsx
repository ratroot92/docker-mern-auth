import React from 'react';
// import "../assets/css/main.css";
import Header from './Header';
import Footer from './Footer';
import CpdActivitiesSIDEbar from './CpdActivitiesSIDEbar'

class AssesmentCourse extends React.Component {
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
    document.title = "Online Courses";
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
              <h2 className="text-center" style={{ margin: '28px 0px 0px 1px' }}>Online Courses</h2>
              <div className="row">
                <div className="col-md-12" col_padding style={{ padding: '2%' }}>
                  <div className="into-p">
                  To provide opportunity to the engineers to attend from anywhere in the world using their Video- link, computer/laptop fitted video camera on the emerging topics where during lecture quiz, practicing exercises or later assignment submission would be the ultimate mode of assessment. This would ensure active participation rather passive mode of attendance by the engineers.
                  </div>
                  <div className="text-center mt-3">
                    <h3>Coming Soon</h3>
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
export default AssesmentCourse;