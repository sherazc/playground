import "./app.scss";

(() => {
    // @ts-ignore
    const appName = appNamePrefix;
    // @ts-ignore
    const serverUrl = window[`${appName}ServerUrl`];
    // @ts-ignore
    const appUrl = window[`${appName}AppUrl`];

    document.write(`<div style="height: fit-content" id="${appName}App"></div>`);

    const buildWidgetHTML = () => {
        return `
    <div class="iframeContainer">
        <iframe id="${appName}Iframe"  frameborder="0" allowfullscreen src="${serverUrl}/${appUrl}"></iframe>
    </div>
    `;
    };

    const appDiv = document.getElementById(`${appName}App`);

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
})();

