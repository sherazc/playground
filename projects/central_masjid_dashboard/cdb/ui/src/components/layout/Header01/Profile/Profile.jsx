import React, {Component} from "react";
import styles from "./Profile.module.scss";
import {NavLink, withRouter} from 'react-router-dom';
import {verifyAuthentication} from "../../../../services/auth/AuthNZ";
import {mapStateLoginToProps} from "../../../../store/lib/utils";
import {loginResetAction, viewMyProfileAction} from "../../../../store/login/loginActions";
import {connect} from "react-redux";
import {Icon} from '@material-ui/core';
import LinkLeftBorderMaterialIcon from "../../../common/LinkLeftBorderMaterialIcon/LinkLeftBorderMaterialIcon";

const baseLinkUrl = process.env.PUBLIC_URL;

class Profile extends Component {

    loginControls() {
        if (!verifyAuthentication(this.props.login.tokenPayload, true)) {
            // style={{border: "1px solid white", padding: "10px"}}
            return (
                <LinkLeftBorderMaterialIcon
                    link={`${baseLinkUrl}/`}
                    dark={false}
                    text="Login"
                    icon="input"
                />
            );
        }

        return (
            <>
                Hi {this.props.login.user.firstName} {this.props.login.user.lastName}
                <a href={`${process.env.PUBLIC_URL}/#/`} onClick={this.logout.bind(this)}>
                    Logout
                </a>
                |

                <a href={`${process.env.PUBLIC_URL}/#/`} onClick={this.viewMyProfile.bind(this)}>
                    <Icon>person</Icon> My Profile
                </a>
                |
                <NavLink to={`${process.env.PUBLIC_URL}/auth/company/user/create`}>
                    Add user to company
                </NavLink>
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