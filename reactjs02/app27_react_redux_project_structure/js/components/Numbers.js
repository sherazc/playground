import React from "react";


const Number = (props) => {

    let handleNum1Change = (event) =>{
        props.setNum1(event.target.value);
    };

    let handleNum2Change = (event) =>{
        props.setNum2(event.target.value);
    };

    return(
        <div className="paddedBoxBlue">
            <label style={{marginRight: "5px"}}>Number 1:</label>
            <input value={props.num1} onChange={handleNum1Change}/>
            <label style={{marginLeft: "10px", marginRight: "5px"}}>Number 2:</label>
            <input value={props.num2} onChange={handleNum2Change}/>
        </div>
    );
};

export default Number;