import React from "react";
import PropTypes from 'prop-types';
import styles from "./SideLabelSelect.module.scss"
import {
    Select
} from '@material-ui/core';

export const MODE_VIEW = "view";
export const MODE_EDIT = "edit";

const SideLabelSelect = (props) => {
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
                    className={styles.classViewValue}>{props.value}</span>
                {help}
            </div>
        );

    } else {
        const id = props.id ? props.id : props.name;
        field = (
            <div className={styles.classInputContainer}>
                {label}
                <Select
                    value={value}
                    onChange={props.onChange}
                    inputProps={{
                        name: props.name,
                        id: id,
                        className: styles.classInputValue
                    }}
                    className={styles.selectBox}>
                    {props.children}
                </Select>
                {help}
            </div>
        );
    }

    return field;
};


SideLabelSelect.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string,
    mode: PropTypes.oneOf(['view', 'edit']),
    placeholder: PropTypes.string,
    label: PropTypes.string,
    help: PropTypes.string,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    onBlur: PropTypes.func,
    required: PropTypes.bool,
    error: PropTypes.bool,
};

export default SideLabelSelect;