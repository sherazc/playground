import React, {Component} from "react";
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {createLoginMapStateToProps} from "../../../store/lib/utils";
import {verifyAuthentication} from "../../../services/auth/AuthNZ";
import {loginResetAction} from "../../../store/login/actions";

class Navigation extends Component {
    loginControls() {
        if (!verifyAuthentication(this.props.tokenPayload, true)) {
            return (
                <div style={{marginTop: 20, marginBottom: 10, }}>
                    <NavLink to={`${process.env.PUBLIC_URL}/login`}>
                        Login (click or auto redirect)
                    </NavLink>
                </div>
            );
        }

        return (
            <div style={{marginTop: 20, marginBottom: 10, }}>
                Hi {this.props.user.firstName} {this.props.user.lastName}
                <a href={`${process.env.PUBLIC_URL}/#/`} onClick={this.logout.bind(this)}>
                    Logout
                </a>
                |
                <NavLink to={`${process.env.PUBLIC_URL}/company/add-user`}>
                    Add user to company
                </NavLink>
            </div>
        );
    }

    logout(event) {
        event.preventDefault();
        this.props.loginResetAction();
        this.props.history.replace(`${process.env.PUBLIC_URL}/`);
    }

    render() {
        return (
            <div>
                <div style={{padding: 20, backgroundColor: '#efefef'}}>
                    <NavLink to={`${process.env.PUBLIC_URL}/`} exact>Home</NavLink>
                    |
                    <NavLink to={`${process.env.PUBLIC_URL}/dashboard`}>
                        Dashboard (all logged in user)
                    </NavLink>
                    |
                    <NavLink to={`${process.env.PUBLIC_URL}/admin`}>
                        Admin (admin only)
                    </NavLink>
                    |
                    <NavLink to={`${process.env.PUBLIC_URL}/register`}>
                        Register Company
                    </NavLink>
                    |
                    <NavLink to={`${process.env.PUBLIC_URL}/register/user`}>
                        Register Company User
                    </NavLink>
                    |
                    <NavLink to={`${process.env.PUBLIC_URL}/register/finish`}>
                        Register Company Finish
                    </NavLink>
                    |
                    <NavLink to={`${process.env.PUBLIC_URL}/forbidden`}>
                        Forbidden (auto redirects)
                    </NavLink>
                    |
                    <NavLink to={`${process.env.PUBLIC_URL}/examples`}>
                        Examples
                    </NavLink>
                    {this.loginControls()}
                </div>
                <hr style={{height: 1, backgroundColor: 'green', margin: 0, marginBottom: 20}}/>
            </div>
        );
    }
}

export default connect(createLoginMapStateToProps, {loginResetAction})(withRouter(Navigation));
