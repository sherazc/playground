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

    return (
        <div>
            {viewOrEditField(props)}
        </div>
    );
};


const viewOrEditField = (props) => {
    const type = props.type ? props.type : "text";
    const value = props.value ? props.value : "";
    const classView = props.classView ? props.classView : styles.classView;
    const classInput = props.classInput ? props.classInput : styles.classInput;
    const classTextField = props.classTextField ? props.classTextField : styles.classTextField;

    let field;

    if (MODE_VIEW === props.mode) {
        return <span className={classView}>{type === "time" ? time24To12(props.value) : props.value}</span>;
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
                className={classTextField}
                inputProps={{className: classInput}}
                required={props.required}
            />);
    }

    return field;
};


InputText.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    type: PropTypes.string,
    mode: PropTypes.oneOf(['view', 'edit']),
    placeholder: PropTypes.string,
    label: PropTypes.string,
    help: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    required: PropTypes.bool,
    classView: PropTypes.string,
    classInput: PropTypes.string,
    classTextField: PropTypes.string,
};

export default InputText;