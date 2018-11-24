import React, {Component} from "react";
import {connect} from "react-redux";
import {showAlert, ALERT_SUCCESS, ALERT_ERROR, ALERT_WARN} from "../store/common/alert/actions";
import {showLoading, hideLoading} from "../store/common/loading/actions";

class Login extends Component {


    render() {
        return (
            <div>
                Login
            </div>
        );
    }
}


export default connect(null, null)(Login);
