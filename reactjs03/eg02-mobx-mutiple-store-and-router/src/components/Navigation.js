import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import "../styles/Navigation.css"

export default class Navigation extends Component {
    render() {
        return (
            <div className="nav">
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/todo">Todo</NavLink>
                <NavLink to="/user-profile">User Profile</NavLink>
            </div>
        );
    }
}