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
	<h3>Custom Class</h3>
	<div class="batman">Joker</div>
</div>
<script>
var superHero = angular.module("superHero", []);

superHero.directive("batman", function() {
	return {
		restrict: "C",
		link: function(scope, element, attrs) {
		      element.css("color", "red");
		      element.css("font-weight", "bold");
		      element.css("background", "green");
	    }
	};
});
</script>
</body>
</html>