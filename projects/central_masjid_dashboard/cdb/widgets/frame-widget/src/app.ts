import "./app.scss";

const buildWidgetHTML = () => {
    // @ts-ignore
    const cUrl = companyUrl;
    return `
    <div class="calendarContainer">
        <iframe id="calendarIframe"  frameborder="0" allowfullscreen  src="${serverUrl}/expense/${cUrl}"></iframe>
    </div>
    `;
};

const callback = () => {
    const appDiv = document.getElementById(appDivId);

    // @ts-ignore
    appDiv.innerHTML = buildWidgetHTML();

    // sends message to iframe. iframe resizes it self.
    window.addEventListener("message", function (event) {
        console.log("testing")
        const calendarIframe = document.getElementById("calendarIframe");
        const dimensions = event.data.dimensions;
        if (calendarIframe && dimensions && dimensions.height && dimensions.height > 0) {
            // @ts-ignore
            calendarIframe.height = dimensions.height + 20;

        }
    });
};



// these variables are used inside callback function
// @ts-ignore
const appDivId = calendarAppDivId;
// @ts-ignore
const serverUrl = calendarServerUrl;

callback();
