import React from 'react';
import Header from './Header'
import Footer from './Footer'
import CPDInfoSideBar from './CPDInfoSideBar'
import { Link } from 'react-router-dom';

function Service() {
  return (
    <React.Fragment>
      <section  className="backco_white" style={{ fontFamily: 'Arial' }}>
        <Header />
        <div>
          <div className="row col_margin">
            <div className="col-md-3 col_padding" style={{ padding: '2%' }}>
              <CPDInfoSideBar />
            </div>
            <div className="col-md-7 col_padding intr_mr ">
              <h2 className="text-center" style={{ margin: '28px 0px 0px 1px' }}>Service Structure of Engineers (Proposed)</h2>
              <div className="row">
                <div className="col-md-6   pd_2">
                  <p className="ch_m">
                    Chairman Message
                </p>
                  <p className="intro-p">
                    My dear engineers,<br />
                    Assalam-o-Alaikum,
                </p>
                  <p className="into-p">
                    It is a great day today that we are uploading the draft of “Engineers Service Structure”. It took over a year to develop consensus among committee and GB members. We are grateful of the “Engineers Service Structure” committee members who worked tirelessly on this subject:
                </p>
                  <div className="into-p">
                    <ol className="ol_pl ">
                      <li>Engr. Tahir Basharat Cheema - (Convener)</li>
                      <li>Engr. Pervez Butt - (Member)</li>
                      <li>Engr. Raghib Abbas Shah - (Member)</li>
                      <li>Engr. Kamal Uddin Tipu - (Member)</li>
                      <li>Engr. Usman Yousaf Mobin - (Member)</li>
                      <li>Engr. Riaz Ahmed Khan - (Member)</li>
                      <li>Engr. Raqeeb Khan - (Member)</li>
                      <li>Engr. Abdus Salaam Khan - (Member)</li>
                      <li>Engr. Prof Abdul Sattar Shakir - (Member)</li>
                      <li>Engr. Ahmed Kamal - (Member)</li>
                      <li>Engr. Riaz Arshad - (Member)</li>
                      <li>Engr. Shakeel Ahmed Shahwani - (Member)</li>
                      <li>Engr. Nadeem Anwar - (Member)</li>
                      <li>Mr. Mahmood Rehmani - (Secretary Committee)</li>
                    </ol>
                  </div>
                </div>
                <div className="col-md-6 pd_2">
                  <p className="into-p pt_2">
                    It is requested to all engineers to give their feedback upto Nov 20, 2016 on e.mail addressed to chairman@pec.org.pk.
                    My very humble submission to all fellow engineers that feedback should be in shape of suggestions only. It is a time to contribute and develop harmony for better future of engineering community. I and my whole Governing Body stands united to take engineers service structure from the Government of Pakistan.
                </p><p className="into-p pt_2">
                    ALLAH HUM SUB KA HAMIO NASIR HO.
                </p>
                  <p className="into-p">
                    With best wishes.<br />
                    Engr. Jawed Salim Qureshi<br />
                    Chairman<br />
                    Pakistan Engineering Council
                </p>
                </div>
              </div>
            </div>
            <div className="col-md-1">
            </div>
          </div>
          <br /><br />
        </div>
        <Footer />

      </section>
    </React.Fragment>
  );
}
export default Service;