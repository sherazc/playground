import React, {Component} from "react";
import styles from "./TabWidget.module.scss"
import {createWidgets} from "./widgets";
import {connect} from "react-redux";

class TabWidget extends Component {

    makeWidget(widget) {
        return (
            <div key={widget.name} className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.name}>
                        {widget.name}
                    </div>
                    <div className={styles.description}>
                        {widget.description}
                    </div>
                    <textarea className={styles.script} defaultValue={widget.script} disabled/>
                </div>
                <div className={styles.right}>
                    <div className={styles.image}>
                        <a href={widget.liveLink} target="_blank" rel="noopener noreferrer">
                            <img alt={widget.name} src={widget.image}/>
                        </a>
                    </div>
                    <div className={styles.imageDescription}>
                        {widget.imageDescription} <a href={widget.liveLink} target="_blank" rel="noopener noreferrer">
                        Click here!
                        </a> to view live link.
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
                    Incorporate them in your website by copy, pasting the code in your website.
                </div>

                {createWidgets(window.location.origin, this.props.login.company)
                    .map(widget => this.makeWidget(widget))}
            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        login: state.login,
    }
};
export default connect(mapStateToProps)(TabWidget);