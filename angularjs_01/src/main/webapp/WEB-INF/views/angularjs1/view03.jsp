<!DOCTYPE html>
<%
request.setAttribute("contextPath", request.getContextPath());
%>
<html ng-app="view02App">
<head>
<meta charset="ISO-8859-1">
<link rel="stylesheet" href="${contextPath}/resources/css/main.css">
<link rel="stylesheet" href="${contextPath}/resources/css/bootstrap.css">
<script src="${contextPath}/resources/scripts/libs/angular.js"></script>
<script src="${contextPath}/resources/scripts/view03-script.js"></script>

<title></title>
</head>
<body ng-controller="view02Controller">
<div>
	<input ng-model="query">
</div>
<ul>
	<li ng-repeat="myItem in myItems | filter:query">
	{{myItem.name_a}}
	<br/>
	{{myItem.name_b}}
	</li>
</ul>
</body>
</html>