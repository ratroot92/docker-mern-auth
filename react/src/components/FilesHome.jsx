import React, { Component } from "react";
import MultiFileUpload from "./MultiFileUpload";
import FileExplorer from "./FileExplorer";
import { db } from "../firebase/firebase";

var uploaded = 0;
class FilesHome extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    // isUpdate: false
  };
  // onUpload = data => {
  //   db.ref("courseFileListing/" + this.props.keyProp)
  //     .push({
  //       name: data.fileName,
  //       url: data.url,
  //       type: data.type
  //     })
  //     .then(() => {
  //       if (data.totalUploaded == data.total) {
  //         this.updateListing();
  //         uploaded = 0;
  //       }
  //     });
  // };

  // updateListing = () => {
  //   this.setState({ isUpdate: true });
  // };
  // updateProcessed = () => {
  //   this.setState({ isUpdate: false });
  // };
  render() {
    return (
      <React.Fragment>
        <div>
        {/* <div className=" col-md-12">
          <div className="row">
            <div className="col-md-5">
              <h5 className="card-title regular_font">Free Course Content</h5>
              <div className="col lrp-0">
                <span>
                  <b>Course title:</b>
                  {this.state.courseTitle != undefined
                    ? " (" + this.state.courseTitle + ")"
                    : ""}
                </span>
              </div>
            </div>
            <div className="col-md-7 lrp-0">
              <button className="btn btn-white fix_width_btn  btn-transparent black admin-btn">
                Preview
              </button>{" "}
              &nbsp;
              <button
                className="btn btn-white fix_width_btn btn-transparent black bold fz_14"
                onClick={this.saveFree}
              >
                Save
              </button>
              &nbsp;
            </div>
          </div>
        </div>
        <hr />
        <div className=" col-md-12 ">
          <MultiFileUpload
            storageRef={"courseFiles/" + this.props.keyProp}
            keyProp={this.props.keyProp}
            updateListing={this.updateListing}
            onUpload={this.onUpload}
          />

          <FileExplorer
            keyProp={this.props.keyProp}
            isUpdate={this.state.isUpdate}
            updateProcessed={this.updateProcessed}
          />
        </div> */}
</div>



        <div className=" col-md-12">
          <div className="row">
            <div className="col-md-5">
              <h4 className="card-title bold regular_font">Pricing Plan Detail</h4>
              <div className="col lrp-0">
                <span>
                  {/* <b>Course title:</b>
                  {this.state.courseTitle != undefined
                    ? " (" + this.state.courseTitle + ")"
                    : ""} */}
                </span>
              </div>
            </div>
            <div className="col-md-7 lrp-0">
              &nbsp;
              <button
                className="btn btn-white fix_width_btn btn-transparent black bold fz_14"
                onClick={this.saveForm}
                {...(this.state.allowSave
                  ? { disabled: false }
                  : { disabled: true })}
              >
                Save
              </button>
              &nbsp;
              {this.state.contentType != null &&
              this.state.courseType == "1" ? (
                <button
                  className="btn admin-btn-green btn-whitefix_width_btn white fz_13 bold"
                  disabled="true"
                >
                  Create New Section
                </button>
              ) : (
                <button
                  className="btn admin-btn-green btn-whitefix_width_btn white fz_13 bold"
                  onClick={this.addSection}
                >
                  Create New Section
                </button>
              )}
            </div>
          </div>
        </div>
        <hr />

        <div className="row">
                    <div className="col-md-2"></div>
                      <div className="col-md-8">
                      <form>
                        <div className="mb-3">
                                <label htmlFor="validationDefault01">Type<span className="co_red">*</span></label>
                                 <div className="fz_16">
                                            <select value={this.state.discipline} id="validationDefault01" onChange={this.statechange} name="query" className="form-control co_black">
                                                <option>Choose Type </option>
                                                <option>Free</option>
                                                <option>One Time Purchase</option>
                                            </select>
                                        </div>      
                                </div>
                           <div className="mb-3">
                                <label htmlFor="validationDefault02">Plan Name<span className="co_red">*</span></label>
                               <input type="text" className="form-control fz_16" id="validationDefault02" placeholder="Enter plan name"  required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="validationDefault03">Price<span className="co_red">*</span></label>
                               <input type="number" className="form-control fz_16" id="validationDefault03" placeholder="0"  required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="validationDefault04">Discount<span className="co_red">*</span></label>
                               <input type="number" className="form-control fz_16" id="validationDefault04" placeholder="0"  required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="validationDefault04">Description<span className="co_red">*</span></label>
                                <textarea className="form-control fz_16" id="validationDefault04" placeholder="Enter detailed description" rows={5} required />
                            </div>
                       </form>
                      </div>
                      <div className="col-md-2"></div>
                    </div>



















      </React.Fragment>
    );
  }
}

export default FilesHome;
