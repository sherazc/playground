'use strict';

var view02App = angular.module('view02App', []);

view02App.controller('view02Controller', function($scope) {
	$scope.myItems = [
	    {"name_a": "value_a1", "name_b": "value_b1"},
	    {"name_a": "value_a2", "name_b": "value_b2"},
	    {"name_a": "value_a3", "name_b": "value_b3"},
	    {"name_a": "value_a4", "name_b": "value_b4"},
	    {"name_a": "value_a5", "name_b": "value_b5"}
	];
	
	$scope.controllerMessage = "Message from Controller";
});