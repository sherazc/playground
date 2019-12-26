import React, {Component} from "react";
import {connect} from "react-redux";
import {showAlert, ALERT_SUCCESS, ALERT_ERROR, ALERT_WARN} from "../store/common/alert/actions";
import {showLoading, hideLoading} from "../store/common/loading/actions";
import AdminNavigation from "./common/navigation/AdminNavigation";
import SideLabelInputText from "./common/SideLabelInputText/SideLabelInputText";
import SideLabelSelect from "./common/SideLabelSelect/SideLabelSelect";
import {
    MenuItem
} from '@material-ui/core';

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
                <a href="http://localhost:3000/auth/register/verify?userId=5da336eff2a2338668d23a04&emailVerifyCode=abc">Test Verify Email link</a>
                <br/>
                <SideLabelSelect
                    name={"name"}
                    label="Choose Select"
                    value={"value1"}
                    mode={"edit"}
                    help={"Some select help"}>
                    <MenuItem value="value1">Value 1</MenuItem>
                    <MenuItem value="value2">Value 2</MenuItem>
                </SideLabelSelect>

                <br/>
                <SideLabelInputText
                    value="Field Value"
                    mode={"view"} placeholder="abc" help="some help"/>

                <SideLabelInputText
                    label="Field Name"
                    value="Field Value"
                    mode={"view"}/>

                <SideLabelInputText
                    label="Field Name"
                    value="Field Value"
                    mode={"edit"}/>

                <SideLabelInputText
                    label="Field Name"
                    value="Field Value"
                    mode={"view"} placeholder="abc" help="some help"/>

                <SideLabelInputText
                    label="Field Name"
                    value="Field Value"
                    mode={"Edit"} placeholder="abc" help="some help"/>

                <SideLabelInputText
                    label="Field Name"
                    value="Field Value" error
                    mode={"Edit"} placeholder="abc" help="some help"/>

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
