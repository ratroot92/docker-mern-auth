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
                            <h2 className="text-center" style={{ margin: '28px 0px 0px 1px' }}>Principles</h2>
                            <div className="row">
                                <div className="col-md-12" col_padding style={{ padding: '2%' }}>
                                    <div className="into-p">
                                        <h4>Principles</h4>
                                        <ul>
                                            <li>An initial detailed review progressively focusing on support rather than compliance;</li>
                                            <li>Focus on qualification, training and experience of people involved and procedures evolved for management and conduct of proceedings with emphasis on self-assessment; and </li>
                                            <li>Review based on demonstrated and appropriately documented material.</li>
                                        </ul>
                                        </div>
                                    </div>
                                  </div>
                             </div>
                             {/* <div className="col-md-6" col_padding style={{ padding: '2%' }}>
                             </div> */}
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