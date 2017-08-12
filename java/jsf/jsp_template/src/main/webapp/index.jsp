<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<%
request.setAttribute("cp", request.getContextPath());
%>

<h3>Examples</h3>

<ol>
    <li>
        <a href="${cp}/template_bootstrap_jquery.jsp">
            <strong>No JSP template, Header navigation and footer</strong><br/>
            ${cp}/template_bootstrap_jquery.jsp</a>
    </li>
    <li>
        <a href="${cp}/template_simple.jsp">
            <strong>No JSP template header menu</strong><br/>
            ${cp}/template_simple.jsp
        </a>
    </li>
    <li>
        <a href="${cp}/template_tutorial.jsp">
            <strong>No JSP template, 2 columns header and footer</strong><br/>
            ${cp}/template_tutorial.jsp
        </a>
    </li>
    <li>
        <a href="${cp}/template_tutorial2.jsp">
            <strong>No JSP template, 3 columns header and footer</strong><br/>
            ${cp}/template_tutorial2.jsp
        </a>
    </li>
    <li>
        <a href="${cp}/template_tutorial3.jsp">
            <strong>No JSP template, 3 columns header and footer</strong><br/>
            ${cp}/template_tutorial3.jsp
        </a>
    </li>
</ol>
</body>
</html>
