<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<%
	request.setAttribute("contextPath", request.getContextPath());
%>
<html>
<head>
<script src="${contextPath}/resources/scripts/libs/angular.js"></script>
<script src="${contextPath}/resources/scripts/libs/angular-route.js"></script>
<link rel="stylesheet" href="${contextPath}/resources/css/bootstrap.css"/>
<link rel="stylesheet" href="${contextPath}/resources/css/foundation.css"/>
<link rel="stylesheet" href="${contextPath}/resources/css/main.css"/>
<title>Example</title>
</head>
<body>
<h4>$routeParams</h4>

<div ng-app="app">
	<script type="text/ng-template" id="template.html">
		No Address parameters provided.
	</script>
	<script type="text/ng-template" id="template-address.html">
		<b>Contact:</b>
		<br/>
		{{model.message}}
	</script>
	
	<a href="#/" class="button small">#/</a>
	<a href="#/map/Alpharetta/Georgia/30004" class="button small">#/map/Alpharetta/Georgia/30004</a>
	
	<div class="panel">
		<ng-view></ng-view>
	</div>

</div>

<script type="text/javascript">
// https://egghead.io/lessons/angularjs-routeparams
var app = angular.module("app", ["ngRoute"]);
app.config(function($routeProvider) {
	$routeProvider.when("/map/:city/:state/:zip", {
		templateUrl: "template-address.html",
		controller: "AddressController"
	});
	
	$routeProvider.otherwise({
		templateUrl: "template.html",
	});
});

app.controller("AddressController", function($scope, $routeParams) {
	$scope.model = {
		message: "Address: "
			+ $routeParams.city
			+ ", "
			+ $routeParams.state
			+ " "
			+ $routeParams.zip
	};
});

</script>
</body>
</html>