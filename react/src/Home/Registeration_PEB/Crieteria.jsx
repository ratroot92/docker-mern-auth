import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import CpdActivitiesSIDEbar from '../CpdActivitiesSIDEbar'

class Crieteria extends React.Component {
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
        document.title = "Crieteria";
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
                            <h2 className="text-center" style={{ margin: '28px 0px 0px 1px' }}>Crieteria</h2>
                            <div className="row">
                                <div className="col-md-12" col_padding style={{ padding: '2%' }}>
                                <div className="into-p">
                                        <h4>Crieteria</h4>
                                        <ul>
                                            <li>Government/Semi-Government/Private Chartered Institutions; </li>
                                            <li>Autonomous and registered Professional Body in good standing; </li>
                                            <li>Shared objectives and compliance with PEC Act, Bye-laws (Section 16 of Bye-laws), regulations, etc.; </li>
                                            <li>Preference shall be given to those organizations which have all/most of the necessary infrastructure of their own; and </li>
                                            <li>Willing to be a registered member as a PEC Professional Engineering Body and pay a prescribed fee regularly to remain in good standing. </li>
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
export default Crieteria;