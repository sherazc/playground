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

<h1>Transclusion Basics</h1>

<div ng-app="myApp" ng-controller="MyController">
	<panel>
		Panal Content
		<button class="button" ng-click="showMessage('something')">Click me!</button>
	</panel>
</div>


<script type="text/javascript">
// https://egghead.io/lessons/angularjs-transclusion-basics

var app = angular.module("myApp", []);

app.controller("MyController", function($scope) {
	$scope.showMessage = function(message) {
		alert("Message passed to showMessage(): " + message);
	};
});

app.directive("panel", function() {
	return {
		restrict: "E",
		transclude: true,
		template: "<div class='panel'>" 
		+ "This is directive content<p/>"
		// element ng-transclude content will be replaced.
		// so give ng-transclude in empty div.
		+ "<div ng-transclude=''></div>"
		+ "</div>"
	};
});

</script>
</body>
</html>