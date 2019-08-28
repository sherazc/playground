import React, {Component} from "react";
import {Button} from "@material-ui/core";
import styles from "./SaveCancel.module.scss"

class SaveCancel extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className={styles.hoverActionBar}>

                <span className={styles.button}>
                    <Button
                        onClick={this.props.onSave}
                        variant="outlined" color="primary">
                        {this.props.saveLabel}
                    </Button>
                </span>
                <span className={styles.button}>
                    <Button onClick={this.props.onCancel}
                            variant="outlined" color="primary">
                        {this.props.cancelLabel}
                    </Button>
                </span>


            </div>
        );
    }
}

export default SaveCancel;