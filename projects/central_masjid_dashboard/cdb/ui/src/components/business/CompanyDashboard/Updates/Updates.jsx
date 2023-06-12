import React, {Component} from "react";
import Rod from "./Rod/Rod";
import styles from "./Updates.module.scss";
import Hod from "./Hod/Hod";

class Updates extends Component {

    state = this.createInitialState();

    createInitialState() {
        return {};
    }

    render() {
        return (
            <div>
                <div className={[styles.heading1, styles.vMargin8].join(' ')}>Reminders</div>
                <div className={[styles.heading3, styles.vMargin6].join(' ')}>Quran</div>
                <div className={styles.reminderContainer}><Rod/></div>
                <div className={[styles.heading3, styles.vMargin3].join(' ')}>Hadees</div>
                <div className={styles.reminderContainer}><Hod/></div>
            </div>
        );
    }
}

export default Updates;