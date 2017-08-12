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

<h1>Directive to Directive communication</h1>

<div ng-app="superApp">
	
	<superhero flight="" speed="" strength="">
		Superman
	</superhero>
	
	<superhero speed="" strength="">
		Flash
	</superhero>	

	<superhero strength="">
		Hulk
	</superhero>
</div>

<script type="text/javascript">
// https://egghead.io/lessons/angularjs-directive-to-directive-communication

var app = angular.module("superApp", []);

app.directive("superhero", function() {
	return {
		restrict: "E",
		// scope:{} makes scope private to each directive use 
		scope:{},
		controller: function($scope){
			$scope.abilities = [];
			// "this" over here means controller (Not 100% sure)
			this.addStrength = function() {
				$scope.abilities.push("Strength");
			};
			
			this.addSpeed = function() {
				$scope.abilities.push("Speed");
			};
			
			this.addFlight = function() {
				$scope.abilities.push("Flight");
			};
		},
		
		// link function means that it will be called as soon as this directive; in our case "superhero" is used.
		link: function (scope, element) {
			// "button" class is part of foundation css lib
			element.addClass("button");
			element.bind("click", function() {
				console.log(scope.abilities);
				alert(scope.abilities);
			});
		}
	};
});

app.directive("strength", function() {
	return {
		// line below means that "strength" directive can only be used with "superhero" directive
		require: "superhero",
		// parent directive will be injected as 4th element. in our case "superhero" directive.
		link: function(scope, element, attributes, superheroController) {
			superheroController.addStrength();
		}
	};
});

app.directive("speed", function() {
	return {
		require: "superhero",
		link: function(scope, element, attributes, superheroController) {
			superheroController.addSpeed();
		}
	};
});

app.directive("flight", function() {
	return {
		require: "superhero",
		link: function(scope, element, attributes, superheroController) {
			superheroController.addFlight();
		}
	};
});

</script>
</body>
</html>