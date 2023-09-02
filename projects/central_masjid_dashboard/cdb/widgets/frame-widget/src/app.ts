import "./app.scss";

const buildWidgetHTML = () => {
    // @ts-ignore
    const cUrl = companyUrl;
    let resultHtml = `
    <div class="calendarContainer">
        <iframe id="calendarIframe"  frameborder="0" allowfullscreen  src="${serverUrl}/calendar/${cUrl}"></iframe>
    </div>
    `;


    return resultHtml;
};

const callback = () => {
    const appDiv = document.getElementById(appDivId);

    // @ts-ignore
    appDiv.innerHTML = buildWidgetHTML();

    window.addEventListener("message", function (event) {
        const calendarIframe = document.getElementById("calendarIframe");
        const dimensions = event.data.dimensions;
        if (calendarIframe && dimensions && dimensions.height && dimensions.height > 0) {
            // @ts-ignore
            calendarIframe.height = dimensions.height + 200;

        }
    });
};



// these variables are used inside callback function
// @ts-ignore
const appDivId = calendarAppDivId;
// @ts-ignore
const serverUrl = calendarServerUrl;

callback();
