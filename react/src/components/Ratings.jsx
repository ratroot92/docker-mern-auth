import React, { Component } from "react";
import Rating from "react-rating";
import { db } from "../firebase/firebase";
import Modal from "react-responsive-modal";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});
class Ratings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      value: 0,
      canRate: false,
      review: "",
      ModalOpenReview: false,
      starRating: null
    };

    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.setState({
      canRate: this.props.readonly,
      textWhite: this.props.textWhite
    });
    let courseId = this.props.courseId;
    if (this.props.data != undefined) {
      this.setState({
        value: this.props.data.Score
      });
    }
    if (this.props.courseId != undefined) {
      db.ref("courses/" + courseId + "/CourseRating")
        .once("value")
        .then(snapshot => {
          if (snapshot.val() != null) {
            if (snapshot.val().Score == null) {
              this.setState({ value: 0, total: 0 });
            } else {
              this.setState({
                value: snapshot.val().Score,
                total: snapshot.val().Total
              });
            }
          }
        });
    }
    if (
      this.props.userId !== null ||
      this.props.userId !== undefined ||
      !this.props.readonly
    ) {
      db.ref("userRating/" + courseId + "/" + this.props.userId)
        .once("value")
        .then(snapshot => {
          if (snapshot.val() != null) {
            this.setState({ canRate: false });
          }
        });
    }
  }

  handleClick(event) {
    this.setState({ value: undefined });
  }
  rated = rating => {
    this.setState({ starRating: rating }, () => {});
    this.onOpenModalReview();
  };
  onOpenModalReview = () => {
    this.setState({ ModalOpenReview: true });
  };

  onCloseModalReview = () => {
    this.setState({ ModalOpenReview: false });
  };
  submit_review = () => {
    var rating = this.state.starRating;
    this.setState({ value: rating });

    let courseId = this.props.courseId;

    db.ref(`userInfo/${this.props.userId}`)
      .once("value")
      .then(userSnapshot => {
        const total = this.state.total + 1;
        const value = (this.state.value + rating) / 2;

        db.ref(`courses/${courseId}/CourseRating`).set({
          Total: total,
          Score: value
        });

        db.ref(`userRating/${courseId}/${this.props.userId}`).set({
          name: userSnapshot.val().name,
          image: userSnapshot.val().image,
          score: value,
          review: this.state.review,
          timestamp: new Date().getTime()
        });
        this.setState({
          total: total,
          value: value
        });
      });

    this.setState({ canRate: true });
    this.onCloseModalReview();
  };
  render() {
    return (
      <div>
        <Modal
          open={this.state.ModalOpenReview}
          onClose={this.onCloseModalReview}
          classNames={{}}
          center
        >
          <div className=" modal-content submit-correction-modal ">
            <div className="modal-body zero_padding">
              <div>
                <div className="modal-course-name text-center btn-purple">
                  <h4 className="white">Submit Review</h4>
                </div>
                <div className="container p-coursemodal">
                  <textarea
                    className="form-control col"
                    rows="10"
                    onChange={event =>
                      this.setState(byPropKey("review", event.target.value))
                    }
                    value={this.state.review}
                  />
                  <hr />
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-red btn-width-250 white"
                      onClick={this.submit_review}
                    >
                      {" "}
                      Submit{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Rating
          {...this.props}
          initialRating={this.state.value}
          emptySymbol="fa fa-star-o rating-star "
          fractions={10}
          fullSymbol="fa fa-star  rating-star-active"
          onClick={this.rated}
          // readonly={this.state.canRate}
        />
        &nbsp;{" "}
        <span
          className={
            this.state.textWhite ? " white fs-12 " : " text_grey " + "  fs-12 "
          }
        >
          {this.state.value.toFixed(2)}
        </span>
        {this.props.data != undefined ? (
          ""
        ) : (
          <React.Fragment>
            &nbsp;
            <span
              className={
                this.state.textWhite
                  ? " white fs-12 "
                  : " text_grey " + " fs-12 "
              }
            >
              ({this.state.total})
            </span>
          </React.Fragment>
        )}
        {/* <button onClick={this.handleClick}>Reset</button> */}
      </div>
    );
  }
}

export default Ratings;
