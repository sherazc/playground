import React, {Component} from "react";
import styles from "./Profile.module.scss";
import {withRouter} from 'react-router-dom';
import {verifyAuthentication} from "../../../../services/auth/AuthNZ";
import {mapStateLoginToProps} from "../../../../store/lib/utils";
import {loginResetAction, viewMyProfileAction} from "../../../../store/login/loginActions";
import {connect} from "react-redux";
import LinkLeftBorderMaterialIcon from "../../../common/LinkLeftBorderMaterialIcon/LinkLeftBorderMaterialIcon";

const baseLinkUrl = process.env.PUBLIC_URL;

class Profile extends Component {

    loginControls() {
        if (!verifyAuthentication(this.props.login.tokenPayload, true)) {
            return (
                <LinkLeftBorderMaterialIcon
                    link={`${baseLinkUrl}/`}
                    dark={false}
                    text="Login"
                    icon="input"/>
            );
        }

        return (
            <>
                <div style={{marginBottom: "20px"}}>
                    Hi, {this.props.login.user.firstName} {this.props.login.user.lastName}
                </div>

                <LinkLeftBorderMaterialIcon
                    link={`${baseLinkUrl}/#/`}
                    dark={false}
                    text="My Profile"
                    icon="person" onClick={this.viewMyProfile.bind(this)}/>


                <LinkLeftBorderMaterialIcon
                    link={`${baseLinkUrl}/#/`}
                    dark={false}
                    text="Logout"
                    icon="cancel" onClick={this.logout.bind(this)}/>
            </>
        );
    }


    logout(event) {
        event.preventDefault();
        this.props.loginResetAction();
        this.props.history.replace(`${process.env.PUBLIC_URL}/`);
    }

    viewMyProfile(event) {
        event.preventDefault();
        this.props.viewMyProfileAction(this.props.login.user);
        this.props.history.replace(`${process.env.PUBLIC_URL}/auth/company/user/profile`);
    }

    render() {
        return (
            <div className={styles.container}>
                {this.loginControls()}
            </div>
        );
    }
}


export default connect(mapStateLoginToProps, {loginResetAction, viewMyProfileAction})(withRouter(Profile));