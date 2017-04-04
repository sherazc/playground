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
<div ng-app="behaviorApp">
	<h1>Behavior Directive.</h1>
	<div mymouseenterdirective="button" mymouseleavedirective="button">
		Mouse over and leave. See browser console output
	</div>
</div>

<script type="text/javascript">
//https://egghead.io/lessons/angularjs-basic-behaviors

var app = angular.module("behaviorApp", []);

// only small case directives work for me.
app.directive("mymouseenterdirective", function () {
	return function(scope, element, attrs) {
		element.bind("mouseenter", function() {
			console.log("Mouse Enter Activated!");
			element.addClass(attrs.mymouseenterdirective);
		});
	}
});

app.directive("mymouseleavedirective", function() {
	return function(scope, element, attrs) {
		element.bind("mouseleave", function() {
			console.log("Mouse Leave Activated!");
			element.removeClass(attrs.mymouseleavedirective);
		});
	}
});
</script>
</body>
</html>