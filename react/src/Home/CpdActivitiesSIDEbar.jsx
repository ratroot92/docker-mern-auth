import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
class CpdActivitiesSIDEbar extends React.Component {
  constructor() {
    super();
    this.state = {
      icon: '<i class="fas fa-angle-down co_green"></i>',
      path: "",
      flag: false
    };
  }
  componentDidMount() {
    // debugger
    var topPosition = $(".floating-div").offset().top + 450;
    var floatingDivHeight = $(".floating-div").outerHeight();
    var footerFromTop = $("footer").offset().top;
    var absPosition = footerFromTop - floatingDivHeight - 200;
    // console.log(topPosition,floatingDiv,footerFromTop,absPosition)
    var win = $(window);
    var floatingDiv = $(".floating-div");
    win.scroll(function() {
      if (window.matchMedia("(min-width: 768px)").matches) {
        if (win.scrollTop() > topPosition && win.scrollTop() < absPosition) {
          floatingDiv.addClass("sticky");
          floatingDiv.removeClass("abs");
        } else if (
          win.scrollTop() > topPosition &&
          win.scrollTop() > absPosition
        ) {
          floatingDiv.removeClass("sticky");
          floatingDiv.addClass("abs");
        } else {
          floatingDiv.removeClass("sticky");
          floatingDiv.removeClass("abs");
        }
      }
    });
    // var selector = '.sidebar_menu a';
    $(".sidebar_menu").on("click", function() {
      // debugger
      $(".sidebar_menu").removeClass("sub_menu_active");
      $(this).addClass("sub_menu_active");
    });

    // var a=window.location.pathname;
    var a = window.location.href.replace(/.*\/\/[^\/]*/, "");
    this.setState(
      {
        path: a
      },
      () => {
        console.log(this.state.path);
        this.setState({ flag: true });
      }
    );
  }
  icon = () => {
    if (this.state.icon == '<i class="fas fa-angle-down co_green"></i>') {
      this.setState({ icon: '<i class="fas fa-angle-up co_green"></i>' });
    }
    if (this.state.icon == '<i class="fas fa-angle-up co_green"></i>') {
      this.setState({ icon: '<i class="fas fa-angle-down co_green"></i>' });
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="cpdinfo_border floating-div">
          {this.props.data == null || this.props.data == undefined
            ? "This route is not exist"
            : // console.log(this.props.data),
              Object.keys(this.props.data).map(key =>
                // && this.state.flag=="true"
                this.props.data[key].type != "button" ? (
                  <div
                    className={
                      this.state.path.toUpperCase() ==
                      this.props.data[key].url.toUpperCase()
                        ? "sidebar_menu sub_menu_active "
                        : "sidebar_menu"
                    }
                  >
                    {this.props.data[key].type == "a" ? (
                      <a href={this.props.data[key].url}>
                        <div>{this.props.data[key].name}</div>
                      </a>
                    ) : (
                      <Link to={this.props.data[key].url}>
                        <div>{this.props.data[key].name}</div>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="sidebar_menuu_accordian">
                    <a
                      className="btn"
                      data-toggle="collapse"
                      href={"#collapseExample" + this.props.data[key].url}
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                      onClick={this.icon}
                    >
                      {this.props.data[key].name}{" "}
                      <span
                        dangerouslySetInnerHTML={{ __html: this.state.icon }}
                      ></span>
                    </a>
                    <div
                      className="collapse"
                      id={"collapseExample" + this.props.data[key].url}
                    >
                      {this.props.data[key].child.map(keys => (
                        <Link to={keys.url}>
                          <div className="sidebar_menu">
                            <Link to={keys.url} className="">
                              {" "}
                              {keys.name}
                            </Link>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              )}
        </div>

        {/* <div class="cpdinfo_border floating-div"><div><a class="sidebar_menu" href="#">Short Courses Presentation by PEC</a></div><div class="sidebar_menuu_accordian"><a class="btn" data-toggle="collapse" href="#collapseExampleForms" role="button" aria-expanded="false" aria-controls="collapseExample">Forms <span><i class="fas fa-angle-down co_green"></i></span></a><div class="collapse" id="collapseExampleForms"><a href="#"><div class="sidebar_menu"><a class="" href="#"> CPD Resourse Person</a></div></a><a href="#"><div class="sidebar_menu"><a class="" href="#"> EPE Forms </a></div></a><a href="/CPDForms"><div class="sidebar_menu"><a class="" href="/CPDForms"> CPD Forms </a></div></a></div></div><div><a class="sidebar_menu" href="#">Documents</a></div></div>
         */}
      </React.Fragment>
    );
  }
}
export default CpdActivitiesSIDEbar;
