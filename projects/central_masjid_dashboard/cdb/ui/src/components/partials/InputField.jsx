import React from "react";

const InputField = (props) => {
    const type = props.type ? props.type : "text";
    const placeholder = props.placeholder ? props.placeholder : props.label;

    const makeHelpSection = (helpText) => {
        if (helpText) {
            return (
                <small id="emailHelp" className="form-text text-muted">
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

    return (
        <div className="form-group">
            {requiredMarker(props.required)}
            <label htmlFor={props.name}>{props.label}</label>
            <input
                onChange={props.onChange}
                value={props.value}
                type={type}
                className="form-control"
                name={props.name}
                id={props.name}
                required={props.required}
                placeholder={placeholder}/>
            {makeHelpSection(props.help)}
        </div>
    );
};

export default InputField;