import React from "react";

export default ({
    id = "cpb_svg_path_",
    style = {},
    stroke = "#000",
    fill = "none",
    width = "100%",
    className = "",
    viewBox = "0 0 500 500",
    strokeDasharray = "10 100", // dash-line dash-gap
    strokeDashoffset = "0"
}) => {


    return (
        <svg
            width={width}
            style={style}
            height={width}
            viewBox={viewBox}
            xmlns="http://www.w3.org/2000/svg"
            className={`svg-icon ${className || ""}`}
            xmlnsXlink="http://www.w3.org/1999/xlink">
            <g transform="translate(0 -164.71)">
                <path id={id}
                    d="m490 414.71a240 240 0 0 1 -240 240 240 240 0 0 1 -240 -240 240 240 0 0 1 240 -240 240 240 0 0 1 240 240z"
                    fill={fill}
                    stroke={stroke}
                    strokeMiterlimit="2"
                    strokeWidth="20"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                />
            </g>
        </svg>
    )
};