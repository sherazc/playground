<!DOCTYPE html>
<%
request.setAttribute("contextPath", request.getContextPath());
%>
<html ng-app="">
<head>
<script src="${contextPath}/resources/scripts/libs/angular.js"></script>
<title>Example</title>
</head>
<body>
<!-- dot keeps the properties connected.  -->
<!-- if dot is not used then redefining it overwrites its value. -->
<!-- works in chrome -->
<div>
	<h1>These 3 properties are connected</h1>
	<input type="text" ng-model="data.message"/>
	<h1>{{data.message}}</h1>
	
	<div ng-controller="FirstController">
		<input type="text" ng-model="data.message"/>
		<h1>{{data.message}}</h1>
	</div>
	<div ng-controller="SecondController">
		<input type="text" ng-model="data.message"/>
		<h1>{{data.message}}</h1>
	</div>
</div>

<hr/>
<div>
	<h1>These 3 properties are Not connected</h1>
	<input type="text" ng-model="message"/>
	<h1>{{message}}</h1>
	
	<div ng-controller="FirstController">
		<input type="text" ng-model="message"/>
		<h1>{{message}}</h1>
	</div>
	<div ng-controller="SecondController">
		<input type="text" ng-model="message"/>
		<h1>{{message}}</h1>
	</div>
</div>



<script>
function FirstController($scope) {
}
function SecondController($scope) {
}
</script>
</body>
</html>