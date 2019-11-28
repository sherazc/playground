import "./app.scss";
/*
import {
    time24To12,
    dateToDisplayDateShort
} from "../../../ui/src/services/utilities";
*/

const buildWidgetHTML = () => {
    let resultHtml = `
    <div class="dbContainer">
        <iframe src="${serverUrl}/${companyUrl}"></iframe>
    </div>
    `;

    return resultHtml;
};

const callback = () => {
    const appDiv = document.getElementById(appDivId);
    appDiv.innerHTML = buildWidgetHTML();
};

// these variables are used inside callback function
const appDivId = dashboardAppDivId;
const serverUrl = dashboardServerUrl;

callback();