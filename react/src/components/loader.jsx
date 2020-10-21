import React, { Component } from 'react';
class Loader extends Component {
    state = {}
    render() {
        return (
        <div className={this.props.showLoader == true ? "main-loader showLoader" : "main-loader hideLoader"}>
            <div className="loader">
                <div className="loader__figure"></div>
                <p className="loader__label">Loading</p>
            </div>
        </div>
        );
    }
}
export default Loader;