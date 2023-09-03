import "./app.scss";

const buildWidgetHTML = () => {
    let resultHtml = `
    <div class="iframeContainer">
        <iframe id="calendarIframe"  frameborder="0" allowfullscreen  src="${serverUrl}/calendar/${companyUrl}"></iframe>
    </div>
    `;

    return resultHtml;
};

const callback = () => {
    const appDiv = document.getElementById(appDivId);
    appDiv.innerHTML = buildWidgetHTML();

    window.addEventListener("message", function (event) {
        const calendarIframe = document.getElementById("calendarIframe");
        const dimensions = event.data.dimensions;
        if (calendarIframe && dimensions && dimensions.height && dimensions.height > 0) {
            calendarIframe.height = dimensions.height + 200;

        }
    });
};



// these variables are used inside callback function
const appDivId = calendarAppDivId;
const serverUrl = calendarServerUrl;

callback();
