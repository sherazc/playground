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

            {/*
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
 */}


            <g transform="translate(0 -164.71)">
                <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="2">
                    <circle cx="250" cy="414.71" r="230" stroke="#ecedd1" strokeWidth="30" />
                </g>
                <path id={id}
                    d="m480 414.71a230 230 0 0 1 -230 230 230 230 0 0 1 -230 -230 230 230 0 0 1 230 -230 230 230 0 0 1 230 230z"
                    fill={fill}
                    stroke={stroke}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="2"
                    strokeWidth="30"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                />
            </g>

        </svg>
    )
};