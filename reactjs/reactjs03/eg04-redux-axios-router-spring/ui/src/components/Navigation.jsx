import React, {Component} from "react";
import {NavLink} from 'react-router-dom';

export default class Navigation extends Component {
    render() {
        return (
            <div className="nav">
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/all-users">
                    All Users
                </NavLink>
                <NavLink to="/add-user">
                    Add User
                </NavLink>
                <NavLink to="/counter">
                    Counter
                </NavLink>
            </div>

        );
    }
}