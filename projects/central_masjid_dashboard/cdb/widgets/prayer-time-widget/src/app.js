import {
    createRandomFunctionName,
    jsonpMain
} from "../../commonJsonpService"
import "./app.css";

import {
    isoDateToJsDate,
    time24To12,
    dateToDisplayDateShort, dateToDisplayDateLong, hijriStringToDisplayDateLong
} from "mdb-core-js";

const buildWidgetHTML = (serverResponse) => {
    if (!serverResponse || !serverResponse.successful || !serverResponse.target) {
        return `
        <div class="ptContainer">
            <div class="ptHeader">
                Prayer Time
            </div>
            <div class="ptTableContainer">
                Prayers Not found.
            </div>
        <div>
        `;
    }
    const prayer = serverResponse.target;

    let resultHtml = `
        <div class="ptContainer">
        <div style="padding: 10px; text-align: center">
            <div>
                ${dateToDisplayDateLong(isoDateToJsDate(prayer.date))}
            </div>
            <div>
                ${hijriStringToDisplayDateLong(prayer.hijriString)}
            </div>
        </div>
        <div class="ptHeader">Prayer Time</div>
        <div class="ptTableContainer">
            <table class='ptTable' border='0'>
            <thead>
            <tr>
                <th>&nbsp;</th>
                <th>Azan</th>
                <th>Iqama</th>
                <th>Next Change</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th>Fajr</th>
                <td>${time24To12(prayer.fajr)}</td>
                <td>${time24To12(prayer.fajrIqama)}</td>
                <td>
                    ${dateToDisplayDateShort(isoDateToJsDate(prayer.fajrChangeDate))}
                    <br/>
                    ${time24To12(prayer.fajrChange)}
                </td>
            </tr>
            <tr>
                <th>Shurooq</th>
                <td colSpan="3">${time24To12(prayer.sunrise)}</td>
            </tr>
            <tr>
                <th>Zuhr</th>
                <td>${time24To12(prayer.dhuhr)}</td>
                <td>${time24To12(prayer.dhuhrIqama)}</td>
                <td>
                    ${dateToDisplayDateShort(isoDateToJsDate(prayer.dhuhrChangeDate))}
                    <br/>
                    ${time24To12(prayer.dhuhrChange)}
                </td>
            </tr>
            <tr>
                <th>Asr</th>
                <td>${time24To12(prayer.asr)}</td>
                <td>${time24To12(prayer.asrIqama)}</td>
                <td>
                    ${dateToDisplayDateShort(isoDateToJsDate(prayer.asrChangeDate))}
                    <br/>
                    ${time24To12(prayer.asrChange)}
                </td>
            </tr>
            <tr>
                <th>Maghrib</th>
                <td>${time24To12(prayer.maghrib)}</td>
                <td>${prayer.maghribIqama}</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <th>Isha</th>
                <td>${time24To12(prayer.isha)}</td>
                <td>${time24To12(prayer.ishaIqama)}</td>
                <td>
                    ${dateToDisplayDateShort(isoDateToJsDate(prayer.ishaChangeDate))}
                    <br/>
                    ${time24To12(prayer.ishaChange)}
                </td>
            </tr>
            </tbody>
            </table>
        </div>
    </div>
    `;
    return resultHtml;
};

const callback = (jsonResponse) => {
    const appDiv = document.getElementById(appDivId);
    appDiv.innerHTML = buildWidgetHTML(jsonResponse);
};

// Change these values
const appDivId = prayerTimeAppDivId; // used inside callback function
const serverUrl = prayerTimeServerUrl;
const today = new Date();
const month = today.getMonth() + 1;
const date = today.getDate();
isoDateToJsDate()

const jsonpFunctionName = createRandomFunctionName();
const jsonpScriptSrc = `${serverUrl}/api/prayer/companyId/${companyId}/month/${month}/day/${date}?cb=${jsonpFunctionName}`;

jsonpMain(callback, jsonpFunctionName, jsonpScriptSrc);
