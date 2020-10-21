import React from 'react';
import Header from './Header';
import Footer from './Footer';

class ContactUS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
        document.title = "Contact Us";
    }
    render() {
        return (
       
            <React.Fragment>
            <section  className="backco_white" style={{ fontFamily: 'Arial' }}>
                <Header />
                <div className="container">
                <h4 className="">Contact Us</h4>
                <hr/>
                    <div className="row mtb_7v">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                        <form>
                        <div className="mb-3">
                                <label htmlFor="validationDefault01">Select Your Query Department<span className="co_red">*</span></label>
                                 <div className="fz_16">
                                            <select value={this.state.discipline} id="validationDefault01" onChange={this.statechange} name="query" className="form-control co_black">
                                                <option>Choose Option </option>
                                                <option>pec@</option>
                                                <option >peb@</option>
                                                <option >cpd@</option>
                                           </select>
                                        </div>      
                            </div>
                            <div className="mb-3">
                                <label htmlFor="validationDefault02">Name<span className="co_red">*</span></label>
                                <input type="text" className="form-control fz_16" id="validationDefault02" placeholder="Your Name" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="validationDefault03">Email<span className="co_red">*</span></label>
                                <input type="email" className="form-control fz_16" id="validationDefault03" placeholder="Your Email" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="validationDefault04">Message<span className="co_red">*</span></label>
                                <textarea className="form-control fz_16" id="validationDefault04" placeholder="Your Message" rows={5} required />
                            </div>
                            <button className="btn btn-success bold fz_14" type="submit">Submit</button>
                       </form>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                    <h4 className="">Head Office Address</h4>
                   <hr/>
                   <a target="_blank" href="https://www.google.com/maps/place/Pakistan+Engineering+Council/@33.7239847,73.0909047,17z/data=!3m1!4b1!4m5!3m4!1s0x38dfc07e98fce659:0xbf9fcfb8daab700b!8m2!3d33.7239803!4d73.0930934" 
                    className="fz_14 co_black bold">
                    Pakistan Engineering Council
                    Ataturk Avenue (East), G-5/2 Islamabad
                    </a>
                   <br/>
                  <span className="bold">UAN:</span>
                  <span className="fz_14 ml-2">
                   <a target="_blank" href="tel:(+92-51) 111-111-732" className="fz_14 co_black">(+92-51) 111-111-732</a>
                    </span><br/>
                   <span className="bold">Mail:</span>
                   <span className="fz_14 ml-2">&nbsp;
                   <a target="_blank" href="mailto:cpd@pec.org.pk" className="fz_14 co_black">cpd@pec.org.pk</a>
                  </span>
                   <br/>
                    <div className="text-center mtb-15">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.4188124486104!2d73.09090471454577!3d33.72398474240572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfc07e98fce659%3A0xbf9fcfb8daab700b!2sPakistan%20Engineering%20Council!5e0!3m2!1sen!2s!4v1578400445814!5m2!1sen!2s" width={"100%"} height={400} frameBorder={0} style={{border: 0}} allowFullScreen />   </div>
          </div>
               {/* <form>
                        <div className="form-row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="validationDefault01">Name</label>
                            <input type="text" className="form-control" id="validationDefault01" placeholder="First name" defaultValue="Mark" required />
                        </div>
                        </div>
                        <div className="form-row">
                      
                        <div className="col-md-3 mb-3">
                            <label htmlFor="validationDefault04">State</label>
                            <input type="text" className="form-control" id="validationDefault04" placeholder="State" required />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="validationDefault05">Zip</label>
                            <input type="text" className="form-control" id="validationDefault05" placeholder="Zip" required />
                        </div>
                        </div>
                        <div className="form-group">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultValue id="invalidCheck2" required />
                            <label className="form-check-label" htmlFor="invalidCheck2">
                            Agree to terms and conditions
                            </label>
                        </div>
                        </div>
                        <button className="btn btn-primary" type="submit">Submit form</button>
                    </form> */}
                <Footer />
            </section>
        </React.Fragment>
       );
    }
}
export default ContactUS;