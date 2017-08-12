<!DOCTYPE html>
<%
	request.setAttribute("contextPath", request.getContextPath());
%>
<html>
<head>
<script src="${contextPath}/resources/scripts/libs/angular.js"></script>
<link rel="stylesheet" href="${contextPath}/resources/css/bootstrap.css">
<link rel="stylesheet" href="${contextPath}/resources/css/foundation.css">
<link rel="stylesheet" href="${contextPath}/resources/css/main.css">
<title>Example</title>
</head>
<body>

<h1>Toggle div. Building Zippy directive.</h1>

<div ng-app="app">
	Title:
	<br/>
	<input ng-model="model.title"/>
	<p/>
	Content:
	<br/>
	<input ng-model="model.content"/>

	<zippy></zippy>

</div>

<script type="text/javascript">
// https://egghead.io/lessons/angularjs-building-zippy
var app = angular.module("app", []);

app.directive("zippy", function() {
	return {
		restrict: "E",
		transclude: true,
		scope: {},
		template: '<div> <div>Test</div</div>', 
		link: function(scope) {
			scope.isContentVisible = false;
			scope.toggleContent = function() {
				scope.isContentVisible = !scope.isContentVisible;
			};
		}
	};
});

</script>
</body>
</html>