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
	<h1>Defining methods on $scope</h1>
	<div ng-controller="FirstController">
		<input type="text" ng-model="myData.myMessage"/>
		<h1>{{myData.myMessage}}</h1>
	</div>
	<div ng-controller="SecondController">
		<input type="text" ng-model="myData.myMessage"/>
		<h1>{{myReversedMessage()}}</h1>
	</div>
</div>

<script>
var myApp = angular.module("myApp", []);

myApp.factory("MyDataFactory", function() {
	return {myMessage: "I am data from service"};
});

function FirstController($scope, MyDataFactory) {
	$scope.myData = MyDataFactory;
}
function SecondController($scope, MyDataFactory) {
	$scope.myData = MyDataFactory;
	$scope.myReversedMessage = function () {
		return $scope.myData.myMessage.split("").reverse().join("");
	};
}
</script>
</body>
</html>