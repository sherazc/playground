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

<h1>Isolate Scope "&"</h1>

<div ng-app="phoneApp">
	<div ng-controller="AppController">
		<div phone="" dial="callHome(message)"/>
	</div>
	
	<div ng-controller="AppController">
		<div phone="" dial="callHome(message)"/>
	</div>
	
	<div ng-controller="AppController">
		<div phone="" dial="callHome(message)"/>
	</div>
</div>

<script type="text/javascript">
//https://egghead.io/lessons/angularjs-isolate-scope-expression-binding

var app = angular.module("phoneApp", []);

app.controller("AppController", function($scope) {
	$scope.callHome = function(messageParam) {
		alert(messageParam);
	};
});

app.directive("phone", function() {
	return {
		restrict: "A",
		scope: {
			dial: "&"
		},
		template: "<input type='text' ng-model='value' />"
			+ "<div class='button' ng-click='dial({message:value})'>Call Home!</div>"
	};
});
</script>
</body>
</html>