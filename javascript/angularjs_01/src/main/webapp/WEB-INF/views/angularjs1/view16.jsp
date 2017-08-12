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
<div ng-app="myApp">
	<div ng-controller="CustomerController">
	<h1>Filter Object property</h1>
<!-- 	I thing the dollar sign means any property of searchObj -->
		Search: <input ng-model="searchObj.$">
		<br/>
		Search Name: <input ng-model="searchObj.name">
		<br/>
		Search City: <input ng-model="searchObj.city">
		<br/>
		<h3>Search All</h3>
		<table>
			<tr ng-repeat="customer in store.customers | filter:searchObj">
				<td>{{customer.name}} {{customer.city}}</td>
			</tr>
			
		</table>
		
		<h3>Search, orderBy:'name', Ascending</h3>
		<table>
			<tr ng-repeat="customer in store.customers | filter:searchObj | orderBy:'name'">
				<td>{{customer.name}} {{customer.city}}</td>
			</tr>
			
		</table>
		
		<h3>Search, orderBy:'-name', Descending</h3>
		<table>
			<tr ng-repeat="customer in store.customers | filter:searchObj | orderBy:'-name'">
				<td>{{customer.name}} {{customer.city}}</td>
			</tr>
			
		</table>
		
		<h3>Search, orderBy:'-name', Descending, First 2</h3>
		<table>
			<tr ng-repeat="customer in store.customers | filter:searchObj | orderBy:'-name' | limitTo:2">
				<td>{{customer.name}} {{customer.city}}</td>
			</tr>
			
		</table>
		
		<h3>Search, orderBy:'-name', Descending, last 2</h3>
		<table>
			<tr ng-repeat="customer in store.customers | filter:searchObj | orderBy:'-name' | limitTo:-2">
				<td>{{customer.name}} {{customer.city}}</td>
			</tr>
			
		</table>
	</div>
</div>
<script>
var myApp = angular.module("myApp", []);

myApp.factory("CustomerFactory", function () {
	var allCustomers = {};
	allCustomers.customers = [
	      	                  {name: "nameqqq", city: "Gainsville"},
	    	                  {name: "nameaaa", city: "Gainsville"},
	    	                  {name: "namebbb", city: "Jacksonville"},
	    	                  {name: "nameccc", city: "Atlanta"},
	    	                  {name: "namezzz", city: "New York"},
	    	                  {name: "namezzz", city: "Chicago"},
	    	                  {name: "nameOOO", city: "CityZZZ"},
	    	                  {name: "namemmm", city: "CityLLL"},
	    	                  {name: "nameddd", city: "CityMMM"},
	    	                  {name: "nameddd", city: "CityHHH"}
	    	                  ];
	return allCustomers;
});

function CustomerController($scope, CustomerFactory) {
	$scope.store = CustomerFactory;
}

</script>
</body>
</html>