import React, {Component} from "react";
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {verifyAuthentication} from "../../../services/auth/AuthNZ";
import {loginResetAction, viewMyProfileAction} from "../../../store/login/loginActions";
import {mapStateLoginToProps} from "../../../store/lib/utils";

class AdminNavigation extends Component {
    loginControls() {
        if (!verifyAuthentication(this.props.login.tokenPayload, true)) {
            return (
                <div style={{marginTop: 20, marginBottom: 10, }}>
                    <NavLink to={`${process.env.PUBLIC_URL}/`}>
                        Login (click or auto redirect)
                    </NavLink>
                </div>
            );
        }

        return (
            <div style={{marginTop: 20, marginBottom: 10, }}>
                Hi {this.props.login.user.firstName} {this.props.login.user.lastName}
                <a href={`${process.env.PUBLIC_URL}/#/`} onClick={this.logout.bind(this)}>
                    Logout
                </a>
                |

                <a href={`${process.env.PUBLIC_URL}/#/`} onClick={this.viewMyProfile.bind(this)}>
                    My Profile
                </a>
                |
                <NavLink to={`${process.env.PUBLIC_URL}/auth/company/user/create`}>
                    Add user to masjid
                </NavLink>
            </div>
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
            <div>
                <div style={{padding: 20, backgroundColor: '#efefef'}}>

                    <h5>Common</h5>
                    <ul>
                        <li>
                            <NavLink to={`${process.env.PUBLIC_URL}/`} exact>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to={`${process.env.PUBLIC_URL}/forbidden`}>
                                Forbidden (auto redirects)
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`${process.env.PUBLIC_URL}/examples`}>
                                Examples
                            </NavLink>
                        </li>

                        <NavLink to={`${process.env.PUBLIC_URL}/auth/register/finish`}>
                            Register Company Finish
                        </NavLink>

                    </ul>

                    <h5>Business</h5>
                    <ul>
                        <li>
                            <NavLink to={`${process.env.PUBLIC_URL}/auth/admin`}>
                                Admin Dashboard (all logged in user)
                            </NavLink>
                        </li>
                    </ul>


                    <h5>Company</h5>
                    <ul>
                        <li>
                            <NavLink to={`${process.env.PUBLIC_URL}/auth/company/list`}>
                                Company list all (SUPER_ADMIN)
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`${process.env.PUBLIC_URL}/auth/company/create`}>
                                Company create
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`${process.env.PUBLIC_URL}/auth/company/view`}>
                                Company view
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`${process.env.PUBLIC_URL}/auth/company/edit`}>
                                Company edit
                            </NavLink>
                        </li>
                    </ul>



                    <h5>User</h5>
                    <ul>
                        <li>
                            <NavLink to={`${process.env.PUBLIC_URL}/auth/company/user/list/all`}>
                                User List (SUPER_ADMIN, List all user)
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={`${process.env.PUBLIC_URL}/auth/company/user/list/current`}>
                                User List (ADMIN, List all user of current login company)
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={`${process.env.PUBLIC_URL}/auth/company/user/create`}>
                                Company User Create
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={`${process.env.PUBLIC_URL}/auth/company/user/view`}>
                                Company User view
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={`${process.env.PUBLIC_URL}/auth/company/user/edit`}>
                                Company User edit
                            </NavLink>
                        </li>
                    </ul>

                    <h5>Login</h5>

                    <ul>
                        <li>{this.loginControls()}</li>
                    </ul>
                </div>
                <hr style={{height: 1, backgroundColor: 'green', margin: 0, marginBottom: 20}}/>
            </div>
        );
    }
}

export default connect(mapStateLoginToProps, {loginResetAction, viewMyProfileAction})(withRouter(AdminNavigation));
