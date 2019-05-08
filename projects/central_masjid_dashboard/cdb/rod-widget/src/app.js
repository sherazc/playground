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
    resultHtml += "<tr><td colspan='2' class='bismillah'>            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</td></tr>";

    for (let i = 0; i < ayas.length; i++) {
        resultHtml += "<tr><td class='ayaNumber'>(";
        resultHtml += ayas[i].ayaNumber;
        resultHtml += ")</td><td class='ayaArabic'>";
        resultHtml += ayas[i].lineString;
        resultHtml += "</td></tr>";

        resultHtml += "<tr><td colspan='2' class='ayaTranslation'>";
        resultHtml += translations[i].lineString;
        resultHtml += "</td></tr>";
    }

    resultHtml += "<tr><td colspan='2'>";
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

const createRodCallbackName = () => {
    const randomNumber = Math.round(100000 * Math.random());
    return `cb_${randomNumber}`;
};

const rodCallback = (reminderDetails) => {
    const rodAppDiv = document.getElementById(rodAppDivId);
    rodAppDiv.innerHTML = buildReminderWidgetContainerHTML(reminderDetails);
};

const createJasonScriptElement = () => {
    const jsonpScriptElement = document.createElement("script");
    jsonpScriptElement.src = `${rodServerUrl}/api/rod?cb=${rodCallbackName}`;
    jsonpScriptElement.id = rodCallbackName;
    return jsonpScriptElement;
};

const addArabicFontStyle = () => {
    const arabicFontStyle = "arabicFontStyle";
    const existingStyleElement = document.getElementById(arabicFontStyle);
    if (existingStyleElement) {
        return;
    }
    const fontMeQuran = `${rodServerUrl}/static/fonts/me_quran.ttf`;
    const fontSaleem = `${rodServerUrl}/static/fonts/saleem.ttf`;

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

    // jsonp callback function. This function will receive
    window[rodCallbackName] = (reminderDetail) => {
        rodCallback(reminderDetail);
    };

    // jsonp script element
    const jsonpScriptElement = createJasonScriptElement();
    bodyElement.appendChild(jsonpScriptElement);

    addArabicFontStyle();

    // Clean up
    document.getElementById(rodCallbackName).remove();
};

const rodCallbackName = createRodCallbackName();

main();
