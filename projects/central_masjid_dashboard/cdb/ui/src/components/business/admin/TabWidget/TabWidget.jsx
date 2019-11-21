import React, {Component} from "react";
import styles from "./TabWidget.module.scss"
class TabWidget extends Component {

    render() {
        return(
            <div>
                <div>
                    These are all the widgets available to you.
                    Incorporate them in your website by copying pasting the code.
                </div>
                <div className={styles.widgetContainer}>
                    <div className={styles.widgetHeader}>
                        Prayer Time
                    </div>
                    <div className={styles.widgetScriptDetailContainer}>
                        <div className={styles.widgetScript}>
                            code
                        </div>
                        <div className={styles.widgetDetail}>
                            Details
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default TabWidget;