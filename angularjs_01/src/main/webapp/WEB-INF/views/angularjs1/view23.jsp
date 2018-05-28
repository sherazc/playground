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
<div ng-app="myApp">
	<div ng-controller="MyController">
		<h1>Directive & View Communications.</h1>
		<div applyfunction="myfunction()" class="button small">
			Click applyfunction
		</div>
		
		<div callfunction="" class="button small">
			Click callfunction
		</div>
	</div>
</div>

<script type="text/javascript">
//https://egghead.io/lessons/angularjs-basic-behaviors

var app = angular.module("myApp", []);

app.controller("MyController", function($scope) {
	$scope.myfunction = function() {
		alert("myfunction called!!!");
	};
});


// seems like if "restrict:" is not added then its and Attribute type directive
app.directive("applyfunction", function() {
	return function(scope, element, attributes) {
		element.bind("click", function() {
			// calling the function name that was passed in as attribute value
			scope.$apply(attributes.applyfunction);
		});
	};
});


app.directive("callfunction", function() {
	return function(scope, element, attributes) {
		element.bind("click", function() {
			// calling the function that was created on the scope
			scope.myfunction();
		});
	};
});
</script>
</body>
</html>