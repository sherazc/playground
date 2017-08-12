<%@ page import="com.sc.reminder.ws.util.CommonUtil" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%
    request.setAttribute("contextPath", request.getContextPath());
    request.setAttribute("serverUrl", CommonUtil.createServerUrl(request));
%>
<html>
<head>
    <title>Reminder Web Service - <sitemesh:write property="title"/></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${contextPath}/resources/lib/bootstrap-3.3.2/css/bootstrap.min.css">
    <script src="${contextPath}/resources/lib/jquery/jquery-1.11.2.min.js"></script>
    <script src="${contextPath}/resources/lib/bootstrap-3.3.2/js/bootstrap.min.js"></script>
    <script src="${contextPath}/resources/lib/simple_ajax_uploaders/SimpleAjaxUploader.min.js"></script>
    <link rel="stylesheet" href="${contextPath}/resources/css/main.css">
    <style type="text/css" rel="stylesheet">
        @font-face {
            font-family: 'saleem';
            src: url('${serverUrl}/resources/fonts/saleem.ttf') format('truetype')
        }

        @font-face {
            font-family: 'me_quran';
            src: url('${serverUrl}/resources/fonts/me_quran.ttf') format('truetype')
        }
    </style>
</head>
<body>

<div class="container">

    <div class="row">
        <div class="col-md-12" style="background-color: #28a4c9; color: white;">

            <h1 style="text-align: center;"><a href="${contextPath}/index" style="color: white;">Reminder Of The Day</a></h1>

        </div>
    </div>

    <div class="jumbotron">
        <h3>Reminder Webservice</h3>
    </div>

    <sitemesh:write property="div.sm_main_middle"/>

    <div class="row">
        <div class="col-md-12" style="background-color: #28a4c9; color: white;">
            <h5 style="text-align: center;"><a href="${contextPath}/index" style="color: white;">Reminder Of The Day</a></h5>
        </div>
    </div>
</div>
</body>
</html>
