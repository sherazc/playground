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
<h4>redirectTo</h4>

<div ng-app="app">
	<script type="text/ng-template" id="template.html">
		<h4>Template 01</h4>
		Message: {model.message}
	</script>
	
	<a href="#/" class="button small">#/</a>
	<a href="#/badview" class="button small">#/badview</a>
	
	<div class="panel">
		<ng-view></ng-view>
	</div>

</div>

<script type="text/javascript">
// https://egghead.io/lessons/angularjs-redirectto

var app = angular.module("app", ["ngRoute"]);

app.config(function($routeProvider) {
	
	$routeProvider.when("/", {
		templateUrl: "template.html",
		controller: "ApplicationController"
	});
	
	$routeProvider.when("/pizza/:crust/:toppings", {
		redirectTo: function(routeParams, path, search) {
			console.log(routeParams);
			console.log(path);
			console.log(search);
			return "/" + routeParam.crust;
		}
	});
	
	$routeProvider.when("/deep", {
		template: "Deep dish"
	});
	
	$routeProvider.otherwise({
		redirectTo: "/"
	});
});

app.controller("ApplicationController", function($scope) {
	$scope.model = {
		message: "This is my application!!!"
	};
});
</script>
</body>
</html>