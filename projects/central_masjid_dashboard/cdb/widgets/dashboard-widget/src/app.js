import "./app.css";
import {
    time24To12,
    dateToDisplayDateShort,
} from "../../../ui/src/services/utilities";


const buildWidgetHTML = () => {
    let resultHtml = `
    <div class="dbContainer">
        Dashboard
    </div>
    `;

    return resultHtml;
};

const callback = () => {
    const appDiv = document.getElementById(appDivId);
    appDiv.innerHTML = buildWidgetHTML();
};

callback();