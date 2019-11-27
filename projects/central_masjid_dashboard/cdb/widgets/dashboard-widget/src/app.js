import "./app.scss";
import {
    time24To12,
    dateToDisplayDateShort,
} from "../../../ui/src/services/utilities";


const buildWidgetHTML = () => {
    let resultHtml = `
    <div class="abc">
        Dashboard
    </div>
    `;

    return resultHtml;
};

const callback = () => {
    const appDiv = document.getElementById(appDivId);
    appDiv.innerHTML = buildWidgetHTML();
};


const appDivId = dashboardAppDivId; // used inside callback function

callback();