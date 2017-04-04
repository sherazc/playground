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

<strong>Service Tests</strong>
<ul>
    <li>
        POST request to link below using postman chrome plugin and send it
        <a href="${contextPath}/find_employee_example.xml">${contextPath}/find_employee_example.xml</a>:
        <br/>
        Set Content-Type: "application/xml"
        <br/>
        <a href="${company_ep}/company-service/find">${company_ep}/company-service/find</a>

    </li>
    <li>Run CompanyRestServiceIntegrationTest. This example uses Spring's RestTemplate and post String RequestQuery XML and shows the result</li>
</ul>

<strong>Sample XMLs</strong>
<ul>
    <li><a href="${contextPath}/find_employee_example.xml">${contextPath}/find_employee_example.xml</a></li>
</ul>

</body>
</html>