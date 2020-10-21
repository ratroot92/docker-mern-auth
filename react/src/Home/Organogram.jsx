import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CpdActivitiesSIDEbar from "./CpdActivitiesSIDEbar";
class Organogram extends React.Component {
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
        document.title = "Organogram";
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
                        <h2 className="text-center" style={{ margin: '28px 0px 0px 1px' }}>Organogram</h2>
                        <div className="row">
                            <div className="col-md-12" col_padding style={{ padding: '2%' }}>
                                <img  src={require("../assets/image/organophone.PNG")} alt="Organogram" style={{width:"100%",height:"65vh"}} />
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
export default Organogram;