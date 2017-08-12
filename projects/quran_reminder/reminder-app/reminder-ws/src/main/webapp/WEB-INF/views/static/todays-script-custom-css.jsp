<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>

</head>
<body>
<h3>Testing Script - Custom CSS</h3>
<%--http://alexmarandon.com/articles/web_widget_jquery/--%>

<!-- qrotd-widget -->
<div id="qrotd-widget-container"></div>
<script>
    var serviceURL = "${serverUrl}/today?css=false";
</script>
<script src="${serverUrl}/resources/lib/jquery/jquery-1.11.2.min.js"></script>
<script src="${serverUrl}/resources/js/qrotd-widget-1.0.js" type="text/javascript"></script>
<style type="text/css">
    #qrotd-widget-container {
        width: 400px;
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
<!--/ qrotd-widget -->

<h3>Page Content - Custom CSS</h3>
</body>
</html>
