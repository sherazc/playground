import React, {Component} from 'react';
import styles from "./Header02.module.scss";

const baseLinkUrl = process.env.PUBLIC_URL;

class Header02 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.logoContainer}>
Masjid Dashboard
                </div>
                <div className={styles.logoContainer}>
                    {this.props.title}
                </div>
            </div>
        );
    }
}

export default Header02;
