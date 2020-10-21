import React, { Component } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNav from "./AdminNav";
// import { db } from "../firebase/firebase";
import WebNotif from "../WebNotif";
import Loader from "../loader";
import Unauthorized from "../Unauthorized";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const { SearchBar, ClearSearchButton } = Search;
const columns = [
  {
    dataField: "tag",
    text: "Tag"
  }
];
var obj = new WebNotif();
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});
class ManageCT extends Component {
  state = {
    tagTabColor: "bb_red",
    categoryTabColor: "bb_grey",
    tag: "",
    cat: "",
    category: "",
    tagTab: "",
    categoryTab: "hide",
    tagList: null,
    subCat: [{ text: "", value: true, index: 0 }],
    subTag: [{ text: "", value: true, index: 0 }],
    showLoader: true,
    tags: [],
    isEdit: false,
    isEditCat: false,
    catList: null
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (
      !(this.props.permissions != undefined && this.props.permissions["read"])
    ) {
      this.setState({ redirect: true });
      return;
    } else {
      // db.ref(`Tags`)
      //   .once("value")
      //   .then(snapshot => {
      //     {
      //       //var tags = [];
      //       this.setState({ tagList: snapshot.val() });

      //       this.setState({ showLoader: false });
      //     }
      //   });
      // db.ref(`categories`)
      //   .once("value")
      //   .then(snapshot => {
      //     {
      //       this.setState({ catList: snapshot.val() });
      //     }
      //   });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.tagList !== prevState.tagList) {
      window.$("#admin-tags-table").DataTable({
        destroy: true,
        pageLength: 10,
        searching: false
      });
    }
    if (this.state.catList !== prevState.catList) {
      window.$("#admin-categories-table").DataTable({
        destroy: true,
        pageLength: 10,
        searching: false
      });
    }
  }

  tabActive = activeOption => {
    if (activeOption == 1) {
      this.setState({
        tagTabColor: "bb_red",
        categoryTabColor: "bb_grey",
        tagTab: "",
        categoryTab: "hide"
      });
    } else {
      if (this.props.userId == null) {
        obj.createNotification("warning", "Login to check out");
        this.setState({ loginRequest: true });

        return;
      }
      this.setState({ loginRequest: false });

      this.setState({
        tagTabColor: "bb_grey",
        categoryTabColor: "bb_red",
        tagTab: "hide",
        categoryTab: ""
      });
    }
  };
  // addTag = () => {
  //   //var newKey = db.ref("coupon").push().key;
  //   var temp_tag = { ...this.state.tagList };
  //   temp_tag[this.state.tag] = { All: 0 };
  //   db.ref("Tags/" + this.state.tag).set({ All: 0 });
  //   for (var i = 0; i < this.state.subTag.length - 1; i++) {
  //     db.ref("Tags/" + this.state.tag + "/" + this.state.subTag[i].text).set(0);
  //     temp_tag[this.state.tag][this.state.subTag[i].text] = 0;
  //   }
  //   this.setState({ tagList: temp_tag });
  //   this.setState({
  //     tag: "",
  //     subTag: [{ text: "", value: true, index: 0 }]
  //   });
  //   if (this.state.isEdit == true) {
  //     this.setState({ isEdit: false });
  //     obj.createNotification("success", "Tag Updated ");
  //   } else {
  //     obj.createNotification("success", "Tag Added ");
  //   }
  // };
  // addCat = () => {
  //   var temp_cat = { ...this.state.catList };
  //   temp_cat[this.state.category] = { All: 0 };
  //   db.ref("categories/" + this.state.category).set({ All: 0 });
  //   for (var i = 0; i < this.state.subCat.length - 1; i++) {
  //     db.ref(
  //       "categories/" + this.state.category + "/" + this.state.subCat[i].text
  //     ).set(0);
  //     temp_cat[this.state.category][this.state.subCat[i].text] = 0;
  //   }
  //   this.setState({ catList: temp_cat });
  //   this.setState({
  //     category: "",
  //     subCat: [{ text: "", value: true, index: 0 }]
  //   });
  //   if (this.state.isEditCat == true) {
  //     this.setState({ isEditCat: false });
  //     obj.createNotification("success", "Category Updated ");
  //   } else {
  //     obj.createNotification("success", "Category Added ");
  //   }
  // };
  // deleteTag = key => {
  //   confirmAlert({
  //     title: "Confirm to submit",
  //     message: "Are you sure to do this.",
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: () => {
  //           db.ref(`Tags/${key}/All`)
  //             .once("value")
  //             .then(snapshot => {
  //               if (snapshot.val() > 0) {
  //                 obj.createNotification(
  //                   "error",
  //                   "Questions Exist for this Tag"
  //                 );
  //               } else {
  //                 db.ref("Tags/" + key).set(null);
  //                 var temp_tag = { ...this.state.tagList };
  //                 delete temp_tag[key];
  //                 this.setState({ tagList: temp_tag });
  //                 obj.createNotification("success", "Tag Deleted ");
  //               }
  //             });
  //         }
  //       },
  //       {
  //         label: "No",
  //         onClick: () => {}
  //       }
  //     ]
  //   });
  // };
  // deleteCat = key => {
  //   confirmAlert({
  //     title: "Confirm to submit",
  //     message: "Are you sure to do this.",
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: () => {
  //           db.ref(`categories/${key}/All`)
  //             .once()
  //             .then(snapshot => {
  //               if (snapshot.val() > 0) {
  //                 obj.createNotification(
  //                   "error",
  //                   "Courses Exist for this Category"
  //                 );
  //               } else {
  //                 db.ref("categories/" + key).set(null);
  //                 var temp_cat = { ...this.state.catList };
  //                 delete temp_cat[key];
  //                 this.setState({ catList: temp_cat });
  //                 obj.createNotification("success", "Category Deleted ");
  //               }
  //             });
  //         }
  //       },
  //       {
  //         label: "No",
  //         onClick: () => {}
  //       }
  //     ]
  //   });
  // };
  // addSubCatText = (index, data) => {
  //   var subCat = [...this.state.subCat];
  //   var len = subCat.length;
  //   if (len == index + 1) {
  //     subCat.push({ index: len, value: false, text: "" });
  //     this.setState({ subCat });
  //   }
  //   subCat[index].text = data;
  //   this.setState({ subCat });
  // };
  // addSubTagText = (index, data) => {
  //   var newSubtags = [];
  //   var subTags = [...this.state.subTag];
  //   var len = subTags.length;
  //   subTags[index].text = data;

  //   for (let subTag of subTags) {
  //     if (subTag.text.trim().length !== 0 && subTag.index + 1 !== len) {
  //       newSubtags.push(subTag);
  //     }
  //   }

  //   if (len == index + 1) {
  //     newSubtags.push({ index: len, value: false, text: "" });
  //     this.setState({ subTag: newSubtags });
  //   }

  //   this.setState({ subTag: newSubtags });
  // };
  // updateTag = key => {
  //   this.setState({ tag: key });
  //   var temp = [];
  //   Object.keys(this.state.tagList[key]).map(subkey => {
  //     temp.push({ text: subkey, value: true });
  //     //this.setState({ subCat: { text: this.state.tagList[key], value: true } });
  //   });
  //   temp.push({ text: "", value: true });
  //   this.setState({ subTag: temp, isEdit: true });
  // };
  // updateCat = key => {
  //   this.setState({ category: key });
  //   var temp = [];
  //   Object.keys(this.state.catList[key]).map(subkey => {
  //     temp.push({ text: subkey, value: true });
  //     //this.setState({ subCat: { text: this.state.tagList[key], value: true } });
  //   });

  //   temp.push({ text: "", value: true });
  //   this.setState({ subCat: temp, isEdit: true });
  // };
  // cancelCat = () => {
  //   this.setState({
  //     category: "",
  //     subCat: [{ text: "", value: true, index: 0 }],
  //     isEditCat: false
  //   });
  // };

  // cancelTag = () => {
  //   this.setState({
  //     tag: "",
  //     subTag: [{ text: "", value: true, index: 0 }],
  //     isEdit: false
  //   });
  // };

  render() {
    return (
      <React.Fragment>
        {this.state.redirect ? (
          <Unauthorized />
        ) : (
          <React.Fragment>
            <AdminNav />
            <WebNotif />
            <div className="col-md-12">
              <div className="row">
                <AdminSidebar />
                <br />
                <br />
                <div className="col lrp-50 ptb-30 ">
                  <div className="admin-card card">
                    <div className="card-body">
                      <div className="container">
                        <div className=" col-md-12">
                          <div className="row">
                            <div className="col-md-7">
                              <h5 className="card-title regular_font">
                                Manage Tag
                              </h5>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="row d-flex justify-content-center">
                          <div
                            className="col-md-2 text-center pointer"
                            onClick={() => this.tabActive(1)}
                          >
                            <p className="mb-0_5">Tag</p>
                            <div className={this.state.tagTabColor} />
                          </div>
                          <div
                            className=" col-md-2 text-center enbale-pointer-event pointer"
                            onClick={() => this.tabActive(2)}
                          >
                            <p className="mb-0_5">Category</p>
                            <div className={this.state.categoryTabColor} />
                          </div>
                        </div>
                        <div className={this.state.tagTab}>
                          {this.props.permissions["add"] ||
                          this.state.isEdit ? (
                            <div>
                              <label>Tag</label>
                              <input
                                type="text"
                                placeholder="Enter tag"
                                className="form-control fs-12"
                                value={this.state.tag}
                                onChange={event =>
                                  this.setState(
                                    byPropKey("tag", event.target.value)
                                  )
                                }
                              />
                              <br />
                              {Object.keys(this.state.subTag).map(
                                (key, idx) => (
                                  <input
                                    type="text "
                                    placeholder="Enter sub tag"
                                    className="form-control mtb-10 fs-12"
                                    value={this.state.subTag[key].text}
                                    onChange={event =>
                                      this.addSubTagText(
                                        idx,
                                        event.target.value
                                      )
                                    }
                                  />
                                )
                              )}
                              <div className="row">
                                <div className="col-md-2">
                                  <button
                                    className="btn btn-green fs-12 mtb-10"
                                    // onClick={this.addTag}
                                  >
                                    Save
                                  </button>
                                </div>
                                {this.state.isEdit == true ? (
                                  <div className="col-md-2">
                                    <button
                                      className="btn btn-red fs-12 mtb-10 white"
                                      // onClick={this.cancelTag}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          <br />
                          <div>
                            <table
                              id="admin-tags-table"
                              className="table table-hover"
                            >
                              <thead className="text-center">
                                <tr>
                                  <th>Tags</th>
                                  <th>Sub Tags</th>
                                  <th>Update</th>
                                  <th>Delete</th>
                                </tr>
                              </thead>
                              <tbody className="text-center">
                                {this.state.tagList == null ? (
                                  <tr>
                                    <td colSpan="4">No Data Available</td>
                                  </tr>
                                ) : (
                                  Object.keys(this.state.tagList).map(key => (
                                    <tr>
                                      <td>
                                        {this.state.tagList == null ? "-" : key}
                                      </td>
                                      <td>
                                        {Object.keys(
                                          this.state.tagList[key]
                                        ).map(subkey => (
                                          <span className="badge badge-light fs-14">
                                            {subkey}
                                          </span>
                                        ))}
                                      </td>
                                      <td>
                                        {this.props.permissions["update"] ? (
                                          <i
                                            className="fa fa-floppy-o clr-darkpurple pointer"
                                            aria-hidden="true"
                                            // onClick={() => this.updateTag(key)}
                                          />
                                        ) : (
                                          <i className="fa fa-floppy-o clr-darkpurple pointer disabled" />
                                        )}
                                      </td>
                                      <td>
                                        {this.props.permissions["delete"] ? (
                                          <i
                                            className="fa fa-trash clr-darkpurple pointer"
                                            aria-hidden="true"
                                            // onClick={() => this.deleteTag(key)}
                                          />
                                        ) : (
                                          <i className="fa fa-trash clr-darkpurple pointer disabled" />
                                        )}
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className={this.state.categoryTab}>
                          {this.props.permissions["add"] ||
                          this.state.isEditCat ? (
                            <div>
                              <label>Category</label>
                              <input
                                type="text"
                                placeholder="Enter category"
                                className="form-control"
                                value={this.state.category}
                                onChange={event =>
                                  this.setState(
                                    byPropKey("category", event.target.value)
                                  )
                                }
                              />
                              <br />
                              {Object.keys(this.state.subCat).map(
                                (key, idx) => (
                                  <input
                                    type="text "
                                    placeholder="Enter sub tag"
                                    className="form-control mtb-10 fs-12"
                                    value={this.state.subCat[key].text}
                                    onChange={event =>
                                      this.addSubCatText(
                                        idx,
                                        event.target.value
                                      )
                                    }
                                  />
                                )
                              )}

                              <div className="row">
                                <div className="col-md-2">
                                  <button
                                    className="btn btn-green fs-12 mtb-10"
                                    // onClick={this.addCat}
                                  >
                                    Save
                                  </button>
                                </div>
                                {this.state.isEditCat == true ? (
                                  <div className="col-md-2">
                                    <button
                                      className="btn btn-red fs-12 mtb-10 white"
                                      // onClick={this.cancelCat}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          <div>
                            <table
                              id="admin-categories-table"
                              className="table table-hover"
                            >
                              <thead className="text-center">
                                <tr>
                                  <th>Category</th>
                                  <th>Sub Category</th>
                                  <th>Update</th>
                                  <th>Delete</th>
                                </tr>
                              </thead>
                              <tbody className="text-center">
                                {this.state.catList == null ? (
                                  <tr>
                                    <td colSpan="4">No Data Available</td>
                                  </tr>
                                ) : (
                                  Object.keys(this.state.catList).map(key => (
                                    <tr>
                                      <td>
                                        {this.state.catList == null ? "-" : key}
                                      </td>
                                      <td>
                                        {Object.keys(
                                          this.state.catList[key]
                                        ).map(subkey => (
                                          <span className="badge badge-light fs-14">
                                            {subkey}
                                          </span>
                                        ))}
                                      </td>
                                      <td>
                                        {this.props.permissions["update"] ? (
                                          <i
                                            className="fa fa-floppy-o clr-darkpurple pointer"
                                            aria-hidden="true"
                                            // onClick={() => this.updateCat(key)}
                                          />
                                        ) : (
                                          <i className="fa fa-floppy-o clr-darkpurple pointer disabled" />
                                        )}
                                      </td>
                                      <td>
                                        {this.props.permissions["delete"] ? (
                                          <i
                                            className="fa fa-trash clr-darkpurple pointer"
                                            aria-hidden="true"
                                            // onClick={() => this.deleteCat(key)}
                                          />
                                        ) : (
                                          <i className="fa fa-trash clr-darkpurple pointer disabled" />
                                        )}
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <Loader showLoader={this.state.showLoader} /> */}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default ManageCT;
