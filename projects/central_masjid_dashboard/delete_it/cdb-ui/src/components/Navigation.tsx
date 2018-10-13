import * as React from 'react';
import {NavLink} from 'react-router-dom';

export default class Navigation extends React.Component {
    public render() {
        return (
            <div>
                <NavLink to="/" exact={true}>home</NavLink>
                |
                <NavLink to="/login" exact={true}>login</NavLink>
                |
                <NavLink to="/bad-page" exact={true}>Not Found</NavLink>
            </div>
        );
    }
}