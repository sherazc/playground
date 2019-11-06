import React, {Component} from "react";
import PropTypes from 'prop-types';
import styles from "./InputText.module.scss"
import {time24To12} from "../../../services/utilities";
import {
    TextField
} from '@material-ui/core';

export const MODE_VIEW = "view";
export const MODE_EDIT = "edit";

const InputText = (props) => {
    const type = props.type ? props.type : "text";
    const value = props.value ? props.value : "";

    let field;

    if (MODE_VIEW === props.mode) {
        if (props.label) {
            field = (
                <div className={styles.classViewContainer}>
                    {props.label && <span className={styles.classViewLabel}>{props.label}</span>}
                    <span
                        className={styles.classViewValue}>{type === "time" ? time24To12(props.value) : props.value}</span>
                </div>
            );
        } else {
            field = (
                <div className={styles.classViewContainer}>
                    <span className={styles.classViewValue}>{type === "time" ? time24To12(props.value) : props.value}</span>
                </div>
            );
        }
    } else {
        const id = props.id ? props.id : props.name;
        field = (
            <TextField
                id={id}
                name={props.name}
                value={value}
                type={type}
                label={props.label}
                placeholder={props.placeholder}
                onChange={props.onChange}
                className={styles.classInputContainer}
                inputProps={{className: styles.classInputValue}}
                required={props.required}
                helperText={props.help}/>);
    }

    return field;
};


InputText.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string,
    mode: PropTypes.oneOf(['view', 'edit']),
    placeholder: PropTypes.string,
    label: PropTypes.string,
    help: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    required: PropTypes.bool,
    error: PropTypes.bool,
};

export default InputText;