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

<div ng-app="app">
	<div ng-controller="GreetingController">
		<div class="button" ng-click="GreetingController.sayHi()">
			Say hi!!!
		</div>
		
		<div class="button" ng-click="GreetingController.showCrontrollerValue()">
			Show controller value!!!
		</div>
	</div>
	
	<panel></panel>
	<panelred></panelred>
	<p/>
	<input ng-model="mymessage"/>
	<p/>
	<div class="panel">
		{{mymessage | mypanelfilter}}
	</div>
</div>


<script type="text/javascript">
// https://egghead.io/lessons/angularjs-an-alternative-approach-to-controllers

var app = angular.module("app", []);

var applicationClass = {};

applicationClass.controllers = {};
applicationClass.directives = {};
applicationClass.filters = {};

app.filter(applicationClass.filters);
app.directive(applicationClass.directives);
app.controller(applicationClass.controllers);

applicationClass.controllers.GreetingController = function($scope) {
	var controllerVar = "my controller value";

	this.sayHi = function() {
		console.dir(this);
		alert("Hi!!!");
	};

	this.showCrontrollerValue = function () {
		alert(controllerVar);
	};

	return $scope.GreetingController = this; 
};

applicationClass.directives.panel = function() {
	return {
		restrict: "E",
		template: '<div class="panel">Panel Directive!!!</div>'
	};
};

applicationClass.directives.panelred = function() {
	return {
		restrict: "E",
		template: '<div class="panel" style="color: red;">Red Panel Directive!!!</div>'
	}; 
};

applicationClass.filters.mypanelfilter = function() {
	return function (text) {
		if (text == null || text == "") {
			return 'Please enter text in the input field!!!';	
		} else {
			return text;
		}
	};
}
</script>
</body>
</html>