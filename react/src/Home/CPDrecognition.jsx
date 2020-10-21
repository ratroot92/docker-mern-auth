
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import CpdActivitiesSIDEbar from './CpdActivitiesSIDEbar'

class CPDrecognition extends React.Component {
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
        name: "CPD Recognition of Foregin Institutions",
        url: "/CPDrecognition"
      },
      {
        name: "CPD Bye-Laws 2008",
        url: "/byelaws"
      },
      {
        name: "CPD GuideLine Manual",
        url: "/GuideLineMauals"
      }
      ]
    }
  }
  componentDidMount() {
    document.title ="CPD Recognition of Foregin Institutions";
 }
render () {
    return (
        <React.Fragment>
            <section  className="backco_white" style={{ fontFamily: 'Arial' }}>
                <Header />
                <div className="row col_margin">
                   <div className="col-md-3 col_padding" style={{ padding: '2%' }}>
                    <CpdActivitiesSIDEbar data={this.state.data} />
                    </div>
                    <div className="col-md-7 col_padding intr_mr">
                        <h2 className="text-center" style={{ margin: '28px 0px 0px 1px' }}>CPD Recognition of Foregin Institutions</h2>
                        <div className="row">
                            <div className="col-md-12" col_padding style={{ padding: '2%' }}>
                                <div className="into-p">
                                    <p>
                                        The mechanism for recognition/ acceptance of CPD activities acquired by the PEs (Professional Engineers) and REs (Registered Engineers) from foreign institutions/ universities/ professional organizations is based on following criteria:</p>
                               </div>
                                <div className="into-p">
                                    <ol>
                                        <li>CPD bodies/ institutions/ universities recognized or registered by the equivalent registration/ licensing bodies including Member Economies of International Professional Engineers Agreement (IPEA).</li>
                                        <li>CPD activities acquired from the institutions/ universities having accredited engineering programs by equivalent accrediting bodies as FEANI, EC_UK, ABET (Accreditation Board for Engineering and Technology), and Member Economies of Washington Accord.</li>
                                        <li>CPD activities acquired from recognized educational institutions/ universities, from the relevant forum (HEC, Education Ministry, etc.)</li>
                                    </ol>
                                </div>
                            </div>
                            <div className="col-md-12" col_padding style={{ padding: '2%', paddingTop: "0px" }}>
                            <div className style={{ marginBottom: 'unset' }}>
                            </div>
                                <div className="into-p">
                                <ol>
                                      <li>Established and recognized Professional Bodies like American Society of Civil Engineers (ASCE), Institute of Electrical &amp; Electronics Engineers (IEEE) etc.</li>
                                        <li>Established and recognized technical organizations </li>
                                        <li>Distance learning will only be accepted based on defined criteria internationally acceptable.</li>
                                        <ol>
                                            <li>
                                                Subject area of CPD activity</li>
                                            <li>
                                                Objectives and scope </li>
                                            <li>
                                                Mode of delivery </li>
                                            <li>
                                                Assessment mechanism </li>
                                            <li>
                                                Evaluation process </li>
                                        </ol>
                                        <li>For engineers acquiring CPD through above said system(s) will deposit Rs 2000/-(Rupees two thousand only) per CPD return plus verification fee, if applicable, as per actual.</li>
                                        <li>The CPD activities would have the same CPD credit points and meaning as given in the PDE Byelaws 2008.</li>
                                    </ol>
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
export default CPDrecognition;