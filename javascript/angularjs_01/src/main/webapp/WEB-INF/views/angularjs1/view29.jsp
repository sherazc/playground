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

<h1>An Alternative Approach to Controllers</h1>

<div ng-app="greetingApplication">
	<div ng-controller="ApplicationController">
		<div class="button" ng-click="ApplicationController.sayHi()">
			Click me!!!
		</div>
		
		<div class="button" ng-click="ApplicationController.showCrontrollerValue()">
			Click me!!!
		</div>
	</div>
	
</div>


<script type="text/javascript">
// https://egghead.io/lessons/angularjs-an-alternative-approach-to-controllers

var app = angular.module("greetingApplication", []);

app.controller("ApplicationController", function($scope) {
	var controllerVar = "my controller value";
	this.sayHi = function() {
		console.dir(this);
		alert("Hi!!!");
	};
	
	this.showCrontrollerValue = function () {
		alert(controllerVar);
	}

	return $scope.ApplicationController = this;
});


</script>
</body>
</html>