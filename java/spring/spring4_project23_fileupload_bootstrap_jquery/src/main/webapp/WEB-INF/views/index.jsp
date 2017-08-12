<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<html>
<head>
    <title>Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${contextPath}/resources/lib/bootstrap-3.3.2/css/bootstrap.min.css">
    <script src="${contextPath}/resources/lib/jquery/jquery-1.11.2.min.js"></script>
    <script src="${contextPath}/resources/lib/bootstrap-3.3.2/js/bootstrap.min.js"></script>
</head>
<body>
<div id="sm_main_middle">
    <ul>
        <li><a href="${contextPath}/example01" class="btn btn-default">Example 01. Upload file. Just UI Design</a></li>
        <li><a href="${contextPath}/example02" class="btn btn-default">Example 02. First Attempt. Failed</a></li>
        <li><a href="${contextPath}/example03" class="btn btn-default">Example 03. 2nd Attempt. Prints Uploaded file on page</a></li>
        <li><a href="${contextPath}/example04" class="btn btn-default">Example 04. Upload File. Prints Uploaded file on console</a></li>
        <li><a href="${contextPath}/example05" class="btn btn-default">Example 05. Upload File</a></li>
        <li><a href="${contextPath}/example06" class="btn btn-default">Example 06. List And Delete files</a></li>
        <li><a href="${contextPath}/example07" class="btn btn-default">Example 07</a></li>
        <li><a href="${contextPath}/example08" class="btn btn-default">Example 08</a></li>
        <li><a href="${contextPath}/example09" class="btn btn-default">Example 09</a></li>
        <li><a href="${contextPath}/example10" class="btn btn-default">Example 10</a></li>
    </ul>
</div>
</body>
</html>
