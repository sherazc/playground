import React, {Component} from "react";
import styles from "./Nav.module.scss";
import {NavLink} from 'react-router-dom';

const baseLinkUrl = process.env.PUBLIC_URL;

class Nav extends Component {

    render() {
        return (
            <div className={styles.container}>
                Nav
            </div>
        );
    }
}


export default Nav;