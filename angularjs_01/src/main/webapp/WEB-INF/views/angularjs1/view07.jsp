<!DOCTYPE html>
<%
request.setAttribute("contextPath", request.getContextPath());
%>
<html ng-app="simpleApp" ng-controller="SimpleController">
<head>
<meta charset="ISO-8859-1">
<link rel="stylesheet" href="${contextPath}/resources/css/main.css">
<link rel="stylesheet" href="${contextPath}/resources/css/bootstrap.css">
<script src="${contextPath}/resources/scripts/libs/angular.js"></script>

<script>
var simpleApp = angular.module("simpleApp", []);

// controller function is loaded directly into simpleApp Module as a anonymous function
simpleApp.controller("SimpleController", function ($scope) {
	$scope.customers = [
		                  {name: "nameqqq", city: "Gainsville"},
		                  {name: "nameaaa", city: "Gainsville"},
		                  {name: "namebbb", city: "Jacksonville"},
		                  {name: "nameccc", city: "Atlanta"},
		                  {name: "nameddd", city: "Atlanta"}
		                  ];
	}
);
</script>
<title ng-bind-template="Search {{searchQuery}}">Search Engine</title>
</head>
<body>

<div>
	Search results of = {{searchQuery}}
	<br/>
	<input ng-model="searchQuery">
	<br/>
	<ul>
		<li ng-repeat="customer in customers | filter:searchQuery | orderBy:'name'">
			{{customer.name}} {{customer.city | uppercase}}
		</li>
	</ul>
</div>
</body>
</html>