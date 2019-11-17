import {
    createRandomFunctionName,
    jsonpMain
} from "../../commonJsonpService"
import "./app.css";

const addArabicFontStyle = (serverUrl) => {
    const arabicFontStyle = "arabicFontStyle";
    const existingStyleElement = document.getElementById(arabicFontStyle);
    if (existingStyleElement) {
        return;
    }
    const fontMeQuran = `${serverUrl}/static/fonts/me_quran.ttf`;
    const fontSaleem = `${serverUrl}/static/fonts/saleem.ttf`;

    const styleElement = document.createElement("style");
    styleElement.id = arabicFontStyle;

    styleElement.appendChild(document.createTextNode(`
        @font-face {
            font-family: 'saleem';
            src: url('${fontSaleem}') format('truetype')
        }
        
        @font-face {
            font-family: 'me_quran';
            src: url('${fontMeQuran}') format('truetype')
        }
    `));

    document.getElementsByTagName("head")[0].appendChild(styleElement);
};

// Custom function that receive server response and build html
const buildWidgetHTML = (reminderDetail) => {
    let ayas = reminderDetail.ayaDetail.ayas;
    let translations = reminderDetail.ayaDetail.translations;

    let translationName = reminderDetail.translationName;
    let suraNumber = reminderDetail.suraNumber;
    let suraNameArabic = reminderDetail.suraNameArabic;
    let suraDescription = reminderDetail.suraDescription;
    let suraNameEnglish = reminderDetail.suraNameEnglish;

    let resultHtml = `
        <table id='reminder_table' border='0'>
        <tr><td>&nbsp;</td><td class='bismillah'>بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</td></tr>
    `;

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

    resultHtml = `${resultHtml}
    <tr>
        <td>&nbsp;</td>
        <td>
            <span class='surahTitleDescription'>
                ${suraNameEnglish} - ${suraDescription} (${suraNumber})
            </span>&nbsp;|&nbsp;
            <span class='surahTitle'>
                ${suraNameArabic}
            </span>&nbsp;|&nbsp;
            <span class='ayaTranslationName'>
                Translation - ${translationName}
            </span>
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
const appDivId = rodAppDivId; // used inside callback function
const serverUrl = rodServerUrl;

const jsonpFunctionName = createRandomFunctionName();
const jsonpScriptSrc = `${serverUrl}/api/rod?cb=${jsonpFunctionName}`;

addArabicFontStyle(serverUrl);
jsonpMain(callback, jsonpFunctionName, jsonpScriptSrc);
