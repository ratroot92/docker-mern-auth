import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import CpdActivitiesSIDEbar from './CpdActivitiesSIDEbar'

class EpEustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
        name: "Introduction to EPE",
        url: "/EPECustom",
        type:"a"
       },
       {
        name: "EPE Mechanism",
        url: "/EPECustom#EPEMechanism",
        type:"a"
       },
       {
        name: "Eligibility Crieteria",
        url: "/EPECustom#EligibilityCrieteriaforEngineeringPracticeExamination",
        type:"a"
       },
       {
        name: "Guidelines for Candidates Appearing in EPE",
        url: "/EPECustom#GuidelinesforCandidatesAppearinginEPE",
        type:"a"
       },
       {
        name: "Curriculum of EPE",
        url: "/EPECustom#EPECurriculaandStudyMaterial",
        type:"a"
       },
       {
        name: "Application Form",
        url: "/EPECustom#ApplicationFormsforEngineeringPracticeExamination",
        type:"a"
       },
       {
        name: "Calculator of CPD Points",
        url: "/EPECustom#CalculatorofCPDPoints",
        type:"a"
       },
       {
        name: "Policy Guidelines for Redressel of EPE",
        url: "/EPECustom#PolicyGuidelinesforRedresselofEPECandidatesApealsComplaintsandGrievances",
        type:"a"
       },

      ]
    }
  }
  componentDidMount(){
    document.title = "EPE";
    window.scrollTo(0, 0);
}
render () {
  return (
    <React.Fragment>
      <section  className="backco_white" style={{ fontFamily: 'Arial' }}>
        <Header />
        <div className="row col_margin">
         <div className="col-md-3 col_padding" style={{ padding: '2%' }}>
         <CpdActivitiesSIDEbar data={this.state.data} />
          </div>
          <div className="col-md-7 col_padding intr_mr">
            <h2 className="text-center" style={{ margin: '28px 0px 0px 1px' }} id="EPECustom">Introduction to EPE</h2>
            <div className="row">
              <div className="col-md-12" col_padding style={{ padding: '2%' }}>
                <div className="into-p">
                  <p>
                  For assessment of competence, knowledge and skills of a Registered Engineer (RE) for elevation towards Professional Engineer (PE), Engineering Practice Examination (EPE) is a constituted part of CPD framework. The EPE is optional for a Registered Engineer but is an essential part of assessment for the title of Professional Engineer for having authority to independently signing the design
                  When a registered engineer has attained a minimum of five years of practical experience in relevant field of engineering from a recognized engineering organization or institution or service and has earned requisite credit points (17 CPD points), he shall become eligible to apply for EPE. For further details and schedule of EPE, please click here.
                </p>
                </div>
                <div className="into-p" id="EPEMechanism">
                      <h4>EPE Mechanism</h4>
                      <ul className="ml_10">
                        <li>
                        Widely circulated schedule of EPE twice a year or in accordance with the frequency revised from time to time through newspapers/ website for submission of appli
                        </li>
                        <li>
                        Verification of pre-requisites and record by CPD Secretariat to finalize the list and issuing Roll Number/ Code, indicating Examination Centre accordingly (via post and email). The roll number/ code shall be used during the examination. A valid CNIC would be required.  </li>
                        <li>
                        EPDC shall be responsible for administering examination at the designated centres. The centres shall be based mainly at Public Sector Engineering Universities/Institutions at a location where reasonable cluster of internet connected computers (about 250 -300) could be available. Security of all the centres shall be ensured through concerned institutions.
                        </li>
                        <li>
                        Both parts (Part-I and Part-II) of the examination shall be held on the same day with ninety minutes break.
                      </li>
                      <li>
                      The EPDC through notified Experts’ Committees shall review the syllabi of EPE from time to time and get prepared the MCQs through Experts’ Committees. Approved MCQs after review shall be added into the MCQs databank.
                      </li>
                      <li>
                      After announcement of each EPE, the Experts’ Committees of relevant engineering disciplines/ specialized areas, as nominated by EPDC, shall prepare MCQ-based examination papers for all engineering disciplines atleast fifteen days before the conduct of examination.
                      </li>
                      <li>
                      EPDC shall appoint the Exam Conveners (from among Governing Body) for overall monitoring of the EPE proceedings in each examination centre, who shall be assisted by the concerned PEC Officials (PEC-18 or above) of Regional/Branch Offices. The concerned institutions of designated EPE Centres shall provide necessary support in this regard for which MoUs shall be made.
                      </li>
                      </ul>
                </div>
                <div className="into-p" id="EligibilityCrieteriaforEngineeringPracticeExamination">
                  <h4>
                  Eligibility Crieteria for Engineering Practice Examination
                  </h4>
                  <ul className="ml_10">
                  <li>
                  5 years of professional experience since registration with PEC till closing date of announcement.
                  </li>
                  <li>
                  17 CPD points since 10th July 2010.
                  </li>
                  </ul>
                  </div>
                  <div className="into-p" id="GuidelinesforCandidatesAppearinginEPE">
                  <h4>
                  Guidelines for Candidates Appearing in EPE
                  </h4>
                  <p>The following instructions/guidelines are mandatory for each candidate appearing in Engineering Practice Examination (EPE).</p>
                  <ul className="ml_10">
                  <li>
                  No candidate is allowed to sit in the exam without the roll no slip, original CNIC, original PEC registration card.
                  </li>
                  <li>
                  The exam shall start at 1000 hours and the candidate should report at the center atleast one hour before start of exam.
                  </li>
                  <li>
                  No candidate shall be allowed to the examination hall once the exam is started.
                  </li>
                  <li>
                  Programmable calculator, laptop, mobile phone, iPod, and any storage device/ electronic gadget are not allowed in examination hall. Only simple calculator is allowed.
                  </li>
                  <li>
                  The exam shall comprise of two parts, and held on the same day viz Part-I (02-hours) and Part-II (03 hours) with 90 minutes break.
                  </li>
                  <li>
                  Qualifying marks for each Part shall be sixty per cent. The candidate shall have to pass each part independently. If any candidate does not qualify in any Part, he shall be eligible to appear in the same part in the next three consecutive examinations. In case of not qualifying or not appearing in the next three consecutive examinations, the candidate shall be declared as not qualified and may appear in both parts.
                  </li>
                  <li>
                  Exam shall be based on Multiple Choice Questions (MCQs).
                  </li>
                  <li>
                  The Part-II of exam shall be open book; only books, bound copies shall be allowed. No loose paper/notes /handouts shall be permissible.
                  </li>
                  <li>
                  The final result shall be communicated through PEC website followed by post mail.
                  </li>
                  <li>
                  No candidate shall indulge to influence the examination process as well as the examination staff, and responsible(s) shall be disqualified.
                  </li>
                  <li>
                No candidate is allowed to indulge in any Law and Order situation to affect the exam process.
                  </li>
                   </ul>
                  </div>
                  <div className="into-p" id="EPECurriculaandStudyMaterial">
                  <h4>
                  EPE Curricula and Study Material
                </h4>
                <ul className="ml_10">
        <br />
        <li><a className="co_green" target="_blank"  href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/EPE Syllabus of Part-I (Common to All Engineering Disciplines)1.pdf">
            EPE Syllabus of Part-I (Common to All Engineering Disciplines)</a></li>
        <a className="co_green" target="_blank" href="downloads/cpd/Part-I (Common to All Engg Disciplines).pdf">
          Sample MCQs of Part-I (Common to All Engineering Disciplines)</a>
        <br /><br />
        <li>
          <a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/EPE Syllabus for Electrical and Allied Disciplines1.pdf">
            EPE Syllabus of Electrical and Allied Disciplines </a>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Electrical/Avionics Engineering.pdf">Sample MCQs of Avionics Engineering</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Electrical/Biomedical Engineering.pdf">Sample MCQs of Biomedical Engineering</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Electrical/Computer Engineering.pdf">Sample MCQs of Computer Engineering</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Electrical/Electric Power.pdf">Sample MCQs of Electric Power</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Electrical/Electronic Engineering.pdf">Sample MCQs of Electronic Engineering</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Electrical/Engineering Sciences.pdf">Sample MCQs of Engineering Sciences</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Electrical/Industrial Electronics.pdf">Sample MCQs of Industrial Electronics</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Electrical/Mechatronics Engineering.pdf">Sample MCQs of Mechatronics Engineering</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Electrical/Telecommunication Engineering.pdf">Sample MCQs of Telecommunication Engineering</a></li>
        </li>
        <br />
        <li>
          <a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/EPE Syllabus of Civil Engg& Allied Discipline1.pdf">
            EPE Syllabus of Civil Engg &amp; Allied Discipline</a>
        
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Civil/Building and Architecture Engineering.pdf">Sample MCQs of Building and Architecture Engineering</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Civil/Construction Management.pdf">Sample MCQs of Construction Management</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Civil/Environmental Engineering.pdf">Sample MCQs of Environmental Engineering</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Civil/Geotechnical.pdf">Sample MCQs of Geotechnical</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Civil/Structures.pdf">Sample MCQs of Structures</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Civil/Transportation Engineering.pdf">Sample MCQs of Transportation Engineering</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Civil/Urban Engineering.pdf">Sample MCQs of Urban Engineering</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Civil/Water Resources.pdf">Sample MCQs of Water Resources</a></li>
       
        </li>
        <br />
        <li>
          <a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/EPE Syllabus of Agricultural Engg1.pdf">
            EPE Syllabus of Agricultural Engg</a>
         
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Agricultural/Agricultural Engineering (Environmental Engineering).pdf">Sample MCQs of Agricultural Engineering (Environmental Engineering)</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Agricultural/Energy in Agriculture.pdf">Sample MCQs of Energy in Agriculture</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Agricultural/Irrigation and Drainage Engineering.pdf">Sample MCQs of Irrigation and Drainage Engineering</a></li>
            <li>S<a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Agricultural/Machine Systems Engineering.pdf">Sample MCQs of Machine Systems Engineering</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Agricultural/Process Engineering.pdf">Sample MCQs of Process Engineering</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Agricultural/Water Resources Development and Management.pdf">Sample MCQs of Water Resources Development and Management</a></li>
         
        </li>
        <br />
        <li>
          <a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/EPE Syllabus of Material & Metallurgical Engg1.pdf">
            EPE Syllabus of Material &amp; Metallurgical Engg</a>
        
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Metallurgy/Advanced Materials.pdf">Sample MCQs of Advanced Materials</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Metallurgy/Foundry Engineering.pdf">Sample MCQs of Foundry Engineering</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Metallurgy/Metallurgy and Materials Engineering.pdf">Sample MCQs of Metallurgy and Materials Engineering</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Metallurgy/Nanotechnology.pdf">Sample MCQs of Nanotechnology</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Metallurgy/Surface Engineering.pdf">Sample MCQs of Surface Engineering</a></li>
       
        </li>
        <br />
        <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/EPE Syllabus of Mechanical Engg & Allied Disciplines1.pdf">
            EPE Syllabus of Mechanical Engg &amp; Allied Disciplines</a>
       
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Mechanical/Aeronautical Engineering (Aerospace only).pdf">Sample MCQs of Aeronautical Engineering (Aerospace only)</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Mechanical/Control Engineeirng.pdf">Sample MCQs of Control Engineeirng</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Mechanical/Design Engineeirng.pdf">Sample MCQs of Design Engineeirng</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Mechanical/Manufacturing Engineeirng.pdf">Sample MCQs of Manufacturing Engineeirng</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Mechanical/Thermo Fluids.pdf">Sample MCQs of Thermo Fluids</a></li>
        
        </li>
        <br />
        <li>
          <a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/EPE Syllabus of Chemical Engg1.pdf">
            EPE Syllabus of Chemical &amp; Polymer Engg</a></li>
      
          <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Chemical/Biochemcial Engineering.pdf">Sample MCQs of Biochemcial Engineering</a></li>
          <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Chemical/Corrosion Engineering.pdf">Sample MCQs of Corrosion Engineering</a></li>
          <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Chemical/Energy Engineering.pdf">Sample MCQs of Energy Engineering</a></li>
          <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Chemical/Environment and Process Safety Engineering.pdf">Sample MCQs of Environment and Process Safety Engineering</a></li>
          <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Chemical/Instrumentation and Control Engineering.pdf">Sample MCQs of Instrumentation and Control Engineering</a></li>
          <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Chemical/Operation and Production Engineering.pdf">Sample MCQs of Operation and Production Engineering</a></li>
          <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Chemical/Polymer Engineering.pdf">Sample MCQs of Polymer Engineering</a></li>
          <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Chemical/Process Synthesis, Design and Optimization.pdf">Sample MCQs of Process Synthesis, Design and Optimization</a></li>
          <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Chemical/Separation Process Engineering.pdf">Sample MCQs of Separation Process Engineering</a></li>
          <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Chemical/Thermal Hydraulics.pdf">Sample MCQs of Thermal Hydraulics</a></li>
          <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Chemical/Utilities and Services Engineering.pdf">Sample MCQs of Utilities and Services Engineering</a></li>
      
        <br />
        <li>
          <a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/EPE Syllabus of Mining Engg1.pdf"> EPE Syllabus of Mining Engg</a>
          
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Mine Management and Regulatory Regime.pdf">Sample MCQs of Mine Management and Regulatory Regime</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Mine Rescue and Safety Engineering.pdf">Sample MCQs of Mine Rescue and Safety Engineering</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Query_Open Pit Development and Operation.pdf">Sample MCQs of Query_Open Pit Development and Operation</a></li>
            <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Textile Underground Mining Operation and Development.pdf">Sample MCQs of Underground Mining Operation and Development</a></li>
      
        </li>
        <br />
        <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/EPE Syllabus of Textile Enginering1.pdf">
            EPE Syllabus of Textile Engg
          </a>
          <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/Textile Engineering.pdf">Sample MCQs of Textile Engg</a></li>
        </li>
        <br />
        <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/EPE Syllabi/EPE Syllabus of Petro-Gas Engineering1.pdf">
            EPE Syllabus of Petro-Gas Engineering</a></li>
      </ul>
           </div>

           <div className="into-p" id="ApplicationFormsforEngineeringPracticeExamination">
                  <h4>
                  Application Forms for Engineering Practice Examination
                </h4>
                <ul className="ml_10">
                    <li><a className="co_green" target="_blank" href="downloads/Application Form_EPE_for Not Qualified Candidates.docx">Application Form_EPE_for Not Qualified Candidates&nbsp;</a></li>
                    <li><a className="co_green" target="_blank" href="downloads/Application Form for New EPE Applicants (003).docx">Application Form for New EPE Applicants&nbsp;</a></li>
                   </ul>
                  </div>
                  <div className="into-p" id="CalculatorofCPDPoints">
                  <h4>
                  Calculator of CPD Points
                </h4>
                <ul className="ml_10">
                    <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/13th EPE Exam/Calculator of CPD Points.xls">Calculator of CPD Points</a></li>
                    </ul>
                  </div>
                  <div className="into-p" id="PolicyGuidelinesforRedresselofEPECandidatesApealsComplaintsandGrievances">
                  <h4>
                  Policy Guidelines for Redressel of EPE Candidates Apeal's, Complaints and Grievances
                </h4>
                <ul className="ml_10">
                    <li><a className="co_green" target="_blank" href="https://www.pec.org.pk/downloads/cpd/13th EPE Exam/Policy Guidelines for Redressal of EPE Candidates' Appeals, Complaints and Grievances.docx">
                    Policy Guidelines for Redressel of EPE Candidates Apeal's, Complaints and Grievances
                      </a></li>
                    </ul>
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
export default EpEustom;