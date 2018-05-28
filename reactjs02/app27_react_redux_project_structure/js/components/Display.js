import React from "react";

const Display = (props) => {
    return(
        <div className="paddedBoxYellow" style={{fontSize: "24px"}}>
            {props.result}
        </div>
    );
};

export default Display;