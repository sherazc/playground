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
<body>
1 + 3 = {{1 + 3}}
Changed
</body>
</html>