import React from 'react';
import "../assets/css/talhacss/webinarSearch.css";
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import $ from 'jquery';
// import { Tabs,Sonnet,Tab } from 'react-bootstrap';
class WebinarSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    }
  }
  componentDidMount(){
    document.title = "Webinar Search";
    window.scrollTo(0, 0)
    var selector = '.nav a';
    $(selector).on('click', function(){
        $(selector).removeClass('active');
        // $(this).addClass('active');
    });
}
  render() {
    return (
        <React.Fragment>
        <section  className="backco_white" style={{ fontFamily: 'Arial' }}>
          <Header />
          <div className="container">
          <div className="row">
                  <div className="col-md-1"></div>
                  <div className="col-md-10">
       <div className="row col_margin mt_5v">  
             <div className="col-md-4">
                <ul className="nav nav-tabs" role="tablist">
                   <a className="a_prop active" data-toggle="tab" href="#OldWebinars">Old Webinars</a>
                </ul>
                </div>
                <div className="col-md-4">
                <ul className="nav nav-tabs" role="tablist">
                    <a className="a_prop" data-toggle="tab" href="#UpcomingWebinars">Upcoming Webinars</a>
                </ul>
                </div>
               <div className="col-md-4">
                <ul className="nav nav-tabs" role="tablist">
                    <a className="a_prop" data-toggle="tab" href="#HappeningWebinars">Happening Webinars</a>
                </ul>
                </div>
                </div>

                </div><div className="col-md-1"></div></div>
              
      </div>
     <hr className="hrrow" />



        <div className="tab-content">
          <div id="OldWebinars" className="container  tab-pane active " >
              <div className="row">
                  <div className="col-md-1"></div>
                  <div className="col-md-10">

       <div className="row col_margin">  
                <div className="col-md-12 mtb_8v">
                    <h1 className="text-center bold">Webinars</h1>
                    <h3 className="text-center">Short Description Goes Here</h3>
                </div>
             </div>
             <div className="row  mtb_8v">  
                <div className="col-md-4">
                    <div className="input-group text_border">
                    <input type="text" className="form-control" style={{border:"unset"}} placeholder="Search Webinar Here" name="search" />
                    <div className="input-group-btn">
                    <button className="btn btn-default" type="submit"><i className="fas fa-search" /></button>
                    </div>
                     </div>
                </div>
                <div className="col-md-1">
                  <h3>Filter</h3>
                </div>
                <div className="col-md-3">
              
                    <div className="">
                        <select value={this.state.discipline} onChange={this.statechange} name="discipline" className="form-control co_black text_border">
                            <option>By Instructor </option>
                            <option>Andrew Ng</option>
                        </select>
                  </div>
                </div>
                <div className="col-md-3" style={{marginLeft:"6%"}}>
                    <div className="">
                    <select value={this.state.discipline} onChange={this.statechange} name="discipline" className="form-control co_black text_border">
                        <option>By Date </option>
                      
                    </select>
                   </div>
                </div>
             </div>
             <div className="row col_margin mtb_8v">
             <div className="col-md-4 flex_center">
            <div className="card" style={{width: '18rem'}}>
                 <img  src={require("../assets/image/photo-1528731708534-816fe59f90cb.jpg")} className="card-img-top_webinar" alt="..." />
                 <Link className="co_black" to="/LiveWebinar">
                <div className="card-body card-bod">
                    <h5 className="bold">Some example text to build </h5>
                <h6 className="csrd-text"> Andrew Ng</h6>   <i className="fas fa-clock i_clock"></i>
                <p className="csrd-text mb_unset fz_12"> 06:30 PM</p> <i className="far fa-calendar i_clock"></i>
                <span className="csrd-text mb_unset fz_12"> December 20:2019</span>
                <span className="co_green price">$49.99</span>
                </div>
              </Link>
               </div>
            </div>
            <div className="col-md-4 flex_center">
            <div className="card" style={{width: '18rem'}}>
                 <img  src={require("../assets/image/photo-1528731708534-816fe59f90cb.jpg")} className="card-img-top_webinar" alt="..." />
                 <Link className="co_black" to="/LiveWebinar">
                <div className="card-body card-bod">
                    <h5 className="bold">Some example text to build </h5>
                <h6 className="csrd-text"> Andrew Ng</h6>   <i className="fas fa-clock i_clock"></i>
                <p className="csrd-text mb_unset fz_12"> 06:30 PM</p> <i className="far fa-calendar i_clock"></i>
                <span className="csrd-text mb_unset fz_12"> December 20:2019</span>
                <span className="co_green price">$49.99</span>
                </div>
              </Link>
               </div>
            </div>
            <div className="col-md-4 flex_center">
            <div className="card" style={{width: '18rem'}}>
                 <img  src={require("../assets/image/photo-1528731708534-816fe59f90cb.jpg")} className="card-img-top_webinar" alt="..." />
                 <Link className="co_black" to="/LiveWebinar">
                <div className="card-body card-bod">
                    <h5 className="bold">Some example text to build </h5>
                <h6 className="csrd-text"> Andrew Ng</h6>   <i className="fas fa-clock i_clock"></i>
                <p className="csrd-text mb_unset fz_12"> 06:30 PM</p> <i className="far fa-calendar i_clock"></i>
                <span className="csrd-text mb_unset fz_12"> December 20:2019</span>
                <span className="co_green price">$49.99</span>
                </div>
              </Link>
               </div>
            </div>
     
      </div>

       <div className="row col_margin mtb_8v">
            <div className="col-md-4 flex_center">
            <div className="card" style={{width: '18rem'}}>
                 <img  src={require("../assets/image/photo-1528731708534-816fe59f90cb.jpg")} className="card-img-top_webinar" alt="..." />
                 <Link className="co_black" to="/LiveWebinar">
                <div className="card-body card-bod">
                    <h5 className="bold">Some example text to build </h5>
                <h6 className="csrd-text"> Andrew Ng</h6>   <i className="fas fa-clock i_clock"></i>
                <p className="csrd-text mb_unset fz_12"> 06:30 PM</p> <i className="far fa-calendar i_clock"></i>
                <span className="csrd-text mb_unset fz_12"> December 20:2019</span>
                <span className="co_green price">$49.99</span>
                </div>
              </Link>
               </div>
            </div>
           <div className="col-md-4 flex_center">
            <div className="card" style={{width: '18rem'}}>
                 <img  src={require("../assets/image/photo-1528731708534-816fe59f90cb.jpg")} className="card-img-top_webinar" alt="..." />
                 <Link className="co_black" to="/LiveWebinar">
                <div className="card-body card-bod">
                    <h5 className="bold">Some example text to build </h5>
                <h6 className="csrd-text"> Andrew Ng</h6>   <i className="fas fa-clock i_clock"></i>
                <p className="csrd-text mb_unset fz_12"> 06:30 PM</p> <i className="far fa-calendar i_clock"></i>
                <span className="csrd-text mb_unset fz_12"> December 20:2019</span>
                <span className="co_green price">$49.99</span>
                </div>
              </Link>
               </div>
            </div>
           <div className="col-md-4 flex_center">
            <div className="card" style={{width: '18rem'}}>
                 <img  src={require("../assets/image/photo-1528731708534-816fe59f90cb.jpg")} className="card-img-top_webinar" alt="..." />
                 <Link className="co_black" to="/LiveWebinar">
                <div className="card-body card-bod">
                    <h5 className="bold">Some example text to build </h5>
                <h6 className="csrd-text"> Andrew Ng</h6>   <i className="fas fa-clock i_clock"></i>
                <p className="csrd-text mb_unset fz_12"> 06:30 PM</p> <i className="far fa-calendar i_clock"></i>
                <span className="csrd-text mb_unset fz_12"> December 20:2019</span>
                <span className="co_green price">$49.99</span>
                </div>
              </Link>
               </div>
            </div>
            </div>
            <div className="row col_margin mtb_15vh">
            <div className="col-md-2"> </div>
            <div className="col-md-8">

                <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                    <a className="page-link a_prop" href="#" tabIndex={-1} aria-disabled="true">Previous</a>
                </li>
                <li className="page-item"><a className="page-link a_prop" href="#">1</a></li>
                <li className="page-item"><a className="page-link a_prop" href="#">2</a></li>
                <li className="page-item"><a className="page-link a_prop" href="#">3</a></li>
                <li className="page-item"><a className="page-link a_prop" href="#">4</a></li>
                <li className="page-item"><a className="page-link a_prop" href="#">5</a></li>
                <li className="page-item"><a className="page-link a_prop" href="#">6</a></li>
                
                <li className="page-item">
                    <a className="page-link a_prop" href="#">Next</a>
                </li>
                </ul>
            </nav>
           
             </div>
            <div className="col-md-2"> </div>
            </div>

            </div> <div className="col-md-1"></div>
              </div>
          </div>

          <div id="UpcomingWebinars" className="container tab-pane fade">
          <div className="row">
                  <div className="col-md-1"></div>
                  <div className="col-md-10">

       <div className="row col_margin">  
                <div className="col-md-12 mtb_8v">
                    <h1 className="text-center bold">Upcoming Webinars</h1>
                    <h3 className="text-center">Short Description Goes Here</h3>
                </div>
             </div>
             <div className="row  mtb_8v">  
                <div className="col-md-4">
                    <div className="input-group text_border">
                    <input type="text" className="form-control" style={{border:"unset"}} placeholder="Search Webinar Here" name="search" />
                    <div className="input-group-btn">
                    <button className="btn btn-default" type="submit"><i className="fas fa-search" /></button>
                    </div>
                     </div>
                </div>
                <div className="col-md-1">
                  <h3>Filter</h3>
                </div>
                <div className="col-md-3">
              
                    <div className="">
                        <select value={this.state.discipline} onChange={this.statechange} name="discipline" className="form-control co_black text_border">
                            <option>By Instructor </option>
                            <option>Andrew Ng</option>
                        </select>
                  </div>
                </div>
                <div className="col-md-3" style={{marginLeft:"6%"}}>
                    <div className="">
                    <select value={this.state.discipline} onChange={this.statechange} name="discipline" className="form-control co_black text_border">
                        <option>By Date </option>
                      
                    </select>
                   </div>
                </div>
             </div>
             <div className="row col_margin mtb_8v">
            <div className="col-md-4 flex_center">
            <div className="card" style={{width: '18rem'}}>
                 <img  src={require("../assets/image/photo-1528731708534-816fe59f90cb.jpg")} className="card-img-top_webinar" alt="..." />
                 <Link className="co_black" to="/LiveWebinar">
                <div className="card-body card-bod">
                    <h5 className="bold">Some example text to build </h5>
                <h6 className="csrd-text"> Andrew Ng</h6>   <i className="fas fa-clock i_clock"></i>
                <p className="csrd-text mb_unset fz_12"> 06:30 PM</p> <i className="far fa-calendar i_clock"></i>
                <span className="csrd-text mb_unset fz_12"> December 20:2019</span>
                <span className="co_green price">$49.99</span>
                </div>
              </Link>
               </div>
            </div>
           <div className="col-md-4 flex_center">
            <div className="card" style={{width: '18rem'}}>
                 <img  src={require("../assets/image/photo-1528731708534-816fe59f90cb.jpg")} className="card-img-top_webinar" alt="..." />
                 <Link className="co_black" to="/LiveWebinar">
                <div className="card-body card-bod">
                    <h5 className="bold">Some example text to build </h5>
                <h6 className="csrd-text"> Andrew Ng</h6>   <i className="fas fa-clock i_clock"></i>
                <p className="csrd-text mb_unset fz_12"> 06:30 PM</p> <i className="far fa-calendar i_clock"></i>
                <span className="csrd-text mb_unset fz_12"> December 20:2019</span>
                <span className="co_green price">$49.99</span>
                </div>
              </Link>
               </div>
            </div>
           <div className="col-md-4 flex_center">
            <div className="card" style={{width: '18rem'}}>
                 <img  src={require("../assets/image/photo-1528731708534-816fe59f90cb.jpg")} className="card-img-top_webinar" alt="..." />
                 <Link className="co_black" to="/LiveWebinar">
                <div className="card-body card-bod">
                    <h5 className="bold">Some example text to build </h5>
                <h6 className="csrd-text"> Andrew Ng</h6>   <i className="fas fa-clock i_clock"></i>
                <p className="csrd-text mb_unset fz_12"> 06:30 PM</p> <i className="far fa-calendar i_clock"></i>
                <span className="csrd-text mb_unset fz_12"> December 20:2019</span>
                <span className="co_green price">$49.99</span>
                </div>
              </Link>
               </div>
            </div>
    </div>

       <div className="row col_margin mtb_8v">
            <div className="col-md-4 flex_center">
            <div className="card" style={{width: '18rem'}}>
                 <img  src={require("../assets/image/photo-1528731708534-816fe59f90cb.jpg")} className="card-img-top_webinar" alt="..." />
                 <Link className="co_black" to="/LiveWebinar">
                <div className="card-body card-bod">
                    <h5 className="bold">Some example text to build </h5>
                <h6 className="csrd-text"> Andrew Ng</h6>   <i className="fas fa-clock i_clock"></i>
                <p className="csrd-text mb_unset fz_12"> 06:30 PM</p> <i className="far fa-calendar i_clock"></i>
                <span className="csrd-text mb_unset fz_12"> December 20:2019</span>
                <span className="co_green price">$49.99</span>
                </div>
              </Link>
               </div>
            </div>
           <div className="col-md-4 flex_center">
            <div className="card" style={{width: '18rem'}}>
                 <img  src={require("../assets/image/photo-1528731708534-816fe59f90cb.jpg")} className="card-img-top_webinar" alt="..." />
                 <Link className="co_black" to="/LiveWebinar">
                <div className="card-body card-bod">
                    <h5 className="bold">Some example text to build </h5>
                <h6 className="csrd-text"> Andrew Ng</h6>   <i className="fas fa-clock i_clock"></i>
                <p className="csrd-text mb_unset fz_12"> 06:30 PM</p> <i className="far fa-calendar i_clock"></i>
                <span className="csrd-text mb_unset fz_12"> December 20:2019</span>
                <span className="co_green price">$49.99</span>
                </div>
              </Link>
               </div>
            </div>
           <div className="col-md-4 flex_center">
            <div className="card" style={{width: '18rem'}}>
                 <img  src={require("../assets/image/photo-1528731708534-816fe59f90cb.jpg")} className="card-img-top_webinar" alt="..." />
                 <Link className="co_black" to="/LiveWebinar">
                <div className="card-body card-bod">
                    <h5 className="bold">Some example text to build </h5>
                <h6 className="csrd-text"> Andrew Ng</h6>   <i className="fas fa-clock i_clock"></i>
                <p className="csrd-text mb_unset fz_12"> 06:30 PM</p> <i className="far fa-calendar i_clock"></i>
                <span className="csrd-text mb_unset fz_12"> December 20:2019</span>
                <span className="co_green price">$49.99</span>
                </div>
              </Link>
               </div>
            </div>
            </div>
            <div className="row col_margin mtb_15vh">
            <div className="col-md-2"> </div>
            <div className="col-md-8">

                <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                    <a className="page-link a_prop" href="#" tabIndex={-1} aria-disabled="true">Previous</a>
                </li>
                <li className="page-item"><a className="page-link a_prop" href="#">1</a></li>
                <li className="page-item"><a className="page-link a_prop" href="#">2</a></li>
                <li className="page-item"><a className="page-link a_prop" href="#">3</a></li>
                <li className="page-item"><a className="page-link a_prop" href="#">4</a></li>
                <li className="page-item"><a className="page-link a_prop" href="#">5</a></li>
                <li className="page-item"><a className="page-link a_prop" href="#">6</a></li>
                
                <li className="page-item">
                    <a className="page-link a_prop" href="#">Next</a>
                </li>
                </ul>
            </nav>
           
             </div>
            <div className="col-md-2"> </div>
            </div>

            </div> <div className="col-md-1"></div>
              </div>
        
          </div>


          <div id="HappeningWebinars" className="container tab-pane fade" >
          <div className="row">
                  <div className="col-md-1"></div>
                  <div className="col-md-10">

       <div className="row col_margin">  
                <div className="col-md-12 mtb_8v">
                    <h1 className="text-center bold">Happening Webinars</h1>
                    <h3 className="text-center">Short Description Goes Here</h3>
                </div>
             </div>
             <div className="row  mtb_8v">  
                <div className="col-md-4">
                    <div className="input-group text_border">
                    <input type="text" className="form-control" style={{border:"unset"}} placeholder="Search Webinar Here" name="search" />
                    <div className="input-group-btn">
                    <button className="btn btn-default" type="submit"><i className="fas fa-search" /></button>
                    </div>
                     </div>
                </div>
                <div className="col-md-1">
                  <h3>Filter</h3>
                </div>
                <div className="col-md-3">
              
                    <div className="">
                        <select value={this.state.discipline} onChange={this.statechange} name="discipline" className="form-control co_black text_border">
                            <option>By Instructor </option>
                            <option>Andrew Ng</option>
                        </select>
                  </div>
                </div>
                <div className="col-md-3" style={{marginLeft:"6%"}}>
                    <div className="">
                    <select value={this.state.discipline} onChange={this.statechange} name="discipline" className="form-control co_black text_border">
                        <option>By Date </option>
                      
                    </select>
                   </div>
                </div>
             </div>
             <div className="row col_margin mtb_8v">
            <div className="col-md-4 flex_center">
            <div className="card" style={{width: '18rem'}}>
                 <img  src={require("../assets/image/photo-1528731708534-816fe59f90cb.jpg")} className="card-img-top_webinar" alt="..." />
                 <Link className="co_black" to="/LiveWebinar">
                <div className="card-body card-bod">
                    <h5 className="bold">Some example text to build </h5>
                <h6 className="csrd-text"> Andrew Ng</h6>   <i className="fas fa-clock i_clock"></i>
                <p className="csrd-text mb_unset fz_12"> 06:30 PM</p> <i className="far fa-calendar i_clock"></i>
                <span className="csrd-text mb_unset fz_12"> December 20:2019</span>
                <span className="co_green price">$49.99</span>
                </div>
              </Link>
               </div>
            </div>
           <div className="col-md-4 flex_center">
            <div className="card" style={{width: '18rem'}}>
                 <img  src={require("../assets/image/photo-1528731708534-816fe59f90cb.jpg")} className="card-img-top_webinar" alt="..." />
                 <Link className="co_black" to="/LiveWebinar">
                <div className="card-body card-bod">
                    <h5 className="bold">Some example text to build </h5>
                <h6 className="csrd-text"> Andrew Ng</h6>   <i className="fas fa-clock i_clock"></i>
                <p className="csrd-text mb_unset fz_12"> 06:30 PM</p> <i className="far fa-calendar i_clock"></i>
                <span className="csrd-text mb_unset fz_12"> December 20:2019</span>
                <span className="co_green price">$49.99</span>
                </div>
              </Link>
               </div>
            </div>
           <div className="col-md-4 flex_center">
            <div className="card" style={{width: '18rem'}}>
                 <img  src={require("../assets/image/photo-1528731708534-816fe59f90cb.jpg")} className="card-img-top_webinar" alt="..." />
                 <Link className="co_black" to="/LiveWebinar">
                <div className="card-body card-bod">
                    <h5 className="bold">Some example text to build </h5>
                <h6 className="csrd-text"> Andrew Ng</h6>   <i className="fas fa-clock i_clock"></i>
                <p className="csrd-text mb_unset fz_12"> 06:30 PM</p> <i className="far fa-calendar i_clock"></i>
                <span className="csrd-text mb_unset fz_12"> December 20:2019</span>
                <span className="co_green price">$49.99</span>
                </div>
              </Link>
               </div>
            </div>
    </div>

       <div className="row col_margin mtb_8v">
            <div className="col-md-4 flex_center">
            <div className="card" style={{width: '18rem'}}>
                 <img  src={require("../assets/image/photo-1528731708534-816fe59f90cb.jpg")} className="card-img-top_webinar" alt="..." />
                 <Link className="co_black" to="/LiveWebinar">
                <div className="card-body card-bod">
                    <h5 className="bold">Some example text to build </h5>
                <h6 className="csrd-text"> Andrew Ng</h6>   <i className="fas fa-clock i_clock"></i>
                <p className="csrd-text mb_unset fz_12"> 06:30 PM</p> <i className="far fa-calendar i_clock"></i>
                <span className="csrd-text mb_unset fz_12"> December 20:2019</span>
                <span className="co_green price">$49.99</span>
                </div>
              </Link>
               </div>
            </div>
           <div className="col-md-4 flex_center">
            <div className="card" style={{width: '18rem'}}>
                 <img  src={require("../assets/image/photo-1528731708534-816fe59f90cb.jpg")} className="card-img-top_webinar" alt="..." />
                 <Link className="co_black" to="/LiveWebinar">
                <div className="card-body card-bod">
                    <h5 className="bold">Some example text to build </h5>
                <h6 className="csrd-text"> Andrew Ng</h6>   <i className="fas fa-clock i_clock"></i>
                <p className="csrd-text mb_unset fz_12"> 06:30 PM</p> <i className="far fa-calendar i_clock"></i>
                <span className="csrd-text mb_unset fz_12"> December 20:2019</span>
                <span className="co_green price">$49.99</span>
                </div>
              </Link>
               </div>
            </div>
           <div className="col-md-4 flex_center">
            <div className="card" style={{width: '18rem'}}>
                 <img  src={require("../assets/image/photo-1528731708534-816fe59f90cb.jpg")} className="card-img-top_webinar" alt="..." />
                 <Link className="co_black" to="/LiveWebinar">
                <div className="card-body card-bod">
                    <h5 className="bold">Some example text to build </h5>
                <h6 className="csrd-text"> Andrew Ng</h6>   <i className="fas fa-clock i_clock"></i>
                <p className="csrd-text mb_unset fz_12"> 06:30 PM</p> <i className="far fa-calendar i_clock"></i>
                <span className="csrd-text mb_unset fz_12"> December 20:2019</span>
                <span className="co_green price">$49.99</span>
                </div>
              </Link>
               </div>
            </div>
            </div>
            <div className="row col_margin mtb_15vh">
            <div className="col-md-2"> </div>
            <div className="col-md-8">

                <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                    <a className="page-link a_prop" href="#" tabIndex={-1} aria-disabled="true">Previous</a>
                </li>
                <li className="page-item"><a className="page-link a_prop" href="#">1</a></li>
                <li className="page-item"><a className="page-link a_prop" href="#">2</a></li>
                <li className="page-item"><a className="page-link a_prop" href="#">3</a></li>
                <li className="page-item"><a className="page-link a_prop" href="#">4</a></li>
                <li className="page-item"><a className="page-link a_prop" href="#">5</a></li>
                <li className="page-item"><a className="page-link a_prop" href="#">6</a></li>
                
                <li className="page-item">
                    <a className="page-link a_prop" href="#">Next</a>
                </li>
                </ul>
            </nav>
           
             </div>
            <div className="col-md-2"> </div>
            </div>

            </div> <div className="col-md-1"></div>
              </div>
        
          </div>
          </div>
          
          <Footer />
        </section>
     
      </React.Fragment>
   
  )
  };
}
export default WebinarSearch;




// <div className="row col_margin">
// <div className="col-md-3 col_padding" style={{ padding: '2%' }}>
// {/* <CpdActivitiesSIDEbar data={this.state.data}/> */}
// </div>
// <div className="col-md-7 col_padding intr_mr">
//   <h2 className="text-center" style={{ margin: '28px 0px 0px 1px' }}>Engineer's CPD Profile Comming Soon</h2>
//   <div className="row">
//     <div className="col-md-6" col_padding style={{ padding: '2%' }}>
//      </div>
//     <div className="col-md-6" col_padding style={{ padding: '2%', paddingTop: "0px" }}>
//      <div className style={{ marginBottom: 'unset' }}></div>
//     </div>
//   </div>
// </div>
// <div className="col-md-1">
// </div>
// </div>
//<i className="fas fa-arrow-left co_green"></i>