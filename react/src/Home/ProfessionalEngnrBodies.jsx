import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import CpdActivitiesSIDEbar from './CpdActivitiesSIDEbar'

class ProfessionalEngnrBodies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: "Introduction",
                    url: "/ProfessionalEngnrBodies",
                    type:"a"
                },
                {
                    name: "Crieteria for Registration",
                    url: "/ProfessionalEngnrBodies#crieteria",
                    type:"a"
                },
                {
                    name: "Procedure for Registration",
                    url: "/ProfessionalEngnrBodies#procedure",
                    type:"a"
                },
                {
                    name: "List of PEBs",
                    url: "/PEB"
                }, 
                {
                    name: "PEB Dashboard",
                    url: "PEBDashboard",
                    type:"button",
                    "child":[
                      {
                        name: "Apply for Renewal",
                        url: "#",
                      },
                      {
                        name: "CPD Calendar",
                        url: "/PEBs_calendar_2020",
                      },
                      {
                        name: "CPD Returns",
                        url: "#",
                      },
                      {
                        name: "Contact Us",
                        url: "#",
                      }
                    ]
                  }
              ]
        }
    }
    componentDidMount(){
        document.title = "Registration of Professional Engineering Bodies";
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
                        <div className="col-md-7 col_padding intr_mr" id="introduction">
                            <h2 className="text-center" style={{ margin: '28px 0px 0px 1px' }}>Professional Engineering Body (PEB)</h2>
                            <div className="row">
                                <div className="col-md-12" col_padding style={{ padding: '2%' }}>
                                    <div className="into-p">
                                        <p>
                                        The Engineering Professional Development Committee (EPDC) shall administer the professional development activities according to specified criteria and guidelines laid down by the Council. Professional institutions and associations, CPD academies, engineering universities or colleges and private institutions, registered by the Council may impart CPD activities. All these institutions, associations and other bodies shall be known as Professional Engineering Bodies (PEBs)
                                        </p>
                                    </div>
                                    <div className="into-p">
                                        <h4>Principles</h4>
                                        <ul className="ml_10">
                                            <li>An initial detailed review progressively focusing on support rather than compliance</li>
                                            <li>To focus on qualification, training and experience of people involved and procedures evolved for management and conduct of proceedings with emphasis on self-assessment</li>
                                            <li>To Review based on demonstrated and appropriately documented material.</li>
                                        </ul>
                                    </div>
                                    <div className="into-p" id="crieteria">
                                        <h4>Criteria for Registration</h4>
                                        <ul className="ml_10">
                                            <li> Government/Semi-Government/Private Chartered Institutions </li>
                                            <li> Autonomous and registered Professional Bodies in good standing </li>
                                            <li>Preference shall be given to those organizations which have all/most of the necessary infrastructure of their own</li>
                                            <li>Willing to be a registered member as a PEC Professional Engineering Body and pay a prescribed fee (if applicable) regularly to remain in good standing.</li>
                                       </ul>
                                    </div>
                                </div>
                                <div className="col-md-12 pb-5" col_padding style={{ padding: '2%', paddingTop: "0px" }}>
                                    <div className style={{ marginBottom: 'unset' }}>
                                        <b>  <p></p>  </b>
                                    </div>
                                    <div className="into-p" id="procedure">
                                        <h4>Procedure for Registration</h4>
                                        <ul className="ml_10">
                                            <li>Receipt of Application for registration on prescribed form along with fee, if any;</li>
                                            <li>Analysis and clarifications on the application by PEC </li>
                                            <li>If needed and approved by EPDC, visit to be conducted by Experts’ Panel approved by EPDC and submission of Experts’ Report to EPDC </li>
                                            <li>Approval for registration in regular meetings of EPDC </li>
                                            <li>Based on approval, formal certificate of registration be issued by EPDC </li>
                                            <li>The whole process to be completed within three (03) months </li>
                                            <li> Initial registration will be from one (01) to three (03) years depending upon the observation and recommendation of Experts Committee and accreditation status, in case of Engineering Institutions </li>
                                            <li>After expiry of registration period, the above registration procedure is to be repeated </li>
                                        </ul>
                                        <div className="ml_6">
                                            <i className="far fa-file-pdf fa-1x co_black bold"></i>&nbsp;
                                            <b className="pdf_text">Registration of PEBs</b>&nbsp;&nbsp;
                                            <Link to="/downloads/RegistrationRenewal Form for PE.doc" className="btn btn-success bold font_sans fz_14"
                                            target="_blank" download>Download</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <i className="far fa-file-pdf fa-1x co_black bold"></i>&nbsp;
                                            <b className="pdf_text">Renewal of Registration</b>&nbsp;&nbsp;
                                            <Link to="/downloads/RegistrationRenewal Form for PEb.doc" className="btn btn-success bold font_sans fz_14"
                                            target="_blank" download>Download</Link>
                                        </div>
                                       
                                    </div>
                                 
                                  

                                    {/* <div className="into-p">
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
                                 */}
                                </div>
                                {/* <div className="col-md-12 col_padding">
                                    <div className="into-p">
                                        <h4>
                                            Fee Structure for Registration</h4>
                                        <p>
                                            The following fee would be applicable to the PEBs for registration with PEC;</p>
                                        <table className="table table-bordered table-hover">
                                            <tbody><tr>
                                                <th>S.No
                                        </th>
                                                <th>Type of Organization/ Institution
                                        </th>
                                                <th>Fee (Rupees)
                                        </th>
                                            </tr>
                                                <tr>
                                                    <td><b>At initial registration:</b>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>1
                                        </td>
                                                    <td>All public sector institutions/ universities/ academies (government, semi-govt, autonomous)
                                        </td>
                                                    <td>Nil
                                        </td>
                                        </tr>
                                        <tr>
                                         <td>2
                                        </td>
                                                    <td> All private sector institutions/ universities/ academies/ associations
                                        </td>
                                                    <td>Nil
                                        </td>
                                                </tr>
                                                <tr>
                                                    <td><b>Annual Renewal Fee:</b>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>1
                                        </td>
                                                    <td>All public sector institutions/ universities/ academies (government, semi-govt,
                                                        autonomous)
                                              </td>
                                                    <td>N/ A
                                            </td>
                                                </tr>
                                                <tr>
                                                    <td>2
                                            </td>
                                                    <td>All private sector institutions/ universities/ academies/ associations
                                            </td>
                                                    <td>N/ A
                                            </td>
                                                </tr>
                                            </tbody></table>
                                    </div>
                                </div>
                          */}
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
export default ProfessionalEngnrBodies;