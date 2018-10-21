import React, {Component} from "react";
import {connect} from "react-redux";
import "./Loading.scss"

class Loading extends Component {
    render() {
        return (
            <div className="loading">Loading&#8230;</div>
        );
    }
}

export default Loading;
