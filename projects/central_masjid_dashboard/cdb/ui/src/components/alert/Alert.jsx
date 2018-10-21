import React, {Component} from "react";
import "./Alert.scss"
import {hideAlert, showAlert} from "../../store/action/alert-actions";
import {connect} from "react-redux";

class Alert extends Component {


    render() {
        return (
            <div id="snackbar" className={this.showAlertClass()}>
                Alert
            </div>
        );
    }

    showAlertClass() {
        return this.props.currentAlert.show ? "show" : "";
    }
}

const actions = {
    hideAlert: hideAlert
};

const mapStateToProps = state => {
    return {
        currentAlert: state.alertReducer.currentAlert
    };
};

export default connect(mapStateToProps, actions)(Alert);