import React from "react";

const InputField = (props) => {
    const type = props.type ? props.type : "text";
    const placeholder = props.placeholder ? props.placeholder : props.label;

    return (
        <div className="form-group">
            <label htmlFor={props.name}>{props.label}</label>
            <input
                onChange={props.onChange}
                value={props.value}
                type={type}
                className="form-control"
                name={props.name}
                id={props.name}
                placeholder={placeholder}/>
        </div>
    );
};

export default InputField;