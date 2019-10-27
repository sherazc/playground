import React, {Component} from "react";
import styles from "./Nav.module.scss";
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import LinkLeftBorderMaterialIcon from "../../../common/LinkLeftBorderMaterialIcon/LinkLeftBorderMaterialIcon";
import {mapStateLoginToProps} from "../../../../store/lib/utils";
import {loginResetAction, viewMyProfileAction} from "../../../../store/login/loginActions";
import {verifyAuthentication} from "../../../../services/auth/AuthNZ";


const baseLinkUrl = process.env.PUBLIC_URL;

class Nav extends Component {

    navLinks() {
        if (verifyAuthentication(this.props.login.tokenPayload, true)) {
            return (
                <div>
                    <LinkLeftBorderMaterialIcon
                        link={`${baseLinkUrl}/auth/admin`}
                        dark={false}
                        text="Settings"
                        icon="settings_applications"/>

                    <LinkLeftBorderMaterialIcon
                        link={`${baseLinkUrl}/auth/company/view`}
                        dark={false}
                        text="Company"
                        icon="business"/>

                    <LinkLeftBorderMaterialIcon
                        link={`${baseLinkUrl}/auth/company/user/list/current`}
                        dark={false}
                        text="Users"
                        icon="group"/>

                    <LinkLeftBorderMaterialIcon
                        link={`${baseLinkUrl}/auth/company/list`}
                        dark={false}
                        text="All Companies"
                        icon="account_balance"/>

                    <LinkLeftBorderMaterialIcon
                        link={`${baseLinkUrl}/auth/company/user/list/all`}
                        dark={false}
                        text="All Users"
                        icon="supervised_user_circle"/>
                </div>
            )
        }
    }

    render() {
        return (
            <nav className={styles.container}>
                {this.navLinks()}
            </nav>
        );
    }
}


export default connect(mapStateLoginToProps, {loginResetAction, viewMyProfileAction})(withRouter(Nav));