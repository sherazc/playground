import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

export default class Navigation extends Component {
    render() {
        return (
            <div className="nav">
                <span>MobX Async</span>
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/eg01">
                    eg01 - This is ERROR because @observable is not updated directly under @action function
                </NavLink>
                <NavLink to="/eg02">
                    eg02 - Solution 1 -
                    Call @action when it's time to update @observable
                </NavLink>
                <NavLink to="/eg03">
                    eg03 - Solution 2 - Use runInAction() to update
                </NavLink>
                <NavLink to="/eg04">
                    eg04 - Solution 3 - async await plus runInAction()
                </NavLink>
                <NavLink to="/eg05">
                    eg05 - Solution 4 - flow plus yield.
                    <span style={{fontStyle: "italic"}}>
                        I CAN NOT MAKE IT WORK
                    </span>
                </NavLink>
            </div>
        );
    }
}