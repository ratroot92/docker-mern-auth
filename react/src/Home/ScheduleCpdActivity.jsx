import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CpdActivitiesSIDEbar from './CpdActivitiesSIDEbar'
import { Link } from 'react-router-dom';
// import "../assets/css/talhacss/Calender.css";

// import "../assets/Calenderpackages/core/main.css";
// import "../assets/Calenderpackages/list/main.css";
// import "../assets/Calenderpackages/core/main.js";
// import "../assets/Calenderpackages/daygrid/main.js";
// import "../assets/Calenderpackages/list/main.js";
// import "../assets/Calenderpackages/google-calendar/main.js";




class ScheduleCPDActivities extends React.Component {
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
     
      ],
       calender:'<iframe src="https://calendar.google.com/calendar/embed?height=400&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Asia%2FKarachi&amp;src=ajRtaWtsNWppMTJ1aHJiMWJlMTMxZ3NvMG9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%23871111&amp;showTitle=1&amp;showTz=1&amp;showTabs=1&amp;showPrint=0&amp;showCalendars=1&amp;showNav=1&amp;showDate=1" style="border-width:0; color:green !important;" width="100%" height="400" frameborder="0" scrolling="no"></iframe>'
    
    }
  }

  componentDidMount(){
    document.title = "Schedule Activities";

    // document.addEventListener('DOMContentLoaded', function() {
    //   var calendarEl = document.getElementById('calendar');
    //   var calendar = new FullCalendar.Calendar(calendarEl, {
    //   plugins: [ 'interaction', 'dayGrid', 'list', 'googleCalendar' ],
    //     header: {
    //       left: 'prevYear,prev,next,nextYear today myCustomButton',
    //       center: 'title',
    //       right: 'dayGridMonth,dayGridWeek,listYear'
    //     },
    //     displayEventTime: true, // don't show the time column in list view
    //     // THIS KEY WON'T WORK IN PRODUCTION!!!
    //     // To make your own Google API key, follow the directions here:
    //     // http://fullcalendar.io/docs/google_calendar/
    //    googleCalendarApiKey: 'AIzaSyBBz82ez2JZrvj_4OxBNhUmFcEzEDN6H1k',
    //    events:{
    //           googleCalendarId: 'j4mikl5ji12uhrb1be131gso0o@group.calendar.google.com',
    //           className:'gcal-event',
    //       },
    //     // US Holidays
    //    // events: 'en.usa#holiday@group.v.calendar.google.com',
    //     eventClick: function(arg) {
    //       // opens events in a popup window
    //       window.open(arg.event.url, 'google-calendar-event', 'width=700,height=600');
    //       arg.jsEvent.preventDefault() // don't navigate in main tab
    //     },
    //     loading: function(bool) {
    //       document.getElementById('loading').style.display =
    //         bool ? 'block' : 'none';
    //     }
    //   });
    // calendar.render();
    // });

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
              <h2 className="text-center" style={{ margin: '28px 0px 0px 1px' }}>CPD Activities </h2>
              <div className="row">
                <div className="col-md-12" col_padding style={{ padding: '2%' }}>
                  <div className="intro-p">
                  
              
                  </div>
                  <i className="far fa-file-pdf fa-1x co_black bold"></i>&nbsp;
                   <b className="pdf_text">PD_Short_Course_2019</b>&nbsp;&nbsp;
                  <Link to="assets/document/pdf/CPD_Short_Course_2019_Full_Detail_17102019.pdf" className="btn btn-success bold font_sans fz_14" 
                    target="_blank" download>Download</Link>

                </div>
             
              </div>

              <div id="Iframe-Google-Calendar" class="set-margin set-padding set-border set-box-shadow center-block-horiz">
                <div class="responsive-wrapper 
                responsive-wrapper-padding-bottom-75pct"
                style={{"-webkit-overflow-scrolling": "touch", overflow: "auto"}}>
              <div  className="" dangerouslySetInnerHTML={{ __html: this.state.calender }} />
           </div>
        </div>
 

                  {/* <div id='loading'>loading...</div>
                    <div id='calendar'></div> */}


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
export default ScheduleCPDActivities;