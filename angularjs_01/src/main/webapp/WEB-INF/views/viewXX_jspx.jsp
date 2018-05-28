<?xml version="1.0" encoding="ISO-8859-1" ?>
<jsp:root xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0" xmlns:c="http://java.sun.com/jsp/jstl/core"
	xmlns:s="http://www.springframework.org/tags" xmlns:form="http://www.springframework.org/tags/form" xmlns:fmt="http://java.sun.com/jsp/jstl/fmt">
	<jsp:directive.page contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" session="true" />
	<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<![CDATA[<!DOCTYPE html>]]>
<html>
<head>
<title>Example</title>
<script src="${contextPath}/resources/scripts/libs/angular.js"><jsp:text /></script>
<script src="${contextPath}/resources/scripts/libs/angular-route.js"><jsp:text /></script>
<link rel="stylesheet" href="${contextPath}/resources/css/bootstrap.css"/>
<link rel="stylesheet" href="${contextPath}/resources/css/foundation.css"/>
<link rel="stylesheet" href="${contextPath}/resources/css/main.css"/>
</head>
<body>
<h4>Example</h4>

<div ng-app="applicationModule">
	<div ng-controller='MyController'>
		<div class='button' ng-click='MyController.myFunction1()'>Button 1</div>
		<div class='button' ng-click='myFunction2()'>Button 2</div>
		<br/>
		{{MyController.controllerVar1}}
		<br/>
		{{MyController.getControllerVar2()}}
		<br/>
		<mydirective><jsp:text/></mydirective>
	</div>
</div>

<script type="text/javascript">
//<![CDATA[
var applicationModule = angular.module("applicationModule", []);

var applicationClass = {};
applicationClass.controllers = {};
applicationClass.directives = {};

applicationModule.controller(applicationClass.controllers);
applicationModule.directive(applicationClass.directives);

applicationClass.controllers.MyController = function($scope) {
	
	this.controllerVar1 = "Controller Var 1";
	this.controllerVar2 = "Controller Var 2";
	
	this.myFunction1 = function() {
		alert('My Function 1 called!');
	}
	
	$scope.myFunction2 = function() {
		console.log(this);
		alert("My Function 2 called!");
	}
	
	this.getControllerVar1 = function() {
		return this.controllerVar1;
	}
	
	this.getControllerVar2 = function() {
		return this.controllerVar2;
	}
	
	//$scope.MyController = this
	//return $scope.MyController;
	return $scope.MyController = this;
}

applicationClass.directives.mydirective = function() {
	return {
		restrict: "E",
		scope: {},
		template: "<div>My Directive</div>",
		link: function(scope, element, attribute) {
			console.log("My Directive");
		}
	};
}
//]]>
</script>
</body>
</html>
</jsp:root>