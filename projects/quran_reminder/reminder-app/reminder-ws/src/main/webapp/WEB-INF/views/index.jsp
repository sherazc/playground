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
    <form action="/" method="GET">
        <label for="callback">Callback Method Name: </label>
        <input type="text" name="callback" id="callback" value="${callback}"/>

        <label for="translation">Translation: </label>
        <select id="translation" name="translation">
            <c:forEach items="${translationNames}" var="translationName">
                <c:choose>
                    <c:when test="${translationName eq translation}">
                        <option selected="selected">${translationName}</option>
                    </c:when>
                    <c:otherwise>
                        <option>${translationName}</option>
                    </c:otherwise>
                </c:choose>
            </c:forEach>
        </select>

        <input class="center" type="submit" value="submit"/>
    </form>

    <div class="jumbotron" style="margin-top: 20px">
        <p>
            <b>Service URL</b>
            <br/>
            <a href="${serviceUrl}">${serviceUrl}</a>
        </p>

        <p>
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

        </p>
        <p>
            <b>Sample Widget Page</b>
            <br/>
            <a href="${serverUrl}/sample">${serverUrl}/sample</a>
        </p>
        <p>
            <b>All Widget Scripts In One</b>
            <br/>
            <a href="${serverUrl}/static/jsonp-all-in-one">${serverUrl}/static/jsonp-all-in-one</a>
        </p>
        <p>
            <b>Flat HTML - Today's Reminder</b>
            <br/>
            <a href="${serverUrl}/today">${serverUrl}/today</a>
        </p>
        <p>
            <b>Flat HTML - Today's Reminder - No CSS</b>
            <br/>
            <a href="${serverUrl}/today?css=false">${serverUrl}/today?css=false</a>
        </p>
        <p>
            <b>AJAX - Today's Reminder</b>
            <br/>
            <a href="${serverUrl}/static/todays-script">${serverUrl}/static/todays-script</a>
        </p>
        <p>
            <b>AJAX - Today's Reminder - Custom CSS</b>
            <br/>
            <a href="${serverUrl}/static/todays-script-custom-css">${serverUrl}/static/todays-script-custom-css</a>
        </p>
    </div>
</div>
</body>
</html>
