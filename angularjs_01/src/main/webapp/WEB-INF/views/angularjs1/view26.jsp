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

<h1>Directive, isolating scope by using "scope:{}" and interaction with controller</h1>

<div ng-app="choreApp">
	<div ng-controller="ChoreController">
		<kid done="logChore(chore)"></kid>
	</div>

</div>

<script type="text/javascript">
// https://egghead.io/lessons/angularjs-understanding-isolate-scope
var app = angular.module("choreApp", []);

app.controller("ChoreController", function($scope) {
	// logChore takes chore object
	$scope.logChore = function(chore) {
		alert(chore + " is done!");
	};
});

app.directive("kid", function() {
	return {
		restrict: "E",
		scope: {
			// "&" is for expression
			done: "&"
		},
		
		//ng-click="done({chore:chore})" is mapped to "done" attribute in scope{} 
		template: '<input type="text" ng-model="chore"/>'
		+ '<br/>'
		+ '{{chore}}'
		+ '<br/>'
		+ '<br/>'
		+ '<br/>'
		+ '<div class="button" ng-click="done({chore:chore})">I am done!</div>'
	
	};
});

</script>
</body>
</html>