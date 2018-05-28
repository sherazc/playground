<!DOCTYPE html>
<%
request.setAttribute("contextPath", request.getContextPath());
request.setAttribute("staticPath", request.getContextPath() + "/static");
%>
<html ng-app="demoApp">
<head>
<meta charset="ISO-8859-1">
<link rel="stylesheet" href="${contextPath}/resources/css/main.css"/>
<link rel="stylesheet" href="${contextPath}/resources/css/bootstrap.css"/>
<script src="http://code.angularjs.org/1.2.6/angular.min.js"></script>
<script src="http://code.angularjs.org/1.2.6/angular-route.js"></script>
<%-- <script src="${contextPath}/resources/scripts/libs/angular-1.2.6/angular.js"></script> --%>
<%-- <script src="${contextPath}/resources/scripts/libs/angular-1.2.6/angular-route.js"></script> --%>
<!-- <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0rc1/angular.min.js"></script> -->
<!-- <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0rc1/angular-route.min.js"></script> -->
<script>
'use strict';
var demoApp = angular.module('demoApp', ['ngRoute', "SimpleController"]);


demoApp.config(['$routeProvider', function ($routeProvider) {
	/*
	$routeProvider.when('${staticPath}/angular/view09', {
		controller: "SimpleController",
		templateUrl: "${staticPath}/partials/view09_p1"
	}).when('${staticPath}/partial2', {
		controller: "SimpleController",
		templateUrl: "${staticPath}/partials/view09_p2"
	}).otherwise({redirect: "${staticPath}/"});
	*/
}]);

demoApp.controller("SimpleController", function ($scope) {
	$scope.customers = [
		                  {name: "nameqqq", city: "Gainsville"},
		                  {name: "nameaaa", city: "Gainsville"},
		                  {name: "namebbb", city: "Jacksonville"},
		                  {name: "nameccc", city: "Atlanta"},
		                  {name: "nameddd", city: "Atlanta"}
		                  ];
	
	$scope.addCustomer = function() {
		$scope.customers.push({
			name: $scope.newCustomer.name, 
			city: $scope.newCustomer.city
			});		
	}
});

</script>
<title>Search Engine</title>
</head>
<body>
<h1 style="color: red;">This example is not working</h1>
<div>
<!-- 	Placeholder for the views -->
	<div ng-view=""/>
</div>
</body>
</html>