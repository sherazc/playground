import React, {Component} from "react";
import styles from "./Footer02.module.scss"

class Footer02 extends Component {
    render() {
        return (
            <div className={styles.mainFooter}>
                <div className={styles.mainFooterContent}>
                    &#169;
                    {new Date().getFullYear()}
                    <a href={`${process.env.PUBLIC_URL}/`} className={styles.anchorLight} style={{marginLeft: 10}}>
                        masjiddashboard.com
                    </a>
                    <span className={styles.mainFooterBreak}>|</span>
                    <a href={`${process.env.PUBLIC_URL}/privacy-policy`} className={styles.anchorLight}>
                        Privacy Policy
                    </a>
                </div>
            </div>
        );
    }
}


export default Footer02;
