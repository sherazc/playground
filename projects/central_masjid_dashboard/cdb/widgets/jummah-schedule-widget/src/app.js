import {
    createRandomFunctionName,
    jsonpMain
} from "../../commonJsonpService"
import "./app.scss";
import {
    time24To12,
    dateToDisplayDateShort,
    getQueryParam
} from "../../../ui/src/services/utilities";

const buildWidgetHTML = (serverResponse) => {
    // Error result
    if (!serverResponse || !serverResponse.successful || !serverResponse.target || serverResponse.target.length < 1) {
        return `
        <div class="ptContainer">
            <div class="ptHeader">
                Jummah Schedule
            </div>
            <div class="ptTableContainer">
                Jummah Schedule not found.
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
                    ${dateToDisplayDateShort(jummah.date)}
                </td>
                <td>
                    ${jummah.khateeb}
                </td>
            </tr>
        
        `;
    }


    // Valid result
    let resultHtml = `
    <div class="ptContainer">
        <div class="ptHeader">Jummah Schedule</div>
        <div class="ptTableContainer">
            <table class='ptTable' border='0'>
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
