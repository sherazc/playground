import "./app.scss";

(() => {

    // @ts-ignore
    const appDivId = window[`${appNamePrefix}AppDivId`];

    // @ts-ignore
    const serverUrl = window[`${appNamePrefix}ServerUrl`];

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

            const iframe = document.getElementById("calendarIframe");
            const dimensions = event.data.dimensions;
            if (iframe && dimensions && dimensions.height && dimensions.height > 0) {
                // @ts-ignore
                iframe.height = dimensions.height + 20;

            }
        });
    };


    callback();
})();

