import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

export default class Navigation extends Component {
    render() {
        return (
            <div className="nav">
                <span>MobX Async</span>
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/eg01">eg01</NavLink>
            </div>
        );
    }
}