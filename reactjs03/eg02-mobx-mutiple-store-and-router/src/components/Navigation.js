import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {inject} from "mobx-react";

@inject("userProfileStore")
export default class Navigation extends Component {
    render() {
        const {userProfileStore} = this.props;

        return (
            <div className="nav">
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/todo">Todo</NavLink>
                <NavLink to="/user-profile">User Profile</NavLink>
                <span>Hi {userProfileStore.user.name}</span>
            </div>
        );
    }
}