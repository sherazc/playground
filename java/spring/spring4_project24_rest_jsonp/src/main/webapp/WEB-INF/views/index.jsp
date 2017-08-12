<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<html>
<head>
    <title>Home</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${contextPath}/resources/lib/bootstrap-3.3.2/css/bootstrap.min.css">
    <script src="${contextPath}/resources/lib/jquery/jquery-1.11.2.min.js"></script>
    <script src="${contextPath}/resources/lib/bootstrap-3.3.2/js/bootstrap.min.js"></script>
</head>
<body>
<div id="sm_main_middle">

    <a href="${contextPath}/simpleJSON">Simple JSON /simpleJSON</a>
    <br/>
    <a href="${contextPath}/simpleJSONP">Simple JSON Padding /simpleJSONP</a>
    <br/>
    <a href="${contextPath}/simpleJSONP?callback=clientFunctionName">Simple JSON Padding with callback
        /simpleJSONP?callback=clientFunctionName</a>
    <hr/>
    <form action="${contextPath}/simpleJSONP" method="get">
        <label for="callback">Client Function Name:</label>
        <input id="callback" name="callback"/>
        <input type="submit" value="Generate JSON Padding with callback URL">
    </form>
    <br/>
</div>
</body>
</html>
