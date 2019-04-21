function buildReminderWidgetContainerHTML(reminderDetail) {

    var ayas = reminderDetail.ayaDetail.ayas;
    var translations = reminderDetail.ayaDetail.translations;

    var translationName = reminderDetail.translationName;
    var suraNumber = reminderDetail.suraNumber;
    var suraNameArabic = reminderDetail.suraNameArabic;
    var suraDescription = reminderDetail.suraDescription;
    var suraNameEnglish = reminderDetail.suraNameEnglish;

    var resultHtml = "<table id='reminder_table' border='0'>";
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
}

console.log(fetch);


const main = () => {

    const rodAppDiv = document.getElementById(rodAppDivId);

    const currentMillis = (new Date()).getTime();

    // const serviceUrl = "http://localhost:8085/api/rod?history=0&cb=cb";
    const serviceUrl = "http://localhost:8085/api/rod";

    fetch(serviceUrl).then(
        response => response.json()
            .then(data => {
                console.log(data)
                rodAppDiv.innerHTML = buildReminderWidgetContainerHTML(data);
            })
        ,
        (error) => {
            console.log(error);
        }
    );

};

main();

// buildReminderWidgetContainerHTML()