import React, {Component} from "react";
import styles from "./TabWidget.module.scss"
import {widgets} from "./widgets";

class TabWidget extends Component {

    makeWidget(widget) {
        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.name}>
                        {widget.name}
                    </div>
                    <div className={styles.description}>
                        {widget.description}
                    </div>
                    <div className={styles.script}>
                        {widget.script}
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.image}>
                        <img src={widget.image}/>
                        Sample Output
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return(
            <>
                <div className={styles.mainDescription}>
                    These are all the widgets available to you.
                    Incorporate them in your website by copying pasting the code.
                </div>

                {widgets.map(widget => this.makeWidget(widget))}
            </>
        );
    }
}

export default TabWidget;