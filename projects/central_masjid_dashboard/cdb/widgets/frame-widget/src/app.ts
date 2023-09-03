import "./app.scss";

(() => {
    // @ts-ignore
    const appName = appNamePrefix;

    // @ts-ignore
    const appDivId = window[`${appName}AppDivId`];

    // @ts-ignore
    const serverUrl = window[`${appName}ServerUrl`];

    const buildWidgetHTML = () => {
        // @ts-ignore
        const cUrl = companyUrl;
        return `
    <div class="iframeContainer">
        <iframe id="${appName}Iframe"  frameborder="0" allowfullscreen  src="${serverUrl}/expense/${cUrl}"></iframe>
    </div>
    `;
    };

    const callback = () => {
        const appDiv = document.getElementById(appDivId);

        // @ts-ignore
        appDiv.innerHTML = buildWidgetHTML();

        // sends message to iframe. iframe resizes it self.
        window.addEventListener("message", function (event) {

            const iframe = document.getElementById(`${appName}Iframe`);
            const dimensions = event.data.dimensions;
            if (iframe && dimensions && dimensions.height && dimensions.height > 0) {
                // @ts-ignore
                iframe.height = dimensions.height + 20;

            }
        });
    };


    callback();
})();

