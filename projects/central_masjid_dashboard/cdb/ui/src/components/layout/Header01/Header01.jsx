import React, {Component} from "react";
import styles from "./Header01.module.scss";
import Logo from "../../Home/Logo";
import {NavLink} from 'react-router-dom';
import Nav from "./Nav/Nav";
import Profile from "./Profile/Profile";

const baseLinkUrl = process.env.PUBLIC_URL;

class Header01 extends Component {

    render() {
        return (
            <div className={styles.container}>
                <NavLink to={`${baseLinkUrl}/`} exact className={styles.panelLeft}>
                    <Logo className={styles.logo}/>
                    <div className={`${styles.appName} ${styles.heading3}`}>Masjid Dashboard</div>
                </NavLink>
                <div className={styles.panelCenter}>
                    <div className={styles.navContainer}>
                        <Nav/>
                    </div>
                </div>
                <div className={styles.panelRight}>
                    <div className={styles.profile}>
                        <Profile/>
                    </div>
                </div>
            </div>
        );
    }
}


export default Header01;