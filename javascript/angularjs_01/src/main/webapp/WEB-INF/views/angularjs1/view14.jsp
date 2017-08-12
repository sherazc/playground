<!DOCTYPE html>
<%
request.setAttribute("contextPath", request.getContextPath());
%>
<html ng-app="myApp">
<head>
<script src="${contextPath}/resources/scripts/libs/angular.js"></script>
<link rel="stylesheet" href="${contextPath}/resources/css/foundation.css">
<link rel="stylesheet" href="${contextPath}/resources/css/main.css">
<link rel="stylesheet" href="${contextPath}/resources/css/bootstrap.css">
<title>Example</title>
</head>
<body>
<div>
	<h1>Custom filters | and passing factory to custom filtes</h1>
	<div ng-controller="FirstController">
		<input type="text" ng-model="myData.myMessage"/>
		<h1>{{myData.myMessage}}</h1>
	</div>
	<div ng-controller="SecondController">
		<input type="text" ng-model="myData.myMessage"/>
		<h1 class="">{{myData.myMessage | myReverseFilter}}</h1>
	</div>
</div>

<script>
var myApp = angular.module("myApp", []);


myApp.factory("MyDataFactory", function() {
	return {myMessage: "I am data from service"};
});

myApp.filter("myReverseFilter", function(MyDataFactory) {
	return function (text) {
		return text.split("").reverse().join("") + " <--> " + MyDataFactory.myMessage;
	};
});


function FirstController($scope, MyDataFactory) {
	$scope.myData = MyDataFactory;
}

function SecondController($scope, MyDataFactory) {
	$scope.myData = MyDataFactory;
}
</script>
</body>
</html>