import {
    createRandomFunctionName,
    jsonpMain
} from "../../commonJsonpService"
import "./app.scss";
import {dateToDisplayDateShort, isoDateToJsDate} from "mdb-core-js";

const buildWidgetHTML = (serverResponse) => {
    // Error result
    if (!serverResponse || !serverResponse.successful || !serverResponse.target || serverResponse.target.length < 1) {
        return `
        <div class="jsContainer">
            <div class="jsHeader">
                Jum'ah Schedule
            </div>
            <div class="jsTableContainer" style="padding: 10px">
                Jum'ah Schedule not found.
            </div>
        <div>
        `;
    }

    let jummahTableRows = "";
    for(let i=0; i < serverResponse.target.length; i++) {
        let jummah = serverResponse.target[i];
        jummahTableRows += `
            <tr>
                <td>
                    ${dateToDisplayDateShort(isoDateToJsDate((jummah.date)))}
                </td>
                <td>
                    ${jummah.khateeb}
                </td>
            </tr>
        
        `;
    }


    // Valid result
    let resultHtml = `
    <div class="jsContainer">
        <div class="jsHeader">Jum'ah Schedule</div>
        <div class="jsTableContainer">
            <table class='jsTable' border='0'>
            <thead>
            <tr>
                <th>Date</th>
                <th>Khateeb</th>
            </tr>
            </thead>
            <tbody>
            ${jummahTableRows}
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
const appDivId = jummahScheduleAppDivId; // used inside callback function
const serverUrl = jummahScheduleServerUrl;

const jsonpFunctionName = createRandomFunctionName();
const jsonpScriptSrc = `${serverUrl}/api/jummah/companyId/${companyId}?cb=${jsonpFunctionName}`;

jsonpMain(callback, jsonpFunctionName, jsonpScriptSrc);
