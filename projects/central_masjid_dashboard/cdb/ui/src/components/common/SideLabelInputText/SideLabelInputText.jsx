import React from "react";
import PropTypes from 'prop-types';
import styles from "./SideLabelInputText.module.scss"
import {
    Input
} from '@material-ui/core';
import {time24To12} from "mdb-core-js";

export const MODE_VIEW = "view";
export const MODE_EDIT = "edit";

const SideLabelInputText = (props) => {
    const type = props.type ? props.type : "text";
    const value = props.value ? props.value : "";

    let field;

    let label;
    if (props.label) {
        label = <span className={styles.label}>{props.label}</span>;
    }

    let help;
    if (props.help) {
        help = <span className={styles.help}>{props.help}</span>;
    }

    if (MODE_VIEW === props.mode) {

        field = (
            <div className={styles.classViewContainer}>
                {label}
                <span
                    className={styles.classViewValue}>{type === "time" ? time24To12(props.value) : props.value}</span>
                {help}
            </div>
        );

    } else {
        const id = props.id ? props.id : props.name;
        field = (
            <div className={styles.classInputContainer}>
                {label}
                <Input
                    id={id}
                    name={props.name}
                    value={value}
                    error={props.error}
                    style={props.style}
                    type={type}
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    inputProps={{className: styles.classInputValue}}
                    required={props.required}/>
                {help}
            </div>
        );
    }

    return field;
};


SideLabelInputText.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string,
    mode: PropTypes.oneOf(['view', 'edit']),
    placeholder: PropTypes.string,
    label: PropTypes.string,
    help: PropTypes.object,
    style: PropTypes.object,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    required: PropTypes.bool,
    error: PropTypes.bool,
};

export default SideLabelInputText;