import React from 'react';
import "../assets/css/main.css";
import Header from './Header';
import Footer from './Footer';
import CpdActivitiesSIDEbar from './CpdActivitiesSIDEbar'

class CPDProfile extends React.Component {
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
  componentDidMount() {
    document.title ="Engineer's CPD Profile";
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
              <h2 className="text-center" style={{ margin: '28px 0px 0px 1px' }}>Engineer's CPD Profile</h2>
              <div className="row">
                <div className="col-md-12" col_padding style={{ padding: '2%' }}>
                <div className="into-p">
                    <p>
                    The CPD programs include additional qualifications, professional skills, relevant management and communication skills acquired through additional training and experience. These aspects are grouped into the following four different categories of training, namely
                   </p>
                    </div>
                    <ul className="ml_6">
                      <li>Higher education</li>
                      <li>On-Job/ Work-based learning</li>
                      <li>Developmental activities</li>
                      <li>Individual activitie</li>
                    </ul>
                    <p>
                    For details of CPD points under these categories and updating CPD profile please click here. 
                    </p>
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
export default CPDProfile;