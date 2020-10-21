import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import CpdActivitiesSIDEbar from './CpdActivitiesSIDEbar'
import { Button } from 'reactstrap';

class EPDC extends React.Component {
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
                name: "CPD Byelaws",
                url: "/byelaws"
              },
              {
                name: "Engineering Professional Development Committee (EPDC)",
                url: "epdc",
                type:"button",
                "child":[
                  {
                    name: "Introduction",
                    url: "/epdc/intro",
                  },
                  {
                    name: "Organogram",
                    url: "/Organogram",
                  },
                  {
                    name: "EPDC Composition for Term 2018-21",
                    url: "/EPDCCompostion",
                  }
                ]

              },
              {
                name: "CPD Guideline Manual",
                url: "/GuideLineMauals",
             }
             ,
             {
              name: " PEC Approved Resource Person",
              url: "psrp",
              type:"button",
              "child":[
                {
                  name: "List of Resourse Person",
                  url: "#",
                },
                {
                  name: "Criteria for Resourse Person",
                  url: "#",
                },
                {
                  name: "Application Form",
                  url: "#",
                }
              ]
            },
           
          ]
        }
    }
    componentDidMount(){
        document.title = "Introduction";
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
                        <h2 className="text-center" style={{ margin: '28px 0px 0px 1px' }}>Introduction</h2>
                        <div className="row">
                            <div className="col-md-12" col_padding style={{ padding: '2%' }}>
                                <div className="into-p">
                                Engineering Professional Development Committee working under the directions of the Governing Body shall take all measures and perform all functions which may be necessary for professional development of all engineers registered with the Council. The powers and functions of the EPDC are her under;
                                    <h4></h4>
                                    <ul className="ml_6">
                                        <li>
                                        To prescribe, monitor and review standards of professional development in coordination with the Council such that these are in line with internationally recognized standards; 
                                        </li>
                                        <li>
                                        To coordinate implementation of CPD activities; 
                                        </li>
                                        <li>
                                        To regulate the engineering professional bodies imparting CPD; 
                                        </li>
                                        <li>
                                        To record and quantify the CPD for each registered person. The Committee shall issue a certificate regarding present position of CPD to a registered person on demand against a prescribed fee; 
                                        </li>
                                        <li>
                                        To conduct EPE and publish results of the same; and
                                        </li>
                                        <li>
                                        To perform any other function related to professional development of engineers.
                                        </li>
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
export default EPDC;