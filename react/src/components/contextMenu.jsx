import React, { Component } from "react";
class ContextMenu extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          className={
            this.props.showMenu +
            " col-md-12 lrp-5p pop-up-context-course-parent  "
          }
        >
          <div className="pop-up-context-course ">
            <div className=" ptb-10">
              <div className="menu-row-title">Collections</div>
              <div className=" menu-row-item ">
                <span> Instructor Collection</span>
                <span className="float-right">
                  {" "}
                  <i className="fa fa-check clr-red" />
                </span>
              </div>
              <div className=" menu-row-item ">
                <span> Personal Collection</span>
                <span className="float-right hide">
                  {" "}
                  <i className="fa fa-check clr-red" />
                </span>
              </div>
              <hr className="bm-0 tm-0" />
              <div className=" menu-row-item ">
                <span> Extend Subscription</span>
              </div>
              <hr className="bm-0 tm-0" />
              <div className=" menu-row-item ">
                <span className="">
                  {" "}
                  <i className="fa fa-star clr-gold" />
                </span>{" "}
                &nbsp;
                <span> Favourite</span>
              </div>
              <div className=" menu-row-item ">
                <span className="">
                  {" "}
                  <i className="fa fa-archive " />
                </span>{" "}
                &nbsp;
                <span> Archive</span>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ContextMenu;
