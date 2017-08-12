import React from "react";

const Operations = (props) => {
    return(
        <div className="paddedBoxRed">
            <button onClick={props.add} className="btn btn-primary" style={{marginRight: "10px"}}>Add</button>
            <button onClick={props.subtract} className="btn btn-primary">Substract</button>
        </div>
    );
};

export default Operations;