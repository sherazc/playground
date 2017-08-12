<?xml version="1.0" encoding="ISO-8859-1" ?>
<jsp:root xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0" xmlns:c="http://java.sun.com/jsp/jstl/core"
	xmlns:s="http://www.springframework.org/tags" xmlns:form="http://www.springframework.org/tags/form" xmlns:fmt="http://java.sun.com/jsp/jstl/fmt">
	<jsp:directive.page contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" session="true" />
	<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<![CDATA[<!DOCTYPE html>]]>
<html>
<head>
<title>AngularJS Example</title>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular.js">
<!--jsp 2.0 problem -->
</script>
<link rel="stylesheet" href="${contextPath}/resources/css/bootstrap.css"/>
<link rel="stylesheet" href="${contextPath}/resources/css/foundation.css"/>
<link rel="stylesheet" href="${contextPath}/resources/css/main.css"/>
</head>
<body ng-app="app">
<h4>Store Items</h4>

<div ng-controller="AppController">
	Name: <input ng-model="inputstore.name"/> 
	<br/>
	Price: <input ng-model="inputstore.price" />
	<br/>
	<div class="button small" ng-click="AppController.addStoreItem(inputstore)">Add Item</div>
	<div class="panel callout radius">
		Sort field = {{orderByField}}
		<br/> 
		Sort order ascending = {{!reverseSort}}
	</div>
<table>
	<tr>
		<th>
			<a href="#" ng-click="orderByField='id'; reverseSort=!reverseSort;">
				Item Id
				<span ng-show="orderByField=='id'">
					<span ng-show="!reverseSort">^</span>
					<span ng-show="reverseSort">v</span>
				</span>
			</a>
		</th>
		<th>
			<a href="#" ng-click="orderByField='name'; reverseSort=!reverseSort;">
				Name
				<span ng-show="orderByField=='name'">
					<span ng-show="!reverseSort">^</span>
					<span ng-show="reverseSort">v</span>
				</span>
			</a>
		</th>
		<th>
			<a href="#" ng-click="orderByField='price'; reverseSort=!reverseSort;">
				Price
				<span ng-show="orderByField=='price'">
					<span ng-show="!reverseSort">^</span>
					<span ng-show="reverseSort">v</span>
				</span>
			</a>
		</th>
		<th>Delete</th>
	</tr>
	<tr animate="" ng-repeat="storeItem in storeItems | orderBy:orderByField:reverseSort">
		<td>{{storeItem.id}}</td>
		<td>{{storeItem.name}}</td>
		<td>$ {{storeItem.price}}</td>
		<td>
			[<a href="" ng-click="AppController.removeStoreItem($index, storeItem.id)">X</a>]
		</td>
	</tr>
</table>

</div>

<script type="text/javascript">
//<![CDATA[
var app = angular.module("app", []);

app.controller("AppController", function($http, $scope) {
	$scope.orderByField = 'name';
	$scope.reverseSort = false;
	//console.log($scope.inputstore);
	$http.get("${contextPath}/storeitem/all").success(function (data) {
		$scope.storeItems = data;
	});
	
	this.addStoreItem = function(inputstoreitem) {
		if (inputstoreitem != null) {
			$http.post("${contextPath}/storeitem/save", inputstoreitem)
				.success(function (savedStoreItem) {
					$scope.storeItems.push(savedStoreItem);
				});
		}
	}
	
	this.removeStoreItem = function(index, storeItemId) {
		$http.post("${contextPath}/storeitem/remove/" + storeItemId)
			.success(function (removed) {
				if (removed) {
					$scope.storeItems.splice(index, 1);
				}
			});
	};
	return $scope.AppController = this; 
});

//]]>
</script>
</body>
</html>
</jsp:root>