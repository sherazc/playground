<%@ page import="org.apache.commons.lang3.StringUtils" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%
    request.setAttribute("contextPath", request.getContextPath());
    StringBuilder serverUrl = new StringBuilder("http://");
    serverUrl.append(request.getServerName());
    if (request.getServerPort() != 80) {
        serverUrl.append(":").append(request.getServerPort());
    }
    if (StringUtils.isNotBlank(request.getContextPath())) {
        serverUrl.append(request.getContextPath());
    }
    request.setAttribute("serverUrl", request.getContextPath());
%>
<html>
<head>
    <title>Reminder Web Service - <sitemesh:write property="title"/></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${contextPath}/resources/lib/bootstrap-3.3.2/css/bootstrap.min.css">
    <script src="${contextPath}/resources/lib/jquery/jquery-1.11.2.min.js"></script>
    <link rel="stylesheet" href="${contextPath}/resources/css/main.css">
</head>
<body>

<div class="container">

    <div class="row">
        <div class="col-md-12" style="background-color: #28a4c9; color: white;">

            <h1 style="text-align: center;"><a href="${contextPath}/index" style="color: white;">Header</a></h1>

        </div>
    </div>

    <div class="jumbotron">
        <h3>Spring4 Project 24 Rest JSONP</h3>
    </div>

    <sitemesh:write property="div.sm_main_middle"/>

    <div class="row">
        <div class="col-md-12" style="background-color: #28a4c9; color: white;">
            <h5 style="text-align: center;"><a href="${contextPath}/index" style="color: white;">Footer</a></h5>
        </div>
    </div>
</div>
</body>
</html>
