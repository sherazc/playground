import React, {Component} from "react";
import styles from "./Nav.module.scss";
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import LinkLeftBorderMaterialIcon from "../../../common/LinkLeftBorderMaterialIcon/LinkLeftBorderMaterialIcon";
import {mapStateLoginToProps} from "../../../../store/lib/utils";
import {loginResetAction, viewMyProfileAction} from "../../../../store/login/loginActions";
import {
    isAdminLogin,
    isSuperAdminLogin,
    verifyAuthentication} from "../../../../services/auth/AuthNZ";


const baseLinkUrl = process.env.PUBLIC_URL;

class Nav extends Component {

    navLinks() {
        const superAdmin = isSuperAdminLogin(this.props.login);
        const admin = isAdminLogin(this.props.login);
        if (verifyAuthentication(this.props.login.tokenPayload, true)) {
            return (
                <>
                    <LinkLeftBorderMaterialIcon
                        link={`${baseLinkUrl}/auth/admin`}
                        dark={false}
                        text="Settings"
                        icon="settings_applications"/>

                    {admin &&
                        <LinkLeftBorderMaterialIcon
                            link={`${baseLinkUrl}/auth/company/view`}
                            dark={false}
                            text="Company"
                            icon="business"/>
                    }

                    {admin &&
                        <LinkLeftBorderMaterialIcon
                            link={`${baseLinkUrl}/auth/company/user/list/current`}
                            dark={false}
                            text="Users"
                            icon="group"/>
                    }

                    {superAdmin &&
                        <LinkLeftBorderMaterialIcon
                            link={`${baseLinkUrl}/auth/company/list`}
                            dark={false}
                            text="All Companies"
                            icon="account_balance"/>
                    }

                    {superAdmin &&
                        <LinkLeftBorderMaterialIcon
                            link={`${baseLinkUrl}/auth/company/user/list/all`}
                            dark={false}
                            text="All Users"
                            icon="supervised_user_circle"/>
                    }
                </>
            )
        }
    }

    render() {
        return (
            <nav className={styles.container}>
                {this.navLinks()}
                <LinkLeftBorderMaterialIcon
                    link={`${baseLinkUrl}/examples`}
                    dark={false}
                    icon="bug_report"/>
            </nav>
        );
    }
}


export default connect(mapStateLoginToProps, {loginResetAction, viewMyProfileAction})(withRouter(Nav));