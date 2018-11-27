import React, {Component} from "react";
import {NavLink} from 'react-router-dom';
import {connect} from "react-redux";
import {loginMapStateToProps} from "../../../store/lib/utils";
import {verifyAuthentication} from "../../../services/auth/AuthNZ";
import {loginResetAction} from "../../../store/login/actions";

class Navigation extends Component {
    loginControls() {
        if (!verifyAuthentication(this.props.tokenPayload, true)) {
            return (
                <div style={{marginTop: 20, marginBottom: 10, }}>
                    <NavLink to="/login">
                        Login (click or auto redirect)
                    </NavLink>
                </div>
            );
        }

        return (
            <div style={{marginTop: 20, marginBottom: 10, }}>
                Hi {this.props.user.firstName} {this.props.user.lastName}

                <a href="#/" onClick={this.logout.bind(this)}>
                    Logout
                </a>
            </div>
        );

    }

    logout(event) {
        event.preventDefault();
        this.props.loginResetAction()
    }

    render() {
        return (
            <div>
                <div style={{padding: 20, backgroundColor: '#efefef'}}>
                    <NavLink to="/" exact>Home</NavLink>
                    |
                    <NavLink to="/dashboard">
                        Dashboard (all logged in user)
                    </NavLink>
                    |
                    <NavLink to="/admin">
                        Admin (admin only)
                    </NavLink>
                    |
                    <NavLink to="/register">
                        Register Company
                    </NavLink>
                    |
                    <NavLink to="/register/user">
                        Register Company User
                    </NavLink>
                    |
                    <NavLink to="/register/finish">
                        Register Company Finish
                    </NavLink>
                    |
                    <NavLink to="/forbidden">
                        Forbidden (auto redirects)
                    </NavLink>
                    |
                    <NavLink to="/examples">
                        Examples
                    </NavLink>
                    {this.loginControls()}
                </div>
                <hr style={{height: 1, backgroundColor: 'green', margin: 0, marginBottom: 20}}/>
            </div>
        );
    }
}

export default connect(loginMapStateToProps, {loginResetAction})(Navigation);
