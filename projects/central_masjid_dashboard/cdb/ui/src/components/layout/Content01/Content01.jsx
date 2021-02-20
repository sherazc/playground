import React, {Component} from 'react';
import styles from "./Content01.module.scss";

class Content01 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Content01;
