import React, {Component} from 'react';
import styles from "./Header02.module.scss";

// const baseLinkUrl = process.env.PUBLIC_URL;

class Header02 extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.logoContainer}>
                        <a className={`${styles.anchorLight}`} href={`baseLinkUrl`}>Masjid Dashboard</a>
                    </div>
                    <div className={styles.titleContainer}>
                        {this.props.title}
                    </div>
                </div>
            </div>
        );
    }
}

export default Header02;
