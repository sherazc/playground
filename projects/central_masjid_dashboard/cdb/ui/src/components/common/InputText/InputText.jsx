import React, {Component} from "react";
import PropTypes from 'prop-types';
import styles from "./InputText.module.scss"
import {time24To12} from "../../../services/utilities";
import {
    TextField, Input
} from '@material-ui/core';

export const MODE_VIEW = "view";
export const MODE_EDIT = "edit";

const InputText = (props) => {
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
                    type={type}
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                    inputProps={{className: styles.classInputValue}}
                    required={props.required}/>
                {help}
            </div>
        );
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