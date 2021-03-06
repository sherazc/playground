import React, {Component, useState} from "react";
import {dateToDisplayDate, time24To12} from "../../../services/utilities";

export default (props) => {
    const {prayer} = props;
    return (
        <tr>
            <td>{dateToDisplayDate(prayer.date)}</td>
            <td>{prayer.hijriString}</td>
            <td>{time24To12(prayer.fajr)}</td>
            <td>{time24To12(prayer.fajrIqama)}</td>
            <td>{time24To12(prayer.sunrise)}</td>
            <td>{time24To12(prayer.dhuhr)}</td>
            <td>{time24To12(prayer.dhuhrIqama)}</td>
            <td>{time24To12(prayer.asr)}</td>
            <td>{time24To12(prayer.asrIqama)}</td>
            <td>{time24To12(prayer.maghrib)}</td>
            <td>{time24To12(prayer.isha)}</td>
            <td>{time24To12(prayer.ishaIqama)}</td>
        </tr>
    );
}
