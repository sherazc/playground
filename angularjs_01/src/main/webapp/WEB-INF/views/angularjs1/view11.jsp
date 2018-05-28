<!DOCTYPE html>
<%
request.setAttribute("contextPath", request.getContextPath());
%>
<html ng-app="myApp">
<head>
<script src="${contextPath}/resources/scripts/libs/angular.js"></script>
<title>Example</title>
</head>
<body>
<div>
	<h1>Sharing data with Factory/Service</h1>
	<div ng-controller="FirstController">
		<input type="text" ng-model="data.message"/>
		<h1>{{data.message}}</h1>
	</div>
	<div ng-controller="SecondController">
		<input type="text" ng-model="data.message"/>
		<h1>{{data.message}}</h1>
	</div>
</div>

<script>
var myApp = angular.module("myApp", []);

myApp.factory("MyDataFactory", function() {
	return {message: "I am data from service"};
});

function FirstController($scope, MyDataFactory) {
	$scope.data = MyDataFactory;
}
function SecondController($scope, MyDataFactory) {
	$scope.data = MyDataFactory;
}
</script>
</body>
</html>