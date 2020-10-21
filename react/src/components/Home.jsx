import React, { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Navigation from "./Navigation";
import LTR from "./LTR";
import { db } from "../firebase/firebase";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";
import InfiniteCarousel from "react-leaf-carousel";
import "../assets/css/homepage.css";
// import "../assets/css/App.css";
class Home extends Component {
  constructor(props) {
    super(props);
}
  state = {
    event: null,
    t1: " active",
    t2: "",
    t3: "",
    tClass: " courseBG_1 ",
    slider: null,
    posts: [],
    diplaySlider: false
  };
  onChange(value) {}
  activate(value) {
    if (value == 1) {
      this.setState({ t1: "active", t2: "", t3: "", tClass: " courseBG_1" });
    } else if (value == 2) {
      this.setState({ t1: "", t2: "active", t3: "", tClass: " courseBG_2" });
    } else if (value == 3) {
      this.setState({ t1: "", t2: "", t3: "active", tClass: " courseBG_3" });
    }
  }
  componentDidMount() {
    //return

    this.setState({ t1: "active", t2: "", t3: "" });

    db.ref(`event`)
      .once("value")
      .then(snapshot => {
        this.setState({ event: snapshot.val() });
      });
  }
  render() {
    return (
      <React.Fragment>
        <Navigation />
      
     
      </React.Fragment>
    );
  }
}

export default Home;

class Tabs extends Component {
  state = { selected: this.props.selected };

  setSelected(selected) {
    if (selected !== this.state.selected) {
      this.setState({ selected });
    }
  }

  handleClick(tab) {
    return () => this.setSelected(tab);
  }

  renderTabList(child) {
    let tab = 0;

    return React.cloneElement(child, {
      children: React.Children.map(child.props.children, childTab => {
        if (childTab.type.name === "Tab") {
          const _isActive = tab === this.state.selected;
          const _onClick = this.handleClick(tab);

          tab++;

          return React.cloneElement(childTab, { _isActive, _onClick });
        }

        return childTab;
      })
    });
  }

  renderChildren(children) {
    let panel = 0;

    return React.Children.map(children, child => {
      if (child.type.name === "TabList") {
        return this.renderTabList(child);
      }

      if (child.type.name === "TabPanel") {
        const _isActive = panel === this.state.selected;

        panel++;

        return React.cloneElement(child, { _isActive });
      }

      return child;
    });
  }

  render() {
    return (
      <div className="Tabs">{this.renderChildren(this.props.children)}</div>
    );
  }
}
