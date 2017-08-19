import React from "react"

let MyComponent = (props) => {
    return (
        <div className="boxGreen">
            {props.message}
        </div>
    );
};

export default MyComponent;