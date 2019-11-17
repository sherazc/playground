import {
    createRandomFunctionName,
    jsonpMain
} from "../../commonJsonpService"
import "./app.css";


const buildWidgetHTML = (serverResponse) => {
    let resultHtml = `
        <table id='prayerTimeTable' border='0'>
        <tr>
            <td>123</td>
            <td>456</td></tr>
    `;
/*
    for (let i = 0; i < ayas.length; i++) {
        resultHtml = `${resultHtml}
        <tr>
            <td class='ayaNumber'>(${ayas[i].ayaNumber})</td>
            <td class='ayaArabic'>${ayas[i].lineString}</td>
        </tr>
        <tr>
            <td>&nbsp;</td>
            <td class='ayaTranslation'>${translations[i].lineString}</td>
        </tr>
        `;
    }
*/
    resultHtml = `${resultHtml}
    <tr>
        <td>abc</td>
        <td>
        def
        </td>
    </tr>
    </table>
    `;
    return resultHtml;
};

const callback = (jsonResponse) => {
    const appDiv = document.getElementById(appDivId);
    appDiv.innerHTML = buildWidgetHTML(jsonResponse);
};

// Change these values
const appDivId = prayerTimeAppDivId; // used inside callback function
const serverUrl = prayerTimeServerUrl;

const jsonpFunctionName = createRandomFunctionName();
const jsonpScriptSrc = `${serverUrl}/api/rod?cb=${jsonpFunctionName}`;

jsonpMain(callback, jsonpFunctionName, jsonpScriptSrc);
