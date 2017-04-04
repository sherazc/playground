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

<h1>Isolate Scope "@"</h1>

<div ng-app="drinkApp">
	<div ng-controller="DrinkAppController">
		Drink: <div drink=""></div>
		<br/>
		Drink with empty flavor type: <div drink="" flavortype=""></div>
		<br/>
		Drink with flavor: <div drink="" flavortype="strawberry"></div>
		<br/>
	</div>
</div>

<script type="text/javascript">
// https://egghead.io/lessons/angularjs-isolate-scope-attribute-binding

var app = angular.module("drinkApp", []);

app.controller("DrinkAppController", function($scope) {
	
});

app.directive("drink", function() {
	return {
		restrict: "A",
		scope: {
			// "@"means that "flavortype" and its value is added to the drink directive's scope/ng-model . 
			// So this means that "drink" directive can access flavortype and from scope   
			flavortype: "@"
		},
		template: "<div style='color: red;'>{{flavor}}</div>",
		link: function(scope, element, attributes) {
			if (scope.flavortype == null || scope.flavortype == "") {
				scope.flavor = "Apple";
			} else {
				scope.flavor = attributes.flavortype; 
			}
		}
		
	};
});

</script>
</body>
</html>