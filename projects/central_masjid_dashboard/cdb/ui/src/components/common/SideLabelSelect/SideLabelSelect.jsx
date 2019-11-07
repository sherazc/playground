import React, {Component} from "react";
import PropTypes from 'prop-types';
import styles from "./SideLabelSelect.module.scss"
import {
    TextField, Input, MenuItem, Select
} from '@material-ui/core';

export const MODE_VIEW = "view";
export const MODE_EDIT = "edit";

const SideLabelSelect = (props) => {
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
                    onChange={this.onSelectCompany}
                    inputProps={{
                        name: props.name,
                        id: id
                    }}
                    className={styles.selectBox}>
                    {companies.map((company, index) => {
                        return (
                            <MenuItem
                                key={index} value={company.url}>
                                {company.name}
                            </MenuItem>
                        );
                    })}
                </Select>

                <Input
                    id={id}
                    name={props.name}
                    value={value}
                    error={props.error}
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
    onBlur: PropTypes.func,
    required: PropTypes.bool,
    error: PropTypes.bool,
};

export default SideLabelSelect;