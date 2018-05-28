<?xml version="1.0" encoding="ISO-8859-1" ?>
<jsp:root xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0" xmlns:c="http://java.sun.com/jsp/jstl/core"
	xmlns:s="http://www.springframework.org/tags" xmlns:form="http://www.springframework.org/tags/form" xmlns:fmt="http://java.sun.com/jsp/jstl/fmt">
	<jsp:directive.page contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" session="true" 
	trimDirectiveWhitespaces="true"/>
	<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<![CDATA[<!DOCTYPE html>]]>

<html>
<head>
<title>Example</title>
<script type="text/javascript" src="${contextPath}/resources/scripts/libs/angular.js"><jsp:text/></script>
<link rel="stylesheet" href="${contextPath}/resources/css/bootstrap.css"/>
<link rel="stylesheet" href="${contextPath}/resources/css/foundation.css"/>
<link rel="stylesheet" href="${contextPath}/resources/css/main.css"/>
</head>
<body>
<h4>templateUrl</h4>

<div ng-app="applicationModule">
<!-- This template script should be within applicationModule, otherwise it wont work -->
<!-- "text/ng-template" tells angularJS that cache this content in $templateCache -->
<script type="text/ng-template" id="view36_content1.html">
	<div>
		View 36 Content 1
	</div>
</script>
<templatedirective2><jsp:text/></templatedirective2>
<templatedirective1><jsp:text/></templatedirective1>
</div>
<script type="text/javascript">
//<![CDATA[
           
var applicationModule = angular.module("applicationModule", []);

var applicationClass = {};
applicationClass.directives = {};
applicationModule.directive(applicationClass.directives);

applicationClass.directives.templatedirective1 = function() {
	return {
		restrict: "E",
		// "view36_content1.html" is used just as an id. We can name it any thing.
		templateUrl: "view36_content1.html"
	};
}


applicationClass.directives.templatedirective2 = function() {
	return {
		restrict: "E",
		templateUrl: "${contextPath}/static/angularjs2/view36_content2"
	};
}

//]]>
</script>
</body>
</html>
</jsp:root>