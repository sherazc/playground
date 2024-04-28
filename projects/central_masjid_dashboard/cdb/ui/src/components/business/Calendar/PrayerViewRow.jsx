import React, {Component, useState} from "react";
import {dateToDisplayDate, isoDateToJsDate, time24To12} from "mdb-core-js";

export default (props) => {
    const {prayer} = props;
    return (
        <tr>
            <td>{dateToDisplayDate(isoDateToJsDate(prayer.date))}</td>
            <td>{prayer.hijriString}</td>
            <td>
                <div>{time24To12(prayer.fajr)}</div>
                <div>{time24To12(prayer.fajrIqama)}</div>
            </td>
            <td>{time24To12(prayer.sunrise)}</td>
            <td>
                <div>{time24To12(prayer.dhuhr)}</div>
                <div>{time24To12(prayer.dhuhrIqama)}</div>
            </td>
            <td>
                <div>{time24To12(prayer.asr)}</div>
                <div>{time24To12(prayer.asrIqama)}</div>
            </td>
            <td>
                <div>{time24To12(prayer.maghrib)}</div>
                <div>{time24To12(prayer.maghribIqama)}</div>
            </td>
            <td>
                <div>{time24To12(prayer.isha)}</div>
                <div>{time24To12(prayer.ishaIqama)}</div>
            </td>
        </tr>
    );
}
