import React, {Component, useState} from "react";
import {dateToDisplayDate, time24To12} from "../../../services/utilities";

export default (props) => {
    const {prayer} = props;
    return (
        <tr>
            <td>{dateToDisplayDate(prayer.date)}</td>
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
