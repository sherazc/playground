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

<h1>Angular Element.</h1>
Type "password"
<div ng-app="app">
	<dumbpassword/>
</div>

<script type="text/javascript">
// https://egghead.io/lessons/angularjs-angular-element
var app = angular.module("app", []);

// replace: true means that dont show/create dumbpassword tag
app.directive("dumbpassword", function() {
	return {
		restrict: "E",
		replace: true,
		template: "<div><input ng-model='model.input' /><div>{{model.input}}</div></div>",
		link: function(scope, element) {
			scope.$watch("model.input", function(value) {
				if (value === "password") {
					element.children(1).toggleClass("alert-box alert");
				}
			});
		}
	};
});

</script>
</body>
</html>