<!DOCTYPE html>
<%
	request.setAttribute("contextPath", request.getContextPath());
%>
<html>
<head>
<script src="${contextPath}/resources/scripts/libs/angular.js"></script>
<link rel="stylesheet" href="${contextPath}/resources/css/bootstrap.css"/>
<link rel="stylesheet" href="${contextPath}/resources/css/foundation.css"/>
<link rel="stylesheet" href="${contextPath}/resources/css/main.css"/>
<title>Example</title>
</head>
<body>

<h1>$scope vs scope</h1>
See scope prints in logs
<div ng-app="applicationModule">
	<div ng-controller="MyController1">
		<mydirective1></mydirective1>
		<mydirective2></mydirective2>
	</div>

	<div ng-controller="MyController2">
	</div>
	
	<div ng-controller="MyController3">
	</div>
	
</div>


<script type="text/javascript">
// https://egghead.io/lessons/angularjs-scope-vs-scope

var applicationModule = angular.module("applicationModule", []);

var applicationClass = {};
applicationClass.controllers = {};
applicationClass.directives = {};


applicationModule.controller(applicationClass.controllers);
applicationModule.directive(applicationClass.directives);

// Every controller creates its own scope. If a directive is used inside the controller then it inherits 
// controller's scope.
// $scope, and $http is dependency injection. AngularJS looks for these predefined providers
// and injects them in controllers, service and factories.
// $scope, and $http is a short hand version. look at MyController2 for longer/another method of 
// doing the same thing.
// To see all the providers, search for "$provide.provider" in angular.js
applicationClass.controllers.MyController1 = function($scope, $http) {
	console.log("MyController1");
	console.log($scope);
	// not logging $http because it prints out the whole $http provider code
	//console.log($http);
};

applicationClass.controllers.MyController2 = ["$scope", "$http", function(a, b) {
	console.log("MyController2");
	console.log(a);
}];

applicationClass.controllers.MyController3 = function($scope) {
	console.log("MyController3");
	console.log($scope);
}
	
applicationClass.directives.mydirective1 = function() {
	return {
		restrict: "E",
		// by doing scope: {}, this directive do not inherit application 
		// or controller's scope. It creates its own scope.  
		// mydirective2 does not do scope: {} 
		scope: {},
		link: function(scope) {
			console.log("mydirective1");
			console.log(scope);
		}
	};
};

applicationClass.directives.mydirective2 = function() {
	return {
		restrict: "E",
		// these variable names do not metter, the order matters.
		link: function(scope, element, attributes) {
			console.log("mydirective2");
			console.log(scope);
		}
	};	
}

</script>
</body>
</html>