import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {inject, observer} from "mobx-react";

export default class Navigation extends Component {
    render() {
        const {userProfileStore} = this.props;

        return (
            <div className="nav">
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/eg01">eg01</NavLink>

                <span>MobX Async</span>
            </div>
        );
    }
}