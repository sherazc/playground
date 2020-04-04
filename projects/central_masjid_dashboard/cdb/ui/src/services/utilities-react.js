import React from "react";
import {fieldErrorsToKvList} from "./utilities";

export const lineFeedToBr = (str) => {
    if (!str) {
        return "";
    }
    return str.split('\n').map((item, index) => {
        return <span key={index}>{item}<br/></span>;
    });
};

export const makeFieldFieldErrorsUl = (fieldErrors) => {
    if (!fieldErrors || fieldErrors.length < 1) {
        return;
    }
    const errorsKvList = fieldErrorsToKvList(fieldErrors);
    return (<ul>
        {errorsKvList.map((errorKv, index) => <li key={index}><b>{errorKv.key}</b>: {errorKv.value} </li>)}
    </ul>);
};
