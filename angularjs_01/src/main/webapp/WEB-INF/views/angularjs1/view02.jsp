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
<script src="${contextPath}/resources/scripts/view02-script.js"></script>

<title></title>
</head>
<body ng-controller="view02Controller">

<ul>
	<li ng-repeat="myItem in myItems">
	{{myItem.name_a}}
	<br/>
	{{myItem.name_b}}
	</li>
</ul>
<p>Total Items = {{myItems.length}}</p>
<p>{{controllerMessage}}</p>

<table border='1'>
	<tr><th>Row Number</th></tr>
	<tr ng-repeat="i in [1,2,3,4,5,6,7]">
		<td>{{i}}</td>
	</tr>
	
</table>

</body>
</html>