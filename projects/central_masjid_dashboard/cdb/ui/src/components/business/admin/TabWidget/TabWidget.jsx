import React, {Component} from "react";
import styles from "./TabWidget.module.scss"
import {widgets} from "./widgets";

class TabWidget extends Component {

    makeWidget(widget) {
        return (
            <div className={styles.widgetContainer}>
                <div className={styles.widgetHeader}>
                    {widget.name}
                </div>
                <div className={styles.widgetScriptDescriptionContainer}>
                    <div className={styles.widgetScript}>
                        {widget.script}
                    </div>
                    <div className={styles.widgetDescription}>
                        Details
                    </div>
                </div>

            </div>
        );
    }

    render() {
        return(
            <div>
                <div className={styles.mainDescription}>
                    These are all the widgets available to you.
                    Incorporate them in your website by copying pasting the code.
                </div>

                {widgets.map(widget => this.makeWidget(widget))}



            </div>
        );
    }
}

export default TabWidget;