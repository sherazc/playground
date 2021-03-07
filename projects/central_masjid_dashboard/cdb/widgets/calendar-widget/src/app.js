import "./app.scss";

const buildWidgetHTML = () => {
    let resultHtml = `
    <div class="calendarContainer">
        <iframe src="${serverUrl}/calendar/${companyUrl}"></iframe>
    </div>
    `;

    return resultHtml;
};

const callback = () => {
    const appDiv = document.getElementById(appDivId);
    appDiv.innerHTML = buildWidgetHTML();
};

// these variables are used inside callback function
const appDivId = calendarAppDivId;
const serverUrl = calendarServerUrl;

callback();
