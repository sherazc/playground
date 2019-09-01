import React from "react";

const InputField = (props) => {
    const type = props.type ? props.type : "text";
    const placeholder = props.placeholder ? props.placeholder : props.label;
    const value = props.value ? props.value : "";

    const viewOrEditField = mode => {
        if ("view" === mode) {
            return <span className={props.viewClass}>{props.value}</span>;
        } else {
            return <input
                onChange={props.onChange}
                value={value}
                type={type}
                name={props.name}
                id={props.name}
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