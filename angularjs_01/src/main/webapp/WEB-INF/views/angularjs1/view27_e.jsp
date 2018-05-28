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

<h1>Isolate Scope "@" and Controller's model</h1>

<div ng-app="drinkApp">
	<div ng-controller="DrinkAppController">
		<input ng-model="controllerFlavor"/>
		<br/><br/>
		Drink: <div drink=""></div>
		<br/>
		Drink with controller's flavor type: <div drink="" flavor="{{controllerFlavor}}"></div>
		<br/>
		Drink with flavor: <div drink="" flavor="strawberry"></div>
		<br/>
	</div>
</div>

<script type="text/javascript">
// https://egghead.io/lessons/angularjs-isolate-scope-attribute-binding

var app = angular.module("drinkApp", []);

app.controller("DrinkAppController", function($scope) {
	$scope.controllerFlavor = "blackberry";
});

app.directive("drink", function() {
	return {
		restrict: "A",
		scope: {   
			flavor: "@"
		},
		template: "<div style='color: red;'>{{flavor}}</div>"
	};
});

</script>
</body>
</html>