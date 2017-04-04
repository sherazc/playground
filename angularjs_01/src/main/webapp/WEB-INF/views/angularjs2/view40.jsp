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
<h4>ng-view</h4>

<div ng-app="applicationModule">
	<a href="#/" class="button">Default</a>
	<a href="#/app2" class="button">App2</a>
	<hr/>
	<ng-view></ng-view>
</div>

<script type="text/javascript">
// https://egghead.io/lessons/angularjs-ng-view
var applicationModule = angular.module("applicationModule", ["ngRoute"]);

var applicationClass = {};
applicationClass.controllers = {};
applicationClass.directives = {};

applicationModule.controller(applicationClass.controllers);
applicationModule.directive(applicationClass.directives);

applicationModule.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "${contextPath}/static/angularjs2/view40_app1",
		controller: "ApplicationController"
	});

	$routeProvider.when("/app2", {
		templateUrl: "${contextPath}/static/angularjs2/view40_app2",
		controller: "ApplicationController"
	});
});

applicationClass.controllers.ApplicationController = function($scope) {
	$scope.model = {
		message: "This is my app!!!"	
	};
};

</script>
</body>
</html>