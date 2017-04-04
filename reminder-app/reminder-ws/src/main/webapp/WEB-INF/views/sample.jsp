<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<html>
<head>
    <title>Build</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${contextPath}/resources/lib/bootstrap-3.3.2/css/bootstrap.min.css">
    <script src="${contextPath}/resources/lib/jquery/jquery-1.11.2.min.js"></script>
    <script src="${contextPath}/resources/lib/bootstrap-3.3.2/js/bootstrap.min.js"></script>
</head>
<body>
<div id="sm_main_middle">
    <b>Reminder Widget</b>
    <p>
        Copy paste these lines to add the Reminder widget.
        <br/>
        <i>You can use your own stylesheet instead using pre-build stylesheet.</i>
    </p>
    <div style="border: solid 1px #868686; width: 900px; padding: 10px">
<!--
Escaped HTML characters by using this link.
http://www.freeformatter.com/html-escape.html
-->
<pre>
&lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;${serverUrl}/static/reminder-widget-style&quot;&gt;
&lt;script type=&quot;application/javascript&quot; src=&quot;${serverUrl}/static/reminder-widget-script&quot;&gt;&lt;/script&gt;
&lt;div id=&quot;reminder-widget-container&quot;&gt;&lt;/div&gt;
</pre>
    </div>
    <i>You can use these fonts</i>
    <div style="border: solid 1px #868686; width: 900px; padding: 10px">
<pre>
&lt;style type=&quot;text/css&quot; rel=&quot;stylesheet&quot;&gt;
    @font-face {
        font-family: 'saleem';
        src: url('${serverUrl}/resources/fonts/saleem.ttf') format('truetype')
    }

    @font-face {
        font-family: 'me_quran';
        src: url('${serverUrl}/resources/fonts/me_quran.ttf') format('truetype')
    }
&lt;/style&gt;
</pre>
    </div>
    <hr/>
    <link rel="stylesheet" type="text/css" href="${serverUrl}/static/reminder-widget-style">
    <script type="application/javascript" src="${serverUrl}/static/reminder-widget-script"></script>
    <div id="reminder-widget-container"></div>
    <hr/>
</div>
</body>
</html>
