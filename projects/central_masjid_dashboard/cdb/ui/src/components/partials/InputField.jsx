import React from "react";

const InputField = (props) => {
    const type = props.type ? props.type : "text";
    const placeholder = props.placeholder ? props.placeholder : props.label;

    const makeFieldError = (fieldError) => {
        if (fieldError && fieldError.length > 0) {
            return (
                <div style={{color: "red"}}>
                    {fieldError}
                </div>
            );
        }
    };

    const makeHelpSection = (helpText) => {
        if (helpText) {
            return (
                <small id="emailHelp">
                    {helpText}
                </small>
            );
        } else {
            return "";
        }

    };

    const requiredMarker = required => {
        if (required) {
            return <span style={{color:'red'}}>*</span>;
        }

    };

    const viewOrEditField = mode => {

        if ("edit" === mode || "create" === mode) {
            return <input
                    onChange={props.onChange}
                    value={props.value}
                    type={type}
                    name={props.name}
                    id={props.name}
                    required={props.required}
                    placeholder={placeholder}/>
        } else {
            return <>{props.value}</>;
        }

    };

    return (
        <div>
            {requiredMarker(props.required)}
            <label htmlFor={props.name}>{props.label}</label>
            {viewOrEditField(props.mode)}
            {makeFieldError(props.fieldError)}
            {makeHelpSection(props.help)}
        </div>
    );
};

export default InputField;