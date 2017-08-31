import React from "react";

let Child = (props) => {
    return (
        <div className="boxYellow">
            <h4>Child Component</h4>
            Parent Value: {props.parentValue}
        </div>
    );
};

export default Child;