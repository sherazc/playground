import React, {Component} from "react";
import {NavLink} from 'react-router-dom';

export default class Navigation extends Component {
    render() {
        return (
            <div className="nav">
                <NavLink to="/" exact>Home</NavLink>
                |
                <NavLink to="/login">
                    Login
                </NavLink>
                |
                <NavLink to="/register">
                    Register Company
                </NavLink>
                |
                <NavLink to="/register/user">
                    Register Company User
                </NavLink>
            </div>

        );
    }
}