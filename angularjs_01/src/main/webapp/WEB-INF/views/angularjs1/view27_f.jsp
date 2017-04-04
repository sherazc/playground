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

<h1>Isolate Scope "=". Two way binding Directive to Controller and Controller to Directive</h1>

<div ng-app="drinkApp">
	<div ng-controller="DrinkAppController">
		Controller
		<br/>
		<input ng-model="controllerFlavor"/>
		<br/>
		<br/>
		Directive: 
		<br/>
<!-- 		Passed Controller's model object name to "drink" directive -->
		<div drink="" flavor="controllerFlavor"></div>
	</div>
</div>

<script type="text/javascript">
// https://egghead.io/lessons/angularjs-isolate-scope-two-way-binding

var app = angular.module("drinkApp", []);

app.controller("DrinkAppController", function($scope) {
	$scope.controllerFlavor = "blackberry";
});

app.directive("drink", function() {
	return {
		restrict: "A",
		scope: {
			// Unlike "@", "=" binds model. And its 2 way binding.
			// any change to "flavor" will effect "controllerFlavor" and any change to "controllerFlavor" will effect "flavor"
			flavor: "="
		},
		template: "<input style='color: red;' ng-model='flavor' />"
	};
});
</script>
</body>
</html>