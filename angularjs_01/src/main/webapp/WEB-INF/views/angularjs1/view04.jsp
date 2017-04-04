<!DOCTYPE html>
<%
request.setAttribute("contextPath", request.getContextPath());
%>
<html ng-app>
<head>
<meta charset="ISO-8859-1">
<link rel="stylesheet" href="${contextPath}/resources/css/main.css">
<link rel="stylesheet" href="${contextPath}/resources/css/bootstrap.css">
<script src="${contextPath}/resources/scripts/libs/angular.js"></script>

<title></title>
</head>
<body ng-init="names = ['name1', 'name3', 'name2']">
<input ng-model="searchQuery"/> {{searchQuery}}

<ul>
	<li ng-repeat="n in names | filter:searchQuery">{{n}}</li>
</ul>
<hr/>
<ul>
	<li ng-repeat="n in names | filter:searchQuery">{{n | uppercase}}</li>
</ul>
</body>
</html>