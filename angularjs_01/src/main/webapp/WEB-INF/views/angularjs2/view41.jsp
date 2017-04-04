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
<h4>$routeProvider api</h4>

<div ng-app="applicationModule">
	<script type="text/ng-template" id="template01">
		template 01 Content.<br/>
		{{model.message}}
	</script>
	<script type="text/ng-template" id="template02">
		template 02 Content.<br/>
		{{model.message}}
	</script>
	<script type="text/ng-template" id="template03">
		template 02 Content is DEFAULT.<br/>
		{{model.message}}
	</script>

	<a href="#/" class="button small">#/</a>
	<a href="#/t2" class="button small">#/t2</a>
	<a href="#/unknown" class="button small">#/unknown</a>

	<div class="panel">
		<ng-view></ng-view>
	</div>

</div>

<script type="text/javascript">
// https://egghead.io/lessons/angularjs-routeprovider-api
var applicationModule = angular.module("applicationModule", ["ngRoute"]);
applicationModule.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "template01",
		controller: "MyController01"
	});
	
	$routeProvider.when("/t2", {
		templateUrl: "template02",
		controller: "MyController01"
	});
	
	$routeProvider.otherwise({
		templateUrl: "template03",
		controller: "MyController02"
	});
});

applicationModule.controller("MyController01", function($scope) {
	$scope.model = {message: "This is MyController01"};
});

applicationModule.controller("MyController02", function($scope) {
	$scope.model = {message: "This is MyController02"};
});
</script>
</body>
</html>