import React, {Component} from "react";
import {NavLink} from 'react-router-dom';

export default class Navigation extends Component {
    render() {
        return (
            <div>
                <div className="nav" style={{padding: 20, backgroundColor: '#efefef'}}>
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
                    |
                    <NavLink to="/register/finish">
                        Register Company Finish
                    </NavLink>
                    |
                    <NavLink to="/examples">
                        Examples
                    </NavLink>
                </div>
                <hr style={{height: 1, backgroundColor: 'green', margin: 0, marginBottom: 20}}/>
            </div>
        );
    }
}