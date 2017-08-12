<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Index of all services</title>
</head>
<body>
<%
    request.setAttribute("contextPath", application.getContextPath());
    request.setAttribute("company_ep", application.getContextPath() + "/cxf/company");
%>

<strong>Get All Employees</strong>
<ul>
    <li><a href="${company_ep}/employees-json">${company_ep}/employees-json</a></li>
</ul>
</body>
</html>