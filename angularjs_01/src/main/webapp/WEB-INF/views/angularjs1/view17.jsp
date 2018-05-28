<!DOCTYPE html>
<%
	request.setAttribute("contextPath", request.getContextPath());
%>
<html>
<head>
<script src="${contextPath}/resources/scripts/libs/angular.js"></script>
<link rel="stylesheet" href="${contextPath}/resources/css/bootstrap.css">
<link rel="stylesheet" href="${contextPath}/resources/css/foundation.css">
<link rel="stylesheet" href="${contextPath}/resources/css/main.css">
<title>Example</title>
</head>
<body>
<div ng-app="superHero">
	<h1>Custom Directive</h1>
	<h3>Custom Element</h3>
	<superman/>
</div>
<script>
var superHero = angular.module("superHero", []);

superHero.directive("superman", function() {
	// "E" means an element. 
	// So in our case <superman> element can be created
	return {
		restrict: "E",
		template: "<div>Here I am to save the day.</div>"
	};
});
</script>
</body>
</html>