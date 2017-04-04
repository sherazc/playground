<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style type="text/css">
    @font-face {
        font-family: 'saleem';
        src: url('${serverUrl}/resources/fonts/saleem.ttf') format('truetype')
    }

    @font-face {
        font-family: 'me_quran';
        src: url('${serverUrl}/resources/fonts/me_quran.ttf') format('truetype')
    }

    #reminder-widget-container {
        width: 800px;
    }

    #reminder_table {
        font-family: Arial;
        text-align: center;
        background-color: #eafff6;
        border-radius: 5px;
        box-shadow: 1px 1px 2px #888888;
        border: 0;
        border-spacing: 0px;
        border-collapse: separate;
        font-size: 80%;
        color: #444;
    }

    .surahTitle {
        font-family: 'saleem';
        font-size: 100%;
    }

    .bismillah {
        font-family: 'saleem';
        color: #062707;
        font-size: 200%;
    }

    .surahTitleDescription {
        font-size: 70%;
    }

    .ayaArabic {
        font-family: 'saleem';
        color: #062707;
        font-size: 200%;
        background-color: #afcddf;
    }

    .ayaTranslation {
    }

    .ayaNumber {
        background-color: #afcddf;
    }

    .ayaTranslationName {
        font-size: 70%;
        color: #666;
    }
</style>
<script type="application/javascript">
    (function () {

        // Localize jQuery variable
        var jQuery;

        /******** Load jQuery if not present *********/
        if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.11.2') {
            var script_tag = document.createElement('script');
            script_tag.setAttribute("type", "text/javascript");
            script_tag.setAttribute("src",
                    "${serverUrl}/resources/lib/jquery/jquery-1.11.2.min.js");
            if (script_tag.readyState) {
                script_tag.onreadystatechange = function () { // For old versions of IE
                    if (this.readyState == 'complete' || this.readyState == 'loaded') {
                        scriptLoadHandler();
                    }
                };
            } else {
                script_tag.onload = scriptLoadHandler;
            }
            // Try to find the head, otherwise default to the documentElement
            (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
        } else {
            // The jQuery version on the window is the one we want to use
            jQuery = window.jQuery;
            main();
        }

        /******** Called once jQuery has loaded ******/
        function scriptLoadHandler() {
            // Restore $ and window.jQuery to their previous values and store the
            // new jQuery in our local jQuery variable
            jQuery = window.jQuery.noConflict(true);
            // Call our main function
            main();
        }

        /******** Our main function ********/
        function main() {
            jQuery(document).ready(function ($) {


                /******* Load CSS *******/
                /*

                 var css_link = $("<link>", {
                 rel: "stylesheet",
                 type: "text/css",
                 href: "style.css"
                 });
                 css_link.appendTo('head');

                 */

                /******* Load HTML *******/
                var jsonp_url = "${serverUrl}/reminder?cb=?";
                $.getJSON(jsonp_url, function (reminderDetail) {
                    if (reminderDetail == null) {
                        return;
                    }
                    $('#reminder-widget-container').html(buildReminderWidgetContainerHTML(reminderDetail));
                });
            });
        }
    })(); // We call our anonymous function immediately

    function buildReminderWidgetContainerHTML(reminderDetail) {

        var ayas = reminderDetail.ayaDetail.ayas;
        var translations = reminderDetail.ayaDetail.translations;

        var translationName = reminderDetail.translationName;
        var suraNumber = reminderDetail.suraNumber;
        var suraNameArabic = reminderDetail.suraNameArabic;
        var suraDescription = reminderDetail.suraDescription;
        var suraNameEnglish = reminderDetail.suraNameEnglish;

        var resultHtml = "<table id='reminder_table' border='0'>";
        resultHtml += "<tr><td colspan='2' class='bismillah'>\n            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ\n</td></tr>";

        for (i = 0; i < ayas.length; i++) {
            resultHtml += "<tr><td class='ayaNumber'>("
            resultHtml += ayas[i].ayaNumber;
            resultHtml += ")</td><td class='ayaArabic'>";
            resultHtml += ayas[i].lineString
            resultHtml += "</td></tr>";

            resultHtml += "<tr><td></td><td class='ayaTranslation'>";
            resultHtml += translations[i].lineString
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
</script>
<div id="reminder-widget-container"></div>
