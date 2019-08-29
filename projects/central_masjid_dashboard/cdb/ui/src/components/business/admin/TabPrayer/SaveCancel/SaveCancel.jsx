import React from "react";
import {Button} from "@material-ui/core";
import styles from "./SaveCancel.module.scss"

const SaveCancel = (props) => {

    const containerClasses = `${styles.hoverActionBar} ${props.show ? styles.hoverActionBarShow : styles.hoverActionBarHide}`;

    return (
        <div className={containerClasses}>
            {props.saveLabel &&
                <span className={styles.button}>
                    <Button
                        onClick={props.onSave}
                        variant="outlined" color="primary">
                        {props.saveLabel}
                    </Button>
                </span>
            }
            {props.cancelLabel &&
                <span className={styles.button}>
                    <Button onClick={props.onCancel}
                            variant="outlined" color="primary">
                        {props.cancelLabel}
                    </Button>
                </span>
            }
        </div>
    );
};

export default SaveCancel;