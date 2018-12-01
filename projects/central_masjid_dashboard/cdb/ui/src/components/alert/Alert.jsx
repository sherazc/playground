import React, {Component} from "react";
import {connect} from "react-redux";
import "./Alert.scss"
import {hideAlert, ALERT_SUCCESS, ALERT_WARN, ALERT_ERROR} from "../../store/common/alert/actions";

class Alert extends Component {
    render() {
        return (
            <div id="snackbar" className={this.showAlertClass()}>
                <img
                    src={this.getAlertIcon(this.props.currentAlert.type)}
                    className="alertIcon"
                    alt="icon"/>
                {this.props.currentAlert.message}
            </div>
        );
    }

    showAlertClass() {
        if (this.props.currentAlert.show) {
            const self = this;
            setTimeout(()=> {
                self.props.hideAlert();
            }, 3000);
            return "show";
        } else {
            return "";
        }
    }

    getAlertIcon(type) {
        switch (type) {
            case ALERT_SUCCESS:
                return `${process.env.PUBLIC_URL}/images/icons/check.svg`;
            case ALERT_WARN:
                return `${process.env.PUBLIC_URL}/images/icons/warn.svg`;
            case ALERT_ERROR:
                return `${process.env.PUBLIC_URL}/images/icons/cross.svg`;
            default:
                return "";
        }
    }
}

const actions = {
    hideAlert: hideAlert
};

const mapStateToProps = state => {
    return {
        currentAlert: state.common.alert.currentAlert
    };
};

export default connect(mapStateToProps, actions)(Alert);
