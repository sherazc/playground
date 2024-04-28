import React from "react";
import {time24To12} from "mdb-core-js";

export const MODE_VIEW = "view";
export const MODE_EDIT = "edit";
export const MODE_CREATE = "create";
export const MODE_PROFILE = "profile";

const InputField = (props) => {
    const type = props.type ? props.type : "text";
    const placeholder = props.placeholder ? props.placeholder : props.label;
    const value = props.value ? props.value : "";

    const viewOrEditField = mode => {
        if (MODE_VIEW === mode) {
            return <span className={props.viewClass}>{type === "time" ? time24To12(props.value) : props.value}</span>;
        } else {
            const id = props.id ? props.id : props.name;
            return <input
                onChange={props.onChange}
                value={value}
                type={type}
                name={props.name}
                id={id}
                required={props.required}
                placeholder={placeholder}
                onBlur={props.onBlur}
            />
        }
    };

    return (
        <div>
            {props.required && <span style={{color:'red'}}>*</span>}
            {props.label && <label htmlFor={props.name}>{props.label}</label>}
            {viewOrEditField(props.mode)}
            {props.fieldError && props.fieldError.length > 0 &&
                <div style={{color: "red"}}>
                    {props.fieldError}
                </div>
            }
            {props.help &&
                <small id="emailHelp">
                    {props.help}
                </small>
            }
        </div>
    );
};

export default InputField;