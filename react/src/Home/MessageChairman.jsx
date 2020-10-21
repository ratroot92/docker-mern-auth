import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CPDInfoSideBar from './CPDInfoSideBar'

function MessageChairMan() {
    return (
        <React.Fragment>
            <section  className="backco_white" style={{ fontFamily: 'Arial' }}>
                <Header />
                <div className="row col_margin">
                    <div className="col-md-1">
                    </div>
                    <div className="col-md-3 col_padding" style={{ padding: '2%' }}>
                        <CPDInfoSideBar />
                    </div>
                    <div className="col-md-7 col_padding intr_mr">
                        <h2 className="text-center" style={{ margin: '28px 0px 0px 1px' }}>My Dear Engineers,</h2>
                        <div className="row">
                            <div className="col-md-6" col_padding style={{ padding: '2%' }}>
                                <div className="into-p">
                                    <p>
                                        "Pakistan" has been declared as "Full Signatory" of the Washington Accord. A highest prestigious international forum of International Engineering Alliance, in its General Assembly Meeting held in USA on 21st june 2017
                                     </p>
                                </div>
                                <div className="into-p">
                                    <p>
                                        PEC was representing the country to attain full signatory status of WA since 2011.Washington Accord is a highly rigorous global standard on engineering education and accreditation system which grants substantial equivalence of degrees; means international recognition to equate at par with top leading signatory countries of the world.To give benefit to across border mobility of engineers
                                          </p>
                                </div>
                                <div className="into-p">
                                    <p>
                                        The process of accreditation of an applicant country is to check its quality of engineering education and competency of engineers .It is judged through representative of reviews by at least 3 to 5 signatory countries. It is their set criteria to observe implimentation of Outcome-based education system in the applicant economy. Pakistan gone through all these reviews.Final review by 3 signatories namely Newzealand, UK, and South Korea was taken place in last year. Review report was on agenda of the meeting held in June 2017 of WA/ IEA at Anchorage USA.Where PEC defended the case for Pakistan in different meetings of WA/IEA and finally declared as full signatory unanimously.The decision was taken by the singatories in a close session.
                                </p>
                                </div>
                                <div className="into-p">
                                    <p>
                                        It is pertinent to note that admission into WA is so rigorous that only 18 countries has got this status in last 25 years. Pakistan enter into signatory status as 19th country and 3rd Islamic country after Malaysia &amp; Turkey. Certainly it has been a great achievement and honor for the nation, particularly the engineering profession and universities accredited by PEC under WA status . Engineers registered with PEC under this category of HEIs will be considered at par as world class competent professionals and will not be evaluated for any migrational assessment for their degrees and will be eligible for professional jobs outside in developed countries.
                                     </p>
                                </div>
                            </div>
                            <div className="col-md-6" col_padding style={{ padding: '2%' }}>
                                <div className="into-p">
                                    <p>
                                        Also Engineering Consultant Companies working abroad may hire local Engr's registered with PEC. This achievement has not been possible without the support of task force comprising of senior professionals.Prof Dr Naiz Ahmad key role in line with a pivotal/driving role of Engr Dr Nasir Mahmood khan, Head Accreditation Division of PEC was commendable.
                                   </p>
                                </div>
                                <div className="into-p">
                                    <p>
                                        The hard work done by the committee to upgrade all the standards and accreditation process coupled with preparedness of HEIs for the periodic reviews by WA signatories .It had made this journey to accomplish the highest milestone of global recognition by Washington Accord. The chairman PEC congratulate the whole engineering community, Governing body, PEC management, the Convener EAQEC and his team particulary the consistent hard work of Accreditation Division lead by Dr Nasir khan over the last few years.
                                </p>
                                </div>
                                <div className="into-p">
                                    <p>
                                        He added that PEC is carrying out various such initiatives to play its leading role within and outside the country to keep the national flag high and to earn highest professional repute while regulating engineering profession in the country. He further added that this award will provide not only confidence to students, HEIs, but also develop trust of foreign engineering companies to work jointly in Pakistan.
                                 </p>
                                </div>
                                <div className="into-p">
                                    <p>
                                        Again it will give for reaching impact of creation of jobs within the country with international groups. He mentioned this event as a landmark in the history of Pakistan .Insha Allah coming generation will feel proud on it and PEC recognition in country and abroad will be seen as a highest forum of accrediting a quality HEI,s.
                                  </p>
                                </div>
                                <div>
                                    <p align="into-p"><b>We are working for "Proud to be Engineer".</b></p>
                                    <p align="into-p"><b>With best regards,</b></p>
                                    <p><b><strong>(Engr. Jawed Salim Qureshi)<br />
                                    </strong>Chairman
                            <br />
                                        Pakistan Engineering Council</b></p>
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
export default MessageChairMan;