import React from "react";

export const lineFeedToBr = (str) => {
    if (!str) {
        return "";
    }
    return str.split('\n').map((item, index) => {
        return <span key={index}>{item}<br/></span>;
    });
};
