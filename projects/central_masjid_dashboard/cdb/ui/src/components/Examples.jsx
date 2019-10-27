import React, {Component} from "react";
import {connect} from "react-redux";
import {showAlert, ALERT_SUCCESS, ALERT_ERROR, ALERT_WARN} from "../store/common/alert/actions";
import {showLoading, hideLoading} from "../store/common/loading/actions";
import AdminNavigation from "./common/navigation/AdminNavigation";

class Examples extends Component {

    constructor(props) {
        super(props);
        this.showSuccessLoginAlert = this.showSuccessLoginAlert.bind(this);
        this.showWarnLoginAlert = this.showWarnLoginAlert.bind(this);
        this.showErrorLoginAlert = this.showErrorLoginAlert.bind(this);
        this.showHideLoading = this.showHideLoading.bind(this);
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

    showHideLoading() {
        this.props.showLoading();
        const self = this;
        setTimeout(() => {self.props.hideLoading()}, 2000)

    }

    render() {
        return (
            <div>
                <h3>Examples</h3>
                <br/>
                <button type="button" onClick={this.showSuccessLoginAlert}>Show Success Alert</button>
                <br/>
                <button type="button" onClick={this.showWarnLoginAlert}>Show Warn Alert</button>
                <br/>
                <button type="button" onClick={this.showErrorLoginAlert}>Show Error Alert</button>
                <br/>
                <button type="button" onClick={this.showHideLoading}>Show Loading</button>
                <br/>
                <br/>
                <br/>
                <AdminNavigation/>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}

const actions = {showAlert, showLoading, hideLoading};


export default connect(null, actions)(Examples);
