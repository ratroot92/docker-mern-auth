import React from 'react';
import Header from './Header';
import Footer from './Footer';
// import { Link } from 'react-router-dom';
class NoMatch extends React.Component {
    constructor(props) {
        super(props);
        
    }
    componentDidMount(){
        document.title = "NoMatch";
    }
    render() {
        return (
       <section  className="backco_white" style={{ fontFamily: 'Arial' }}>
        <Header />
        <div className="row col_margin">
          <div className="col-md-12 col_padding" style={{ padding: '2%' }}>
              <br/><br/><br/><br/>
                <h1 className="text-center"> Please Choose Right Url Thanks</h1>
                <br/><br/><br/><br/>
          </div>
        </div>
        <Footer />
      </section>
       );
    }
}
export default NoMatch;