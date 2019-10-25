import React, {Component} from "react";
import styles from "./Header01.module.scss";
import Logo from "../../Home/Logo";

class Header01 extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.panelRight}>
                    <Logo className={styles.logo} classPath={styles.logoPath}/>
                    <div className={styles.appName}>Masjid Dashboard</div>
                </div>
                <div className={styles.panelRight}>
                    <div className={styles.navContainer}>
                        Page1 Page2
                    </div>
                    <div className={styles.profile}>
                        Login Profile
                    </div>
                </div>
            </div>
        );
    }
}


export default Header01;