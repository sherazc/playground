import "./app.css";

const buildReminderWidgetContainerHTML = (reminderDetail) => {
    let ayas = reminderDetail.ayaDetail.ayas;
    let translations = reminderDetail.ayaDetail.translations;

    let translationName = reminderDetail.translationName;
    let suraNumber = reminderDetail.suraNumber;
    let suraNameArabic = reminderDetail.suraNameArabic;
    let suraDescription = reminderDetail.suraDescription;
    let suraNameEnglish = reminderDetail.suraNameEnglish;

    let resultHtml = "<table id='reminder_table' border='0'>";
    resultHtml += "<tr><td>&nbsp;</td><td class='bismillah'>            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</td></tr>";

    for (let i = 0; i < ayas.length; i++) {
        resultHtml += "<tr><td class='ayaNumber'>(";
        resultHtml += ayas[i].ayaNumber;
        resultHtml += ")</td><td class='ayaArabic'>";
        resultHtml += ayas[i].lineString;
        resultHtml += "</td></tr>";

        resultHtml += "<tr><td>&nbsp;</td><td class='ayaTranslation'>";
        resultHtml += translations[i].lineString;
        resultHtml += "</td></tr>";
    }

    resultHtml += "<tr><td>&nbsp;</td><td>";
    resultHtml += "<span class='surahTitleDescription'>";
    resultHtml += (suraNameEnglish + " - " + suraDescription + " (" + suraNumber + ") ");
    resultHtml += "</span>&nbsp;|&nbsp;";
    resultHtml += "<span class='surahTitle'>";
    resultHtml += suraNameArabic;
    resultHtml += "</span>&nbsp;|&nbsp;";
    resultHtml += "<span class='ayaTranslationName'>";
    resultHtml += ("Translation - " + translationName);
    resultHtml += "</span>";
    resultHtml += "</td></tr>";
    resultHtml += "</table>";
    return resultHtml;
};

const createPtCallbackName = () => {
    const randomNumber = Math.round(100000 * Math.random());
    return `cb_${randomNumber}`;
};

const ptCallback = (reminderDetails) => {
    const rodAppDiv = document.getElementById(ptAppDivId);
    rodAppDiv.innerHTML = buildReminderWidgetContainerHTML(reminderDetails);
};

const createJasonScriptElement = () => {
    const jsonpScriptElement = document.createElement("script");
    jsonpScriptElement.src = `${ptServerUrl}/api/rod?cb=${ptCallbackName}`;
    jsonpScriptElement.id = ptCallbackName;
    return jsonpScriptElement;
};

const addArabicFontStyle = () => {
    const arabicFontStyle = "arabicFontStyle";
    const existingStyleElement = document.getElementById(arabicFontStyle);
    if (existingStyleElement) {
        return;
    }
    const fontMeQuran = `${ptServerUrl}/static/fonts/me_quran.ttf`;
    const fontSaleem = `${ptServerUrl}/static/fonts/saleem.ttf`;

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

const main = () => {
    const bodyElement = document.getElementsByTagName("body")[0];

    // Create JSONP callback function. This function will receive JSON from server
    window[ptCallbackName] = (reminderDetail) => {
        ptCallback(reminderDetail);
    };

    // jsonp script element
    const jsonpScriptElement = createJasonScriptElement();
    bodyElement.appendChild(jsonpScriptElement);

    addArabicFontStyle();

    // Clean up
    document.getElementById(ptCallbackName).remove();
};

// Create Random callback name
const ptCallbackName = createPtCallbackName();

console.log(ptCallbackName);

main();
