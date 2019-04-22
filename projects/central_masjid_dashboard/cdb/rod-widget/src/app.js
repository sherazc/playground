buildReminderWidgetContainerHTML = (reminderDetail) => {

    var ayas = reminderDetail.ayaDetail.ayas;
    var translations = reminderDetail.ayaDetail.translations;

    var translationName = reminderDetail.translationName;
    var suraNumber = reminderDetail.suraNumber;
    var suraNameArabic = reminderDetail.suraNameArabic;
    var suraDescription = reminderDetail.suraDescription;
    var suraNameEnglish = reminderDetail.suraNameEnglish;

    var resultHtml = "<table id='reminder_table' border='1'>";
    resultHtml += "<tr><td colspan='2' class='bismillah'>            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</td></tr>";

    for (i = 0; i < ayas.length; i++) {
        resultHtml += "<tr><td class='ayaNumber'>(";
        resultHtml += ayas[i].ayaNumber;
        resultHtml += ")</td><td class='ayaArabic'>";
        resultHtml += ayas[i].lineString;
        resultHtml += "</td></tr>";

        resultHtml += "<tr><td></td><td class='ayaTranslation'>";
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

function createJasonScriptElement() {
    const serviceUrl = `${rodServiceUrl}?cb=${rodCallbackName}`;
    const jsonpScriptElement = document.createElement("script");

    jsonpScriptElement.src = serviceUrl;
    jsonpScriptElement.id = rodCallbackName;
    return jsonpScriptElement;
}

const main = () => {
    const bodyElement = document.getElementsByTagName("body")[0];

    window[rodCallbackName] = (reminderDetail) => {
        rodCallback(reminderDetail);
    };
    const jsonpScriptElement = createJasonScriptElement();
    bodyElement.appendChild(jsonpScriptElement);
    document.getElementById(rodCallbackName).remove();
};

const rodCallbackName = createRodCallbackName();
main();
