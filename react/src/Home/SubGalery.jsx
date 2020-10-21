import React from 'react';
import Header from './Header';
import Footer from './Footer';
// import { Link } from 'react-router-dom';
//import CpdActivitiesSIDEbar from './CpdActivitiesSIDEbar'

class SubGalery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                name: "Gallery",
                url: "/gallery"
              }
              ]
        }
    }
    componentDidMount(){
        document.title = "Gallery";
        window.scrollTo(0, 0)
    }
    render() {
        return (
       <React.Fragment>
      <section  className="backco_white" style={{ fontFamily: 'Arial' }}>
          <Header />
          <div className="container">
          <h3 className="mt-4">Engineering Curriculum Development Committee (ECDC) Meeting </h3>
          <hr/>
            <h6>
              ECDC meeting held at PEC Head Quarter Islamabad. Engr Prof. Dr. M Younus Javed Convener chaired the meeting, Engr. Muhammad Raza Chohan Director
            General (Academics) HEC also participated in the meeting. ECDC is reviewing the curriculum of engineering disciplines to meet national and international
            challenges being faced by Engineers and Engineering Profession.It was decided that subcommittees of each discipline shall be formed, comprising of professional
            from Industries and Academia. Consultative workshops will be conducted with stakeholders to meet the challenges and introduce Objective Base Education (OBE)
            and curriculum for all engineering disciplines.
            </h6>
              <div className="mtb_7v">
                  <div className="row ">
                      <div className="col-md-4">
                              <div className="card">
                              <img className="card-img-top card_Subgallery_img" src={require('../assets/image/cpd/gallery/2gal.jpg')} alt="Card image cap" />
                           </div>
                            <br/>
                      </div>
                      <div className="col-md-4">
                              <div className="card" >
                              <img className="card-img-top card_Subgallery_img" src={require('../assets/image/cpd/gallery/3gal.jpg')} alt="Card image cap" />
                             </div>
                            <br/>
                    </div>
                      <div className="col-md-4">
                              <div className="card" >
                              <img className="card-img-top card_Subgallery_img" src={require('../assets/image/cpd/gallery/4gal.jpg')} alt="Card image cap" />
                             </div>
                            <br/>
                      </div>
                      <div className="col-md-4">
                              <div className="card" >
                              <img className="card-img-top card_Subgallery_img" src={require('../assets/image/cpd/gallery/5gal.jpg')} alt="Card image cap" />
                             </div>
                            <br/>
                      </div>
                      <div className="col-md-4">
                              <div className="card" >
                              <img className="card-img-top card_Subgallery_img" src={require('../assets/image/cpd/gallery/6gal.gif')} alt="Card image cap" />
                             </div>
                            <br/>
                      </div>
                  </div>
                  {/* <div className="row ">
                      <div className="col-md-4">
                              <div className="card">
                              <img className="card-img-top card_Subgallery_img" src={require('../assets/image/cpd/c1.png')} alt="Card image cap" />
                            </div>
                            <br/>
                      </div>
                      <div className="col-md-4">
                              <div className="card" >
                              <img className="card-img-top card_Subgallery_img" src={require('../assets/image/cpd/c1.png')} alt="Card image cap" />                            
                            </div>
                            <br/>
                    </div>
                      <div className="col-md-4">
                              <div className="card" >
                              <img className="card-img-top card_Subgallery_img" src={require('../assets/image/cpd/c1.png')} alt="Card image cap" />
                            </div>
                            <br/>
                      </div>
                  </div>
                  <div className="row ">
                      <div className="col-md-4">
                              <div className="card">
                              <img className="card-img-top card_Subgallery_img" src={require('../assets/image/cpd/c1.png')} alt="Card image cap" />
                            </div>
                            <br/>
                      </div>
                      <div className="col-md-4">
                              <div className="card" >
                              <img className="card-img-top card_Subgallery_img" src={require('../assets/image/cpd/c1.png')} alt="Card image cap" />
                            </div>
                            <br/>
                    </div>
                      <div className="col-md-4">
                              <div className="card" >
                              <img className="card-img-top card_Subgallery_img" src={require('../assets/image/cpd/c1.png')} alt="Card image cap" />
                            </div>
                            <br/>
                      </div>
                  </div>
             */}
            </div>
              </div>
          <Footer />
      </section>
  </React.Fragment>

        );
        
    }
}
export default SubGalery;