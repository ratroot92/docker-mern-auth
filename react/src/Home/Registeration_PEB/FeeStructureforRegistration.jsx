import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import CpdActivitiesSIDEbar from '../CpdActivitiesSIDEbar'

class FeeStructureforRegistration extends React.Component {
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
        document.title = "FeeStructureforRegistration";
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
                            <h2 className="text-center" style={{ margin: '28px 0px 0px 1px' }}>  Fee Structure for Registration</h2>
                            <div className="row">
                                <div className="col-md-12" col_padding style={{ padding: '2%' }}>
                                <div className="col-md-12 col_padding">
                                    <div className="into-p">
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
export default FeeStructureforRegistration;