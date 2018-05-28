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
	<h3>Custom Attribute</h3>
	<div flash=""></div>
	
</div>
<script>
var superHero = angular.module("superHero", []);

superHero.directive("flash", function() {
	return {
		restrict: "A",
		link: function () {
			alert('Running very fast');
		}
	};
});

</script>
</body>
</html>