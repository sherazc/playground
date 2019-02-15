import React from "react";

import {addUnit} from "../../../../services/utilities";

const ImageSeparator = (props) => {
    const widthUnit = addUnit(props.width);
    const heightUnit = addUnit(props.height);

    const container = {
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

    return (
        <div style={container}>
            <div style={image}></div>
        </div>
    );
};

export default ImageSeparator;
