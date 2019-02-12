import React, {Component} from "react";

import {addUnit} from "../../../../services/utilities";

const ImageSeparator = (props) => {
    const widthUnit = addUnit(props.width);
    const heightUnit = addUnit(props.height);

    const container = {
        backgroundColor: "yellow",
        float: "left",
        height: heightUnit,
        width: widthUnit
    };

    const image = {
        backgroundImage: `url(${props.image})`,
        backgroundSize: "100% 100%",
        position: "relative",
        top: "0px",
        height: heightUnit,
        width: widthUnit
    };
    //console.log("image", props.image);

    return (
        <div style={container}>
            {/*<img src={props.image} style={image}/>*/}
            <div style={image}></div>
        </div>
    );
};

export default ImageSeparator;