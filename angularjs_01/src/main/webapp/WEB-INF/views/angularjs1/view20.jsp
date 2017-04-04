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
<div ng-app="superHero">
	<h1>Custom Directive</h1>
	
	<div flash=""></div>
	
	<div class="batman">Joker</div>
	
	
<!-- 	For some reason I have close the element directive. If I don't then next following directive would not work. I can't do  "<directive/>" -->
	<superman></superman>
	
	<hulk></hulk>
</div>
<script>
var superHero = angular.module("superHero", []);

superHero.directive("flash", function() {
	return {
		restrict: "A",
		link: function () {
			alert('Running very fast');
		}
	};
});

superHero.directive("batman", function() {
	return {
		restrict: "C",
		link: function(scope, element, attrs) {
		      element.css("color", "red");
		      element.css("font-weight", "bold");
		      element.css("background", "green");
	    }
	};
});

superHero.directive("superman", function() {
	// "E" means an element. 
	// So in our case <superman> element can be created
	return {
		restrict: "E",
		template: "<div>Here I am to save the day.</div>"
	};
});

superHero.directive("hulk", function() {
	return {
		restrict: "E",
		template: "<div>Hulk Smash.</div>"
	};
});
</script>
</body>
</html>