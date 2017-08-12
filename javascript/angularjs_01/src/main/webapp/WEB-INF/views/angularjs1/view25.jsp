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

<h1>Directive, isolating scope by using "scope:{}"</h1>

<div ng-app="choreApp">
	
	Kid1:<br/>
	<kid></kid>
	<br/><hr/>
	Kid1:<br/>
	<kid></kid>
	<br/><hr/>
	Kid1:<br/>
	<kid></kid>
	<br/><hr/>
	
	
	<p/>
	Kid2:<br/>
	<kidfollow></kidfollow>
	<br/><hr/>
	Kid2:<br/>
	<kidfollow></kidfollow>
	<br/><hr/>
	Kid2:<br/>
	<kidfollow></kidfollow>
	<br/><hr/>
	
	
</div>

<script type="text/javascript">
// https://egghead.io/lessons/angularjs-understanding-isolate-scope
var app = angular.module("choreApp", []);

app.directive("kid", function() {
	return {
		restrict: "E",
		// because of "scope: {}" each <kid/> element will have its own private ng-model
		// in our case each kid will have its on "chore"
		scope: {},
		template: "<input type='text' ng-model='chore'/> {{chore}}"
	};
});


app.directive("kidfollow", function() {
	return {
		restrict: "E",
		//scope: {},
		template: "<input type='text' ng-model='chore'/> {{chore}}"
	};
});

</script>
</body>
</html>