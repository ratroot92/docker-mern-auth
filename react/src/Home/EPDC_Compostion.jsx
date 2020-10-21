import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CpdActivitiesSIDEbar from "./CpdActivitiesSIDEbar";
class EPDCCompostion extends React.Component {
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
        document.title = "EPDCCompostion";
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
                        <h2 className="text-center" style={{ margin: '28px 0px 0px 1px' }}>EPDC Composition for Term 2018-21</h2>
                        <div className="row">
                            <div className="col-md-12" col_padding style={{ padding: '2%' }}>
                            <div className="into-p">
                                <p>
                              
                               </p>
                             </div>
                             <div class="container">
                                    <table class="table table-striped">
                                        <thead>
                                        <tr>
                                            <th>Engineer</th>
                                            <th>Type</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>Engr. Qazi Rashid Ahmed Baloch</td>
                                            <td>Convener</td>
                                        </tr>
                                        <tr>
                                            <td>Engr. Prof. Dr. Fazal Ahmad Khalid</td>
                                            <td>Dy.Convener</td>
                                        </tr>
                                        <tr>
                                            <td>Engr. Dr. Suhail Aftab Qureshi</td>
                                            <td>Member</td>
                                        </tr>
                                        <tr>
                                            <td>Engr. Prof. Dr. Jameel Ahmed</td>
                                            <td>Member</td>
                                        </tr>
                                        <tr>
                                            <td>Engr. Prof. Dr. Daulat Khan</td>
                                            <td>Member</td>
                                        </tr>
                                        <tr>
                                            <td>Engr. Malik Saleem Ullah Saeed</td>
                                            <td>Member</td>
                                        </tr>
                                        <tr>
                                            <td>Engr. Dr. Arshad Ali</td>
                                            <td>Member</td>
                                        </tr>
                                        <tr>
                                            <td>Engr. Shoaib Ahmad Siddiqui</td>
                                            <td>Member</td>
                                        </tr>
                                        <tr>
                                            <td>Engr. Ayaz Mirza</td>
                                            <td>Member</td>
                                        </tr>
                                        <tr>
                                            <td>Engr. Prof. Dr. Ali Sajid</td>
                                            <td>Member</td>
                                        </tr>
                                        <tr>
                                            <td>Engr. Faiz Muhammad Bhutta</td>
                                            <td>Member</td>
                                        </tr>
                                        <tr>
                                            <td>Engr. Prof. Dr. Muhammad Tufail</td>
                                            <td>Member</td>
                                        </tr>
                                        <tr>
                                            <td>Engr. Prof. Dr. Syed Mushtaq Shah</td>
                                            <td>Member</td>
                                        </tr>
                                        <tr>
                                            <td>Engr. Prof. Dr. Muhammad Zulfiqar Ali Khan</td>
                                            <td>Member</td>
                                        </tr>
                                        <tr>
                                            <td>Engr. Prof. Dr. Muhammad Inayat Ullah Babar</td>
                                            <td>Member</td>
                                        </tr>
                                        <tr>
                                            <td>Engr. Mahmood A. Sulehri</td>
                                            <td>Member</td>
                                        </tr>
                                        <tr>
                                            <td>Engr. Prof. Dr. Shahab Khushnood</td>
                                            <td>Member</td>
                                        </tr>
                                        <tr>
                                            <td>Engr. Khadim Hussain Bhatti</td>
                                            <td>Member</td>
                                        </tr>
                                        <tr>
                                            <td>Engr. Dr. Ashfaq Ahmed Shaikh</td>
                                            <td>Secretary to Committee</td>
                                        </tr>
                                       </tbody>
                                    </table>
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
export default EPDCCompostion;