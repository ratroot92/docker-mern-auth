import React from "react";
import Header from '../Home/Header';
import Footer from '../Home/Footer';
export default function Page404({ location }) {
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
