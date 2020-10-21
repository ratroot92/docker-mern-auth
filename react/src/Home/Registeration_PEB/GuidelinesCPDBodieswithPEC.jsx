import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import CpdActivitiesSIDEbar from '../CpdActivitiesSIDEbar'

class GuidelinesCPDBodieswithPEC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: "CPD Activity of Calendar for PEB",
                    url: "/PEB"
                },
                {
                    name: "Registration of Professional Engineering Bodies",
                    url: "/ProfessionalEngnrBodies"
                },
                {
                    name: "Principle",
                    url: "/Principle"
                },
                {
                    name: "Crieteria",
                    url: "/Crieteria"
                },
                {
                    name: "Procedure",
                    url: "/Procedure"
                },
                {
                    name: "Guidelines for Registration of CPD Bodies with PEC",
                    url: "/GuidelinesCPDBodieswithPEC"
                },
                {
                    name: "Fee Structure for Registration",
                    url: "/FeeStructureforRegistration"
                }
    
                ]
        }
    }
    componentDidMount(){
        document.title = "GuidelinesCPDBodieswithPEC";
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
                            <h2 className="text-center" style={{ margin: '28px 0px 0px 1px' }}>Guidelines for Registration of CPD Bodies with PEC</h2>
                            <div className="row">
                                <div className="col-md-12" col_padding style={{ padding: '2%' }}>
                                <div className="into-p">
                                        <h4>Guidelines for Registration of CPD Bodies with PEC</h4>
                                        <p>All the Professional Bodies interested to join for imparting CPD activities, may
                                        apply for registration with PEC while adhering to the provision of CPD Byelaws especially
                                        Section 16 and the defined criteria (Section 3.3). The professional bodies named
                                        PEBs would apply on the prescribed form along with fee and necessary documents to
                                        PEC. Any institute or body having more than one campus, would require a separate
                                        registration/ evaluation process. The major parameters to be evaluated might be
                                        included but not limited to the followings:</p>
                                        <ul>
                                            <li>Management of the Institute/ Organization </li>
                                            <li>Mission and Objectives </li>
                                            <li>Infrastructure
                                            and Physical Resources </li>
                                            <li>Human Resources – Resource Persons and Staff v. Area(s)
                                            of Interest for CPD Activities </li>
                                            <li>Major Achievements – Past CPD activities and
                                            experiences</li></ul>
                                         <p>
                                            All PEBs will provide yearly CPD schedule to PEC/ EPDC for information
                                            and record. If anything found unbalanced in the CPD schedule/ activities then PEC
                                            may ask for clarification(s). The CPD activities will include but not limited to
                                            the activities defined in CPD Byelaws Section 15 (given in Part 2 of this Manual).
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
      
      );
    }
}
export default GuidelinesCPDBodieswithPEC;


{/* <React.Fragment>
<section  className="backco_white" style={{ fontFamily: 'Arial' }}>
    <Header />
    <div className="row col_margin">
        <div className="col-md-3 col_padding" style={{ padding: '2%' }}>
            <CpdActivitiesSIDEbar data={this.state.data} />
        </div>
        <div className="col-md-7 col_padding intr_mr">
            <h2 className="text-center" style={{ margin: '28px 0px 0px 1px' }}>Guidelines for Registration of CPD Bodies with PEC</h2>
            <div className="row">
                <div className="col-md-12" col_padding style={{ padding: '2%' }}>
                <div className="into-p">
                        <h4>Guidelines for Registration of CPD Bodies with PEC</h4>
                        <p>All the Professional Bodies interested to join for imparting CPD activities, may
                        apply for registration with PEC while adhering to the provision of CPD Byelaws especially
                        Section 16 and the defined criteria (Section 3.3). The professional bodies named
                        PEBs would apply on the prescribed form along with fee and necessary documents to
                        PEC. Any institute or body having more than one campus, would require a separate
                        registration/ evaluation process. The major parameters to be evaluated might be
                        included but not limited to the followings:</p>
                        <ul>
                            <li>Management of the Institute/ Organization </li>
                            <li>Mission and Objectives </li>
                            <li>Infrastructure
                            and Physical Resources </li>
                            <li>Human Resources – Resource Persons and Staff v. Area(s)
                            of Interest for CPD Activities </li>
                            <li>Major Achievements – Past CPD activities and
                            experiences</li></ul>
                         <p>
                            All PEBs will provide yearly CPD schedule to PEC/ EPDC for information
                            and record. If anything found unbalanced in the CPD schedule/ activities then PEC
                            may ask for clarification(s). The CPD activities will include but not limited to
                            the activities defined in CPD Byelaws Section 15 (given in Part 2 of this Manual).
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
</React.Fragment> */}
