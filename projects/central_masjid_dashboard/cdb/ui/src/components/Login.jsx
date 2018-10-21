import React, {Component} from "react";
import {connect} from "react-redux";
import {showAlert, ALERT_SUCCESS, ALERT_ERROR, ALERT_WARN} from "../store/action/alert-actions";

class Login extends Component {

    constructor(props) {
        super(props);
        this.showSuccessLoginAlert = this.showSuccessLoginAlert.bind(this);
        this.showWarnLoginAlert = this.showWarnLoginAlert.bind(this);
        this.showErrorLoginAlert = this.showErrorLoginAlert.bind(this);
    }

    showSuccessLoginAlert() {
        this.props.showAlert(ALERT_SUCCESS, "Some Success message");
    }

    showWarnLoginAlert() {
        this.props.showAlert(ALERT_WARN, "Some Warn message");
    }

    showErrorLoginAlert() {
        this.props.showAlert(ALERT_ERROR, "Some Error message");
    }

    render() {
        return (
            <div>
                Login
                <br/>
                <button type="button" onClick={this.showSuccessLoginAlert}>Show Success Alert</button>
                <br/>
                <button type="button" onClick={this.showWarnLoginAlert}>Show Warn Alert</button>
                <br/>
                <button type="button" onClick={this.showErrorLoginAlert}>Show Error Alert</button>
            </div>
        );
    }
}

const actions = {showAlert};


export default connect(null, actions)(Login);
