import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import CpdActivitiesSIDEbar from '../CpdActivitiesSIDEbar'

class Principles extends React.Component {
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
        document.title = "Principles";
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
                            <h2 className="text-center" style={{ margin: '28px 0px 0px 1px' }}>Procedure</h2>
                            <div className="row">
                                <div className="col-md-12" col_padding style={{ padding: '2%' }}>
                                <div className="into-p">
                                        <h4>Procedure</h4>
                                        <ul>
                                            <li>Receipt of Application for registration on prescribed form along with fee, if any;</li>
                                            <li>Analysis and clarifications on the application by PEC; </li>
                                            <li>If needed and approved by EPDC, visit to be conducted by Experts’ Panel approved by EPDC and submission of Experts’ Report to EPDC; </li>
                                            <li>Approval for registration in regular meetings of EPDC; </li>
                                            <li>Based on approval, formal certificate of registration be issued by EPDC; </li>
                                            <li>The whole process to be completed within three (03) months; </li>
                                            <li>Registration valid up to three (03) years; </li>
                                            <li>After expiry of registration period, the above registration procedure is to be repeated.</li>
                                        </ul>
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
export default Principles;