import React from "react";

export default ({
                    id = "circleProgressBarSvg",
                    style = {},
                    stroke = "#000",
                    fill = "none",
                    width = "100%",
                    className = "",
                    viewBox = "0 0 500 500",
                    strokeDasharray="1540 1540",
                    strokeDashoffset="0"
                }) => (
    <svg
        id={id}
        width={width}
        style={style}
        height={width}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        className={`svg-icon ${className || ""}`}
        xmlnsXlink="http://www.w3.org/1999/xlink">
        <g transform="translate(0 -164.71)">
            <path
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
);