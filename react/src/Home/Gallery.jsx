import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
//import CpdActivitiesSIDEbar from './CpdActivitiesSIDEbar'

class Gallery extends React.Component {
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
    }
    render() {
        return (
       <React.Fragment>
      <section  className="backco_white" style={{ fontFamily: 'Arial' }}>
          <Header />
          <div className="container">
          <h3 className="mt-4">Gallery</h3>
          <hr/>
              <div className="mtb_7v">
                  <div className="row ">
                      <div className="col-md-4">
                              <div className="card">
                              <img className="card-img-top card_gallery_img" src={require('../assets/image/cpd/gallery/1gal.jpg')} alt="Card image cap" />
                              <div className="card-body card_gallery_body">
                                <h5 className="card-title">CPD short Course on advance network simulation using ns3</h5>
                                <p className="card-text"></p>
                               <Link to="/sub_gallery" className="btn btn-success bold">View All Photos</Link>
                              </div>
                            </div>
                            <br/>
                      </div>
                      {/* <div className="col-md-4">
                              <div className="card" >
                              <img className="card-img-top card_gallery_img" src={require('../assets/image/cpd/c1.png')} alt="Card image cap" />
                              <div className="card-body card_gallery_body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text"></p>
                               <Link to="/sub_gallery" className="btn btn-success bold">View All Photos</Link>
                              </div>
                            </div>
                            <br/>
                    </div>
                      <div className="col-md-4">
                              <div className="card" >
                              <img className="card-img-top card_gallery_img" src={require('../assets/image/cpd/c1.png')} alt="Card image cap" />
                              <div className="card-body card_gallery_body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text"></p>
                               <Link to="/sub_gallery" className="btn btn-success bold">View All Photos</Link>
                              </div>
                            </div>
                            <br/>
                      </div>
                   */}
                  </div>
                  {/* <div className="row ">
                      <div className="col-md-4">
                              <div className="card">
                              <img className="card-img-top card_gallery_img" src={require('../assets/image/cpd/c1.png')} alt="Card image cap" />
                              <div className="card-body card_gallery_body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text"></p>
                               <Link to="/sub_gallery" className="btn btn-success bold">View All Photos</Link>
                              </div>
                            </div>
                            <br/>
                      </div>
                      <div className="col-md-4">
                              <div className="card" >
                              <img className="card-img-top card_gallery_img" src={require('../assets/image/cpd/c1.png')} alt="Card image cap" />
                              <div className="card-body card_gallery_body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text"></p>
                               <Link to="/sub_gallery" className="btn btn-success bold">View All Photos</Link>
                              </div>
                            </div>
                            <br/>
                    </div>
                      <div className="col-md-4">
                              <div className="card" >
                              <img className="card-img-top card_gallery_img" src={require('../assets/image/cpd/c1.png')} alt="Card image cap" />
                              <div className="card-body card_gallery_body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text"></p>
                               <Link to="/sub_gallery" className="btn btn-success bold">View All Photos</Link>
                              </div>
                            </div>
                            <br/>
                      </div>
                  </div>
                  <div className="row ">
                      <div className="col-md-4">
                              <div className="card">
                              <img className="card-img-top card_gallery_img" src={require('../assets/image/cpd/c1.png')} alt="Card image cap" />
                              <div className="card-body card_gallery_body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text"></p>
                               <Link to="/sub_gallery" className="btn btn-success bold">View All Photos</Link>
                              </div>
                            </div>
                            <br/>
                      </div>
                      <div className="col-md-4">
                              <div className="card" >
                              <img className="card-img-top card_gallery_img" src={require('../assets/image/cpd/c1.png')} alt="Card image cap" />
                              <div className="card-body card_gallery_body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text"></p>
                               <Link to="/sub_gallery" className="btn btn-success bold">View All Photos</Link>
                              </div>
                            </div>
                            <br/>
                    </div>
                      <div className="col-md-4">
                              <div className="card" >
                              <img className="card-img-top card_gallery_img" src={require('../assets/image/cpd/c1.png')} alt="Card image cap" />
                              <div className="card-body card_gallery_body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text"></p>
                               <Link to="/sub_gallery" className="btn btn-success bold">View All Photos</Link>
                              </div>
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
export default Gallery;